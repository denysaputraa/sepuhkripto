/* =====================
   PARTICLE BACKGROUND
===================== */
const canvas = document.createElement("canvas");
canvas.style.position = "fixed";
canvas.style.top = 0;
canvas.style.left = 0;
canvas.style.zIndex = "-1";
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");
let particles = [];

function resize(){
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
resize();
addEventListener("resize", resize);

for(let i=0;i<60;i++){
  particles.push({
    x:Math.random()*canvas.width,
    y:Math.random()*canvas.height,
    r:Math.random()*2+1,
    dx:Math.random()-.5,
    dy:Math.random()-.5
  });
}

(function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle="rgba(34,211,238,.7)";
  particles.forEach(p=>{
    p.x+=p.dx; p.y+=p.dy;
    if(p.x<0||p.x>canvas.width) p.dx*=-1;
    if(p.y<0||p.y>canvas.height) p.dy*=-1;
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fill();
  });
  requestAnimationFrame(animate);
})();

/* =====================
   SCROLL REVEAL
===================== */
document.querySelectorAll(".reveal").forEach(el=>{
  addEventListener("scroll",()=>{
    if(el.getBoundingClientRect().top < innerHeight-100){
      el.classList.add("active");
    }
  });
});

/* =====================
   THEME TOGGLE
===================== */
const toggle = document.querySelector(".toggle");
if(toggle){
  toggle.onclick = () => document.body.classList.toggle("light");
}

/* =====================
   MAGNET BUTTON
===================== */
document.querySelectorAll(".btn").forEach(btn=>{
  btn.addEventListener("mousemove",e=>{
    const r=btn.getBoundingClientRect();
    const x=e.clientX-r.left-r.width/2;
    const y=e.clientY-r.top-r.height/2;
    btn.style.transform=`translate(${x*.25}px,${y*.25}px)`;
  });
  btn.addEventListener("mouseleave",()=>{
    btn.style.transform="translate(0,0)";
  });
});

/* =====================
   TELEGRAM MAGNET
===================== */
const tg = document.querySelector(".telegram-float");
if(tg){
  tg.addEventListener("mousemove", e=>{
    const r=tg.getBoundingClientRect();
    const x=e.clientX-r.left-r.width/2;
    const y=e.clientY-r.top-r.height/2;
    tg.style.transform=`translate(${x*.3}px,${y*.3}px) scale(1.05)`;
  });
  tg.addEventListener("mouseleave",()=>{
    tg.style.transform="translate(0,0) scale(1)";
  });
}

/* =====================
   LIVE PRICE + INDICATOR
===================== */
let lastBTC=null, lastETH=null;

async function loadPrice(){
  try{
    const res = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd"
    );
    const d = await res.json();

    update("btc","btc-indicator",d.bitcoin.usd,lastBTC);
    update("eth","eth-indicator",d.ethereum.usd,lastETH);

    lastBTC=d.bitcoin.usd;
    lastETH=d.ethereum.usd;
  }catch{
    document.getElementById("btc").innerText="N/A";
    document.getElementById("eth").innerText="N/A";
  }
}

function update(id,indId,val,last){
  const el=document.getElementById(id);
  const ind=document.getElementById(indId);
  if(!el||!ind) return;

  el.innerText="$"+val;
  if(last===null) return;

  if(val>last){
    ind.innerText="▲";
    ind.className="indicator up";
  }else if(val<last){
    ind.innerText="▼";
    ind.className="indicator down";
  }
}

loadPrice();
setInterval(loadPrice,60000);

let currency = "usd";
let lastBTC = null, lastETH = null;
let btcHistory = [], ethHistory = [];

document.getElementById("currencyToggle").onclick = () => {
  currency = currency === "usd" ? "idr" : "usd";
  document.getElementById("currencyToggle").innerText = currency.toUpperCase();
  loadPrice();
};

async function loadPrice(){
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=${currency}`;
  const res = await fetch(url);
  const d = await res.json();

  update("btc","btc-indicator","btc-percent","btc-chart",
    d.bitcoin[currency], lastBTC, btcHistory);
  update("eth","eth-indicator","eth-percent","eth-chart",
    d.ethereum[currency], lastETH, ethHistory);

  lastBTC = d.bitcoin[currency];
  lastETH = d.ethereum[currency];
}

function update(id,indId,pctId,chartId,val,last,history){
  const el = document.getElementById(id);
  const ind = document.getElementById(indId);
  const pct = document.getElementById(pctId);
  const box = el.parentElement;

  el.innerText = (currency==="usd"?"$":"Rp ") + val.toLocaleString();

  if(last){
    const diff = ((val-last)/last*100).toFixed(2);
    pct.innerText = `(${diff}%)`;

    if(val>last){
      ind.innerText="▲"; ind.className="indicator up";
      box.classList.add("flash-up");
    }else{
      ind.innerText="▼"; ind.className="indicator down";
      box.classList.add("flash-down");
    }
    setTimeout(()=>box.classList.remove("flash-up","flash-down"),600);
  }

  history.push(val);
  if(history.length>20) history.shift();
  drawChart(chartId, history);
}

function drawChart(id,data){
  const c=document.getElementById(id);
  const ctx=c.getContext("2d");
  ctx.clearRect(0,0,c.width,c.height);
  ctx.strokeStyle="#22d3ee";
  ctx.beginPath();
  data.forEach((v,i)=>{
    const x=i*(c.width/(data.length-1));
    const y=c.height-(v/Math.max(...data))*c.height;
    i?ctx.lineTo(x,y):ctx.moveTo(x,y);
  });
  ctx.stroke();
}

loadPrice();
setInterval(loadPrice,60000);
