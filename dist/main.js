(()=>{"use strict";var e={337:(e,t,n)=>{e.exports=n.p+"ec883566fe146393adc5.png"},517:(e,t,n)=>{e.exports=n.p+"f0f8c380cc7535888f0d.png"}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var i=t[r]={exports:{}};return e[r](i,i.exports,n),i.exports}n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),(()=>{var e;n.g.importScripts&&(e=n.g.location+"");var t=n.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var r=t.getElementsByTagName("script");r.length&&(e=r[r.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),n.p=e})(),(()=>{var e=n(337),t=n(517);let r=document.querySelector("#todosContainer"),o=document.querySelector("#containerForm"),i=document.querySelector("#newTodoBtn"),c=document.querySelector("#newProjectBtn"),d=document.querySelector("#newProjectInput"),a=document.querySelector("#projectsContainer"),l=document.querySelector("#form"),s=document.querySelector("#titleInput"),u=document.querySelector("#descriptionInput"),p=document.querySelector("#lowRadio"),m=document.querySelector("#normalRadio"),h=document.querySelector("#urgentRadio");function g(){console.log("hi")}let f=[{description:"Anki and shit",priority:"normal",title:"Study Japanese",checked:!1},{description:"Tomato egg salad, 10/10",priority:"low",title:"Eat veggies",checked:!0},{description:"Get the axe, sharpen it and let Bibi know I'll be back tomorrow",priority:"urgent",title:"Kill that bear",checked:!1}],v=["Default","Personal","Family"],y=-1,k=!0;function w(e,t,n,r){let o=document.createElement(e);if("div"==e?o.classList.add(t):"img"==e?o.src=t:"p"==e&&(o.textContent=t),"todoCheckbox"==t){let e=r.priority;o.classList.add("level"+e)}return"todoTitle"==t&&(o.textContent=r.title),"projectBtn"==t&&(o.textContent="."+r),"todo"==t||"todoTop"==t||"todoBottom"==t||o.addEventListener("click",n),o}const E=(()=>{function n(){r.innerHTML=""}function o(e){l.classList.add("editing"),S.showForm();let t=e.target.parentElement.parentElement.id.slice(5);switch(y=t,k=f[t].checked,s.value=f[t].title,u.value=f[t].description,f[t].priority){case"normal":m.checked=!0;break;case"urgent":h.checked=!0;break;default:p.checked=!0}}function i(e){let t=e.target.parentElement.parentElement.id.slice(5);f.splice(t,1),n(),g()}function c(e){e.target.parentElement.nextElementSibling.classList.toggle("todoBottomShow")}function d(e){e.target.parentElement.classList.toggle("todoBottomShow")}function a(e){let t=+e.target.parentElement.parentElement.id.slice(5);f[t].checked?f[t].checked=!1:f[t].checked=!0,n(),g()}function g(){f.map(((n,l)=>r.append(function(n,r){let l=w("div","todo"),s=w("div","todoTop"),u=w("div","todoBottom"),p=w("div","todoCheckbox",a,n),m=w("div","todoTitle",c,n),h=w("img",e,i),g=w("img",t,o),f=w("p",n.description,d);return n.checked&&(p.textContent="X",m.style.textDecoration="line-through"),s.append(p),s.append(m),s.append(g),s.append(h),u.append(f),l.append(s),l.append(u),l.id="index"+r,l}(n,l))))}return{reset:n,renderArr:g}})(),S={formToObj:function(e,t){return{title:e[0].value,description:e[1].value,priority:t.value,checked:!1}},hideForm:function(){o.classList.remove("showMe")},showForm:function(){o.classList.add("showMe")}},L=(()=>{function e(){a.innerHTML=""}function t(){v.map((e=>a.append(w("div","projectBtn",g,e))))}return{newProjectBtnClick:function(){d.classList.toggle("hideMe"),d.focus()},newProjectInputEnter:function(n){if("Enter"==n.key){let n=d.value;v.includes(n)?alert("That name is already in use"):(v.push(n),e(),t(),d.classList.toggle("hideMe"),d.value="")}},renderArr:t,reset:e}})();i.addEventListener("click",(e=>S.showForm())),o.addEventListener("click",(e=>{"containerForm"==e.target.id&&S.hideForm()})),l.addEventListener("submit",(e=>{e.preventDefault();let t=e.target.elements,n=document.querySelector("input[type='radio']:checked"),r=S.formToObj(t,n);"editing"==e.target.classList[0]?(r.checked=k,f.splice(y,1,r),e.target.classList.remove("editing")):f.push(r),E.reset(),E.renderArr(),S.hideForm(),l.reset()})),c.addEventListener("click",L.newProjectBtnClick),d.addEventListener("keydown",L.newProjectInputEnter),E.renderArr(),L.renderArr()})()})();