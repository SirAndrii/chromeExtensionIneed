(()=>{"use strict";const e={HIGHLIGHT_WORDS:"stopWords",REMOVE_WORDS:"removeWords",COLORS:"colors",SELECTORS:"selectors"},{HIGHLIGHT_WORDS:t,REMOVE_WORDS:o,COLORS:l,SELECTORS:s}=e,n=document.getElementById("stop-words"),r=document.getElementById("remove-words"),c=document.getElementById("highlight-color"),d=document.getElementById("background-color"),a=document.getElementById("scrollable-container"),u=document.getElementById("skeleton-class"),E=document.getElementById("remove-test-id"),m=document.getElementById("save-button");chrome.storage.sync.get(Object(e).keys,(e=>{n.value=e[t].join(", "),r.value=e[o].join(", "),c.value=e[l].highlightColor,d.value=e[l].backgroundColor,a.value=e[s].SCROLLABLE_CONTAINER,u.value=e[s].SKELETON_CLASS,E.value=e[s].REMOVE_TEST_ID})),m.addEventListener("click",(function(){const e={[t]:n.value.split(",").map((e=>e.trim())),[o]:r.value.split(",").map((e=>e.trim())),[l]:{backgroundColor:d.value,highlightColor:c.value},[s]:{SKELETON_CLASS:u.value,SCROLLABLE_CONTAINER:a.value,REMOVE_TEST_ID:E.value}};chrome.storage.sync.set(e,(()=>{alert("Options saved")}))}));const g=document.querySelector(".selectors-toggle"),i=g.querySelector(".selectors-toggle-text"),S=g.querySelector(".selectors-toggle-icon"),y=document.querySelector(".selectors-content");g.addEventListener("click",(()=>{"none"===y.style.display?(y.style.display="block",i.textContent="Hide selectors",S.style.transform="rotate(180deg)"):(y.style.display="none",i.textContent="Show selectors",S.style.transform="rotate(0deg)")}))})();