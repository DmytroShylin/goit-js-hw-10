import"./assets/modulepreload-polyfill-B5Qt9EMX.js";/* empty css                      */import{f,i as h}from"./assets/vendor-BbbuE1sJ.js";const a=document.querySelector("#datetime-picker"),n=document.querySelector("[data-start]"),y=document.querySelector("[data-days]"),p=document.querySelector("[data-hours]"),S=document.querySelector("[data-minutes]"),D=document.querySelector("[data-seconds]");let r=null,c=null;n.disabled=!0;const b={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(e){const t=e[0];t<=new Date?(h.error({title:"Error",message:"Please choose a date in the future",position:"topRight"}),n.disabled=!0,r=null):(n.disabled=!1,r=t)}};f(a,b);function o(e){return String(e).padStart(2,"0")}function q(e){const d=Math.floor(e/864e5),i=Math.floor(e%864e5/36e5),l=Math.floor(e%864e5%36e5/6e4),m=Math.floor(e%864e5%36e5%6e4/1e3);return{days:d,hours:i,minutes:l,seconds:m}}function u(e){y.textContent=o(e.days),p.textContent=o(e.hours),S.textContent=o(e.minutes),D.textContent=o(e.seconds)}function E(){r&&(n.disabled=!0,a.disabled=!0,c=setInterval(()=>{const t=r-new Date;if(t<=0){clearInterval(c),u({days:0,hours:0,minutes:0,seconds:0}),a.disabled=!1;return}const s=q(t);u(s)},1e3))}n.addEventListener("click",E);
//# sourceMappingURL=1-timer.js.map
