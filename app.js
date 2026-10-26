const days = [
 {name:"Lunedì",emoji:"🍗",meals:[["Colazione","Pane tostato, uova e banana"],["Spuntino mattina","Yogurt o frutta secca"],["Pranzo","Riso basmati con pollo allo zenzero, soia e carote"],["Merenda","Gallette di riso e burro di arachidi"],["Cena","Salmone al forno, patate e zucchine"]]},
 {name:"Martedì",emoji:"🥩",meals:[["Colazione","Porridge d'avena con banana"],["Spuntino mattina","Kiwi e mandorle"],["Pranzo","Manzo saltato con riso, carote e zenzero"],["Merenda","Pane e formaggio fresco"],["Cena","Frittata con patate e pomodori"]]},
 {name:"Mercoledì",emoji:"🐟",meals:[["Colazione","Yogurt, avena e frutta"],["Spuntino mattina","Banana e mandorle"],["Pranzo","Bowl di salmone, riso e carote con soia"],["Merenda","Toast con ricotta"],["Cena","Pasta al pomodoro e tonno"]]},
 {name:"Giovedì",emoji:"🍜",meals:[["Colazione","Pane tostato e burro di arachidi"],["Spuntino mattina","Yogurt o banana"],["Pranzo","Noodles di riso con maiale, carote e zenzero"],["Merenda","Crackers e formaggio"],["Cena","Vellutata di patate e carote, uova e pane"]]},
 {name:"Venerdì",emoji:"🍳",meals:[["Colazione","Porridge, banana e yogurt"],["Spuntino mattina","Frutta e noci"],["Pranzo","Riso saltato con pollo, uovo, carote e soia"],["Merenda","Pane tostato con marmellata"],["Cena","Manzo alla piastra, patate e zucchine"]]},
 {name:"Sabato",emoji:"🥢",meals:[["Colazione","Uova, pane e frutta"],["Spuntino mattina","Yogurt o frutta secca"],["Pranzo","Insalata di riso con tonno, cetrioli e pomodori"],["Merenda","Banana e crackers"],["Cena","Pollo allo zenzero con riso e carote"]]},
 {name:"Domenica",emoji:"🍚",meals:[["Colazione","Yogurt, avena e frutta oppure pane e uova"],["Spuntino mattina","Frutta e mandorle"],["Pranzo","Maiale allo zenzero e soia con riso e zucchine"],["Merenda","Pane e marmellata oppure yogurt"],["Cena","Frittata con patate, carote e pane"]]}
];
const shopping = [
 ["Carne, pesce e uova",["Pollo","Manzo","Lonza di maiale","Salmone","Tonno","Uova"]],
 ["Basi e cereali",["Riso basmati","Noodles di riso","Pasta","Pane","Fiocchi d'avena"]],
 ["Verdura e frutta",["Patate","Carote","Zucchine","Cetrioli","Pomodori","Banane e frutta di stagione"]],
 ["Colazione e spuntini",["Yogurt","Latte (anche senza lattosio)","Mandorle o noci","Burro di arachidi","Marmellata","Crackers"]],
 ["Condimenti",["Zenzero fresco","Salsa di soia","Limoni","Olio extravergine d'oliva"]]
];
const $ = s => document.querySelector(s);
const load = (key, fallback) => {try{return JSON.parse(localStorage.getItem(key)) ?? fallback}catch{return fallback}};
let checkedMeals = load("mealPlannerMeals", {});
let checkedShopping = load("mealPlannerShopping", []);
let selectedDay = 0;
const save = () => {localStorage.setItem("mealPlannerMeals",JSON.stringify(checkedMeals));localStorage.setItem("mealPlannerShopping",JSON.stringify(checkedShopping));};
function renderTabs(){
 $("#day-tabs").innerHTML = days.map((d,i)=>`<button class="day-tab ${i===selectedDay?"active":""}" data-day="${i}" aria-pressed="${i===selectedDay}"><span class="emoji">${d.emoji}</span><span class="day-short">${d.name.slice(0,3)}</span><span class="mini-count">${d.meals.filter((_,j)=>checkedMeals[`${i}-${j}`]).length}/5</span></button>`).join("");
 document.querySelectorAll("[data-day]").forEach(b=>b.addEventListener("click",()=>{selectedDay=Number(b.dataset.day);render();}));
}
function renderMeals(){
 const d=days[selectedDay];$("#selected-day-title").textContent=`${d.emoji} ${d.name}`;
 $("#meal-list").innerHTML=d.meals.map((m,j)=>{const key=`${selectedDay}-${j}`,done=!!checkedMeals[key];return `<div class="meal ${done?"checked":""}"><input type="checkbox" id="meal-${key}" data-meal="${key}" ${done?"checked":""}><label for="meal-${key}"><span class="meal-time">${m[0]}</span><span class="meal-name">${m[1]}</span></label></div>`}).join("");
 document.querySelectorAll("[data-meal]").forEach(el=>el.addEventListener("change",()=>{checkedMeals[el.dataset.meal]=el.checked;save();render();}));
 $("#day-counter").textContent=`${d.meals.filter((_,j)=>checkedMeals[`${selectedDay}-${j}`]).length} di 5`;
}
function renderShopping(){
 $("#shopping-list").innerHTML=shopping.map(([title,items],g)=>`<div class="shopping-group"><h3>${title}</h3>${items.map((item,i)=>{const key=`${g}-${i}`,done=checkedShopping.includes(key);return `<label class="shopping-item ${done?"checked":""}"><input type="checkbox" data-shop="${key}" ${done?"checked":""}><span>${item}</span></label>`}).join("")}</div>`).join("");
 document.querySelectorAll("[data-shop]").forEach(el=>el.addEventListener("change",()=>{const k=el.dataset.shop;checkedShopping=el.checked?[...checkedShopping,k]:checkedShopping.filter(x=>x!==k);save();renderShopping();renderStats();}));
 $("#shopping-counter").textContent=`${checkedShopping.length} acquistati`;
}
function renderStats(){
 const total=days.reduce((n,d)=>n+d.meals.length,0),done=Object.values(checkedMeals).filter(Boolean).length,pct=Math.round(done/total*100);
 $("#done-count").textContent=done;$("#progress").textContent=pct+"%";$("#progress-bar").style.width=pct+"%";
}
function render(){renderTabs();renderMeals();renderShopping();renderStats();}
$("#today-btn").addEventListener("click",()=>{selectedDay=(new Date().getDay()+6)%7;render();});
$("#next-day").addEventListener("click",()=>{selectedDay=(selectedDay+1)%7;render();window.scrollTo({top:0,behavior:"smooth"});});
$("#reset-day").addEventListener("click",()=>{days[selectedDay].meals.forEach((_,j)=>delete checkedMeals[`${selectedDay}-${j}`]);save();render();});
$("#reset-shopping").addEventListener("click",()=>{checkedShopping=[];save();renderShopping();renderStats();});
$("#copy-shopping").addEventListener("click",async()=>{const missing=shopping.map(([title,items],g)=>title+"\n"+items.filter((_,i)=>!checkedShopping.includes(`${g}-${i}`)).map(x=>"- "+x).join("\n")).filter(x=>!x.endsWith("\n")).join("\n\n");try{await navigator.clipboard.writeText(missing);$("#copy-status").textContent="Lista copiata."}catch{$("#copy-status").textContent="Seleziona e copia manualmente la lista: "+missing}});
if("serviceWorker" in navigator && location.protocol.startsWith("http")) window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));
render();
