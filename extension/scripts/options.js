(()=>{const o=document.getElementById("stop-words"),e=document.getElementById("highlight-color"),t=document.getElementById("background-color"),l=document.getElementById("save-button");chrome.storage.sync.get(["stopWords","colors"],(l=>{o.value=l.stopWords.join(", "),e.value=l.colors.highlightColor,t.value=l.colors.backgroundColor})),l.addEventListener("click",(function(){const l=o.value.split(",").map((o=>o.trim())),r=t.value,s=e.value;chrome.storage.sync.set({stopWords:l,colors:{highlightColor:s,backgroundColor:r}},(()=>{alert("Options saved")}))}))})();