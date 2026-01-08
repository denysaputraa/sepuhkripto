/* PARTICLES */
const canvas=document.createElement("canvas");
canvas.style.position="fixed";canvas.style.top=0;canvas.style.left=0;canvas.style.zIndex="-1";
document.body.appendChild(canvas);
const ctx=canvas.getContext("2d");let particles=[];
function resize(){canvas.width=innerWidth;canvas.height=innerHeight}
resize();addEventListener("resize",resize);

for(let i=0;i<60;i++)particles.push({
  x:Math.random()*canvas.width,y:Math.random()*canvas.height,
  r:Math.random()*2+1,dx:Math.random()-.5,dy:Math.random()-.5
});

(function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle="rgba(34,211,238,.7)";
  particles.forEach(p=>{
    p.x+=p.dx;p.y+=p.dy;
    if(p.x<0||p.x>canvas.width)p.dx*=-1;
    if(p.y<0||p.y>canvas.height)p.dy*=-1;
    ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();
  });
  requestAnimationFrame(animate);
})();

/* SCROLL REVEAL */
const reveals=document.querySelectorAll(".reveal");
addEventListener("scroll",()=>{
  reveals.forEach(el=>{
    if(el.getBoundingClientRect().top<innerHeight-100) el.classList.add("active");
  });
});

/* THEME TOGGLE */
document.querySelector(".toggle").onclick=()=>document.body.classList.toggle("light");

/* MAGNETIC BUTTON */
document.querySelectorAll(".btn").forEach(btn=>{
  btn.addEventListener("mousemove",e=>{
    const r=btn.getBoundingClientRect();
    const x=e.clientX-r.left-r.width/2;
    const y=e.clientY-r.top-r.height/2;
    btn.style.transform=`translate(${x*0.25}px,${y*0.25}px)`;
  });
  btn.addEventListener("mouseleave",()=>{
    btn.style.transform="translate(0,0)";
  });
});

/* MAGNET TELEGRAM FLOAT */
const tg = document.querySelector(".telegram-float");

tg.addEventListener("mousemove", e => {
  const r = tg.getBoundingClientRect();
  const x = e.clientX - r.left - r.width / 2;
  const y = e.clientY - r.top - r.height / 2;
  tg.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.05)`;
});

tg.addEventListener("mouseleave", () => {
  tg.style.transform = "translate(0,0) scale(1)";
});
