const menu=document.querySelector(".menu");
const nav=document.querySelector(".nav nav");
menu.addEventListener("click",()=>nav.classList.toggle("open"));
document.querySelectorAll(".nav nav a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("show")});
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));
