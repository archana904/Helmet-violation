
import os
import uuid
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from werkzeug.utils import secure_filename

from integrated_helmet_detection import process_video

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
OUTPUT_FOLDER = "outputs"

ALLOWED_EXTENSIONS = {"mp4", "avi", "mov", "mkv"}

app.config["MAX_CONTENT_LENGTH"] = 500 * 1024 * 1024

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(OUTPUT_FOLDER, exist_ok=True)


def allowed_file(filename):
    return (
        "." in filename
        and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS
    )


@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "HelmetGuard AI Backend is running!",
        "status": "online"
    })


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({
        "status": "healthy",
        "application": "HelmetGuard AI"
    })


@app.route("/api/process-video", methods=["POST"])
def process_uploaded_video():

    if "video" not in request.files:
        return jsonify({"error": "No video file provided"}), 400

    video = request.files["video"]

    if video.filename == "":
        return jsonify({"error": "No video selected"}), 400

    if not allowed_file(video.filename):
        return jsonify({"error": "Unsupported video format"}), 400

    unique_id = uuid.uuid4().hex
    safe_name = secure_filename(video.filename)

    input_filename = f"{unique_id}_{safe_name}"
    output_filename = f"{unique_id}_processed.mp4"

    input_path = os.path.abspath(
        os.path.join(UPLOAD_FOLDER, input_filename)
    )

    output_path = os.path.abspath(
        os.path.join(OUTPUT_FOLDER, output_filename)
    )

    video.save(input_path)

    try:
        result = process_video(input_path, output_path)

        return jsonify({
            "status": "success",
            "message": "Video processed successfully",
            "video_url": f"/api/video/{output_filename}",
            "frames_processed": result["frames_processed"],
            "helmet_detections": result["helmet_detections"]
        })

    except Exception as error:
        app.logger.exception("Video processing failed")
        return jsonify({
            "error": str(error)
        }), 500

    finally:
        if os.path.exists(input_path):
            os.remove(input_path)


@app.route("/api/video/<filename>", methods=["GET"])
def get_processed_video(filename):
    return send_from_directory(
        OUTPUT_FOLDER,
        filename,
        mimetype="video/mp4"
    )


if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=5000,
        debug=False
    )
