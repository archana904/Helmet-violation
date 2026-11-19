const input=document.getElementById("videoInput");
const preview=document.getElementById("videoPreview");
const placeholder=document.getElementById("feedPlaceholder");
const fileName=document.getElementById("fileName");
const fileMeta=document.getElementById("fileMeta");
let currentUrl=null;

input.addEventListener("change",()=>{
  const file=input.files && input.files[0];
  if(!file) return;
  if(currentUrl) URL.revokeObjectURL(currentUrl);
  currentUrl=URL.createObjectURL(file);
  preview.src=currentUrl;
  preview.hidden=false;
  placeholder.hidden=true;
  fileName.textContent=file.name;
  fileMeta.textContent=`${(file.size/1048576).toFixed(2)} MB · Local video preview`;
});
document.getElementById("clearVideo").addEventListener("click",()=>{
  preview.pause();
  preview.removeAttribute("src");
  preview.load();
  preview.hidden=true;
  placeholder.hidden=false;
  input.value="";
  if(currentUrl) URL.revokeObjectURL(currentUrl);
  currentUrl=null;
  fileName.textContent="No video selected";
  fileMeta.textContent="Choose a video to start preview";
});

function updateClock(){
  const now=new Date();
  const time=now.toLocaleTimeString([], {hour12:false});
  document.getElementById("clock").textContent=time;
  document.getElementById("feedTime").textContent=time;
}
updateClock();setInterval(updateClock,1000);

const answers=[
 {keys:["yolo","detection"],text:"YOLO is a real-time object detection family. A trained helmet model can identify helmet and no-helmet classes in video frames. This demo frontend is not connected to a YOLO model yet."},
 {keys:["tracking","bot-sort","botsort"],text:"Object tracking follows detected objects across video frames and can assign a consistent tracking ID. BoT-SORT is one tracking algorithm that can be integrated with the detection pipeline."},
 {keys:["fps"],text:"FPS means frames per second. It measures how many video frames the system processes in one second."},
 {keys:["latency","inference"],text:"Inference latency is the time taken by the AI model to produce a prediction, often measured in milliseconds."},
 {keys:["cpu","gpu"],text:"CPU and GPU performance should be measured using the same video, model, image size and settings. This dashboard will display real benchmark values after backend integration."},
 {keys:["backend","flask","python"],text:"A Python backend, for example Flask, can receive the uploaded video, run the AI pipeline and send detection results back to this dashboard."},
 {keys:["helmet","violation"],text:"Helmet violation detection requires a model trained with suitable helmet and no-helmet classes. The current website only previews a video; its sample records are illustrative."}
];
function sendMessage(question){
  const q=question.trim();if(!q)return;
  const box=document.getElementById("chatWindow");
  const user=document.createElement("div");user.className="user-message";user.textContent=q;box.appendChild(user);
  const normalized=q.toLowerCase();
  const match=answers.find(a=>a.keys.some(k=>normalized.includes(k)));
  const bot=document.createElement("div");bot.className="bot-message";
  bot.textContent=match?match.text:"I can explain YOLO detection, helmet violations, object tracking, FPS, latency, CPU/GPU and backend integration.";
  box.appendChild(bot);box.scrollTop=box.scrollHeight;
}
document.getElementById("chatForm").addEventListener("submit",e=>{
  e.preventDefault();const field=document.getElementById("chatInput");sendMessage(field.value);field.value="";
});
document.querySelectorAll("[data-question]").forEach(button=>button.addEventListener("click",()=>sendMessage(button.dataset.question)));
document.querySelectorAll(".nav-link").forEach(link=>link.addEventListener("click",()=>{
  document.querySelectorAll(".nav-link").forEach(item=>item.classList.remove("active"));
  link.classList.add("active");
}));