
const API="/api/home";
async function load(){
 const c=document.getElementById("videos");
 c.innerHTML="<p>Loading...</p>";
 try{
  const r=await fetch(API);
  const data=await r.json();
  c.innerHTML="";
  (data.videos||[]).forEach(v=>{
   const d=document.createElement("div");
   d.className="card";
   d.innerHTML=`<img src="${v.thumbnail}"><div class="info"><h3>${v.title}</h3><div class="small">${v.channel}</div></div>`;
   c.appendChild(d);
  });
 }catch(e){
  c.innerHTML="<p>Worker not connected yet.</p>";
 }
}
load();
