


import os
import cv2
from ultralytics import YOLO


def process_video(VIDEO_PATH, OUTPUT_PATH):

    os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)

    # 1. Load both models
    print("Loading YOLO11n vehicle and person model...")
    vehicle_model = YOLO("yolo11n.pt")

    print("Loading custom helmet detection model...")
    helmet_model = YOLO(
        r"runs\detect\runs\helmet_detection\YOLO11s_fresh\weights\best.pt"
    )

    # 2. Read video properties
    cap = cv2.VideoCapture(VIDEO_PATH)

    if not cap.isOpened():
        raise RuntimeError("Could not open input video!")

    fps = cap.get(cv2.CAP_PROP_FPS)
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    cap.release()

    # 3. Create output video
    fourcc = cv2.VideoWriter_fourcc(*"mp4v")

    writer = cv2.VideoWriter(
        OUTPUT_PATH,
        fourcc,
        fps,
        (width, height)
    )

    if not writer.isOpened():
        raise RuntimeError("Could not create output video!")

    print("\nStarting integrated helmet detection...")

    # 4. Track persons, bicycles and motorcycles
    tracking_results = vehicle_model.track(
        source=VIDEO_PATH,
        tracker="botsort.yaml",
        classes=[0, 1, 3],
        conf=0.25,
        imgsz=640,
        stream=True,
        persist=True
    )

    frame_count = 0
    helmet_detection_count = 0

    try:
        # 5. Process each video frame
        for result in tracking_results:

            frame_count += 1
            original_frame = result.orig_img.copy()

            # Draw object boxes and tracking IDs
            frame = result.plot(
                line_width=4,
                font_size=1.2,
                labels=True,
                boxes=True
            )

            # 6. Detect helmets on the original frame
            helmet_results = helmet_model.predict(
                source=original_frame,
                conf=0.10,
                imgsz=960,
                verbose=False
            )

            # 7. Collect tracked persons
            persons = []

            if result.boxes is not None and result.boxes.id is not None:

                boxes = result.boxes.xyxy.cpu().numpy()
                classes = result.boxes.cls.cpu().numpy()
                ids = result.boxes.id.cpu().numpy()

                for box, cls, track_id in zip(boxes, classes, ids):

                    if int(cls) == 0:
                        persons.append({
                            "box": box,
                            "id": int(track_id)
                        })

            # 8. Associate helmet detections with persons
            for helmet_box in helmet_results[0].boxes:

                hx1, hy1, hx2, hy2 = (
                    helmet_box.xyxy[0].cpu().numpy()
                )

                helmet_center_x = (hx1 + hx2) / 2
                helmet_center_y = (hy1 + hy2) / 2

                helmet_class = int(helmet_box.cls[0])
                confidence = float(helmet_box.conf[0])

                helmet_detection_count += 1

                if helmet_class == 0:
                    status = "With Helmet"
                    color = (0, 255, 0)
                else:
                    status = "Without Helmet"
                    color = (0, 0, 255)

                best_person = None
                best_distance = float("inf")

                for person in persons:

                    x1, y1, x2, y2 = person["box"]

                    person_width = x2 - x1
                    person_height = y2 - y1

                    inside_person = (
                        x1 <= helmet_center_x <= x2
                        and y1 <= helmet_center_y
                        <= y1 + 0.55 * person_height
                    )

                    if inside_person:

                        person_center_x = (x1 + x2) / 2
                        person_top_center_y = y1 + 0.25 * person_height

                        distance = (
                            ((helmet_center_x - person_center_x)
                             / max(person_width, 1)) ** 2
                            +
                            ((helmet_center_y - person_top_center_y)
                             / max(person_height, 1)) ** 2
                        )

                        if distance < best_distance:
                            best_distance = distance
                            best_person = person

                # 9. Draw helmet bounding box
                cv2.rectangle(
                    frame,
                    (int(hx1), int(hy1)),
                    (int(hx2), int(hy2)),
                    color,
                    4
                )

                # 10. Display helmet status and tracking ID
                if best_person is not None:
                    label = (
                        f"ID {best_person['id']} | "
                        f"{status} | {confidence:.2f}"
                    )
                else:
                    label = f"{status} | {confidence:.2f}"

                cv2.putText(
                    frame,
                    label,
                    (int(hx1), max(35, int(hy1) - 12)),
                    cv2.FONT_HERSHEY_SIMPLEX,
                    0.9,
                    color,
                    3
                )

            # 11. Save annotated frame
            writer.write(frame)

            if frame_count % 100 == 0:
                print(f"Processed {frame_count} frames")

    finally:
        writer.release()

    print("\nIntegrated detection completed!")
    print("Total frames:", frame_count)
    print("Total helmet detections:", helmet_detection_count)
    print("Output video:", OUTPUT_PATH)

    return {
        "frames_processed": frame_count,
        "helmet_detections": helmet_detection_count,
        "output_video": OUTPUT_PATH
    }
