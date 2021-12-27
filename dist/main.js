(()=>{"use strict";var e={337:(e,t,r)=>{e.exports=r.p+"ec883566fe146393adc5.png"},517:(e,t,r)=>{e.exports=r.p+"f0f8c380cc7535888f0d.png"}},t={};function r(o){var n=t[o];if(void 0!==n)return n.exports;var c=t[o]={exports:{}};return e[o](c,c.exports,r),c.exports}r.p="/2do/",(()=>{var e=r(337),t=r(517);let o=document.querySelector("#todosContainer"),n=document.querySelector("#containerForm"),c=document.querySelector("#newTodoBtn"),i=document.querySelector("#newProjectBtn"),d=document.querySelector("#newProjectInput"),a=document.querySelector("#deleteCurrentProject"),l=document.querySelector("#projectsContainer"),s=document.querySelector("#form"),p=document.querySelector("#titleInput"),u=document.querySelector("#descriptionInput"),m=document.querySelector("#lowRadio"),g=document.querySelector("#normalRadio"),f=document.querySelector("#urgentRadio"),y=JSON.parse(localStorage.getItem("todosArr"))||[{description:"Anki, web novels and 2 ep of anime",priority:"normal",title:"Study Japanese",checked:!1,project:"Today"},{description:"Tomato egg salad, 10/10",priority:"low",title:"Eat veggies",checked:!0,project:"Today"},{description:"Get the axe, sharpen it and let Bibi know I'll be back tomorrow",priority:"urgent",title:"Kill that bear",checked:!1,project:"Today"}],S=JSON.parse(localStorage.getItem("projectsArr"))||["Today","Personal","Family"],h="Today",v=-1,k=!0;function j(e,t,r,o){let n=document.createElement(e);if("div"==e?n.classList.add(t):"img"==e?n.src=t:"p"==e&&(n.textContent=t),"todoCheckbox"==t){let e=o.priority;n.classList.add("level"+e)}return"todoTitle"==t&&(n.textContent=o.title),"projectBtn"==t&&(n.textContent="."+o),"todo"==t||"todoTop"==t||"todoBottom"==t||n.addEventListener("click",r),n}const L=(()=>{function r(){o.innerHTML=""}function n(e){s.classList.add("editing"),w.showForm();let t=e.target.parentElement.parentElement.id.slice(5);switch(v=t,k=y[t].checked,p.value=y[t].title,u.value=y[t].description,y[t].priority){case"normal":g.checked=!0;break;case"urgent":f.checked=!0;break;default:m.checked=!0}}function c(e){let t=e.target.parentElement.parentElement.id.slice(5);y.splice(t,1),r(),localStorage.setItem("todosArr",JSON.stringify(y)),l()}function i(e){e.target.parentElement.nextElementSibling.classList.toggle("todoBottomShow")}function d(e){e.target.parentElement.classList.toggle("todoBottomShow")}function a(e){let t=+e.target.parentElement.parentElement.id.slice(5);y[t].checked?y[t].checked=!1:y[t].checked=!0,r(),localStorage.setItem("todosArr",JSON.stringify(y)),l()}function l(){let r=[];y.map(((o,l)=>r.push(function(r,o){let l=j("div","todo"),s=j("div","todoTop"),p=j("div","todoBottom"),u=j("div","todoCheckbox",a,r),m=j("div","todoTitle",i,r),g=j("img",e,c),f=j("img",t,n),y=j("p",r.description,d);return r.checked&&(u.textContent="X",m.style.textDecoration="line-through"),s.append(u),s.append(m),s.append(f),s.append(g),p.append(y),l.append(s),l.append(p),l.classList.add(r.project),l.id="index"+o,l}(o,l)))),r.filter((e=>e.classList[1]==h)).map((e=>o.append(e)))}return{reset:r,renderArr:l}})(),w={formToObj:function(e,t){return{title:e[0].value,description:e[1].value,priority:t.value,checked:!1,project:h}},hideForm:function(){n.classList.remove("showMe")},showForm:function(){n.classList.add("showMe")}},T=(()=>{function e(e){e.target;let o=e.target.textContent.slice(1);h=o,t(),localStorage.setItem("projectsArr",JSON.stringify(S)),r(),L.reset(),localStorage.setItem("todosArr",JSON.stringify(y)),L.renderArr()}function t(){l.innerHTML=""}function r(){S.map((t=>l.append(function(t){let r=j("div","projectBtn",e,t);return t==h&&r.classList.add("projectBtnSelected"),r}(t))))}return{newProjectBtnClick:function(){d.classList.toggle("hideMe"),d.focus()},newProjectInputEnter:function(e){if("Enter"==e.key){let e=d.value;S.includes(e)?alert("That name is already in use"):(S.push(e),t(),localStorage.setItem("projectsArr",JSON.stringify(S)),r(),d.classList.toggle("hideMe"),d.value="")}},deleteProject:function(){if("Today"==h)alert("Sorry, you can't delete the Today project");else if(confirm("This will delete the "+h+" project and ALL ITS TODOS, are you sure?")){let e=S.indexOf(h);S.splice(e,1),y=y.filter((e=>e.project!==h)),h="Today",t(),localStorage.setItem("projectsArr",JSON.stringify(S)),r(),L.reset(),localStorage.setItem("todosArr",JSON.stringify(y)),L.renderArr()}},renderArr:r,reset:t}})();c.addEventListener("click",(e=>w.showForm())),n.addEventListener("click",(e=>{"containerForm"==e.target.id&&w.hideForm()})),s.addEventListener("submit",(e=>{e.preventDefault();let t=e.target.elements,r=document.querySelector("input[type='radio']:checked"),o=w.formToObj(t,r);"editing"==e.target.classList[0]?(o.checked=k,y.splice(v,1,o),e.target.classList.remove("editing")):y.push(o),L.reset(),localStorage.setItem("todosArr",JSON.stringify(y)),L.renderArr(),w.hideForm(),s.reset()})),i.addEventListener("click",T.newProjectBtnClick),d.addEventListener("keydown",T.newProjectInputEnter),a.addEventListener("click",T.deleteProject),L.renderArr(),T.renderArr()})()})();