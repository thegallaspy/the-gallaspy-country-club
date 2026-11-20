(() => {
  "use strict";

  document.querySelectorAll("[data-shop-route]").forEach(button => {
    button.addEventListener("click", () => {
      const route = button.dataset.shopRoute;

      if (!route || !route.startsWith("/apparel/")) return;

      window.openClubRoute?.(route);
    });
  });

  const dialog = document.createElement("dialog");
  dialog.id = "membersLockerDialog";
  dialog.innerHTML = `<button type="button" data-locker-close>← PRO SHOP</button>
    <p>FALCON SOCIETY · PRIVATE ACCESS</p><h2>MEMBERS LOCKER.</h2>
    <form><label for="lockerCode">Your personal locker code</label>
    <input id="lockerCode" type="password" autocomplete="off" autocapitalize="none" spellcheck="false" required maxlength="32">
    <button type="submit">UNLOCK COLLECTION</button></form>
    <p role="status" aria-live="polite"></p><div class="locker-grid"></div>`;
  document.body.append(dialog);
  const form = dialog.querySelector("form"), input = dialog.querySelector("input");
  const status = dialog.querySelector('[role="status"]'), grid = dialog.querySelector(".locker-grid");
  const urls = new Set();
  let active;
  function clear() {
    active?.abort(); active = null;
    urls.forEach(url => URL.revokeObjectURL(url)); urls.clear();
    grid.replaceChildren(); input.value=""; status.textContent="";
    form.hidden=false; form.querySelector("button").disabled=false;
  }
  dialog.addEventListener("close", clear);
  dialog.querySelector("[data-locker-close]").onclick=()=>dialog.close();
  document.querySelectorAll("[data-shop-exclusive]").forEach(button=>button.addEventListener("click",()=>{
    clear(); if(!dialog.open) dialog.showModal();
  }));
  document.addEventListener("visibilitychange",()=>{if(document.hidden&&dialog.open)dialog.close();});
  document.addEventListener("click",event=>{if(dialog.open&&event.target.closest("#gallaspyHeaderSignOut,#myAuthSignOut,.tab"))dialog.close();},true);
  form.onsubmit=async event=>{
    event.preventDefault();
    const code=input.value.trim(); input.value="";
    const controller=new AbortController(); active=controller;
    form.querySelector("button").disabled=true; status.textContent="Verifying your access…";
    try {
      const token=await window.gallaspyAuth?.getCheckoutAccessToken?.();
      if(!token)throw Error("Sign in to My Gallaspy first.");
      const request=body=>fetch("https://thegallaspy.com/api/mobile/members-locker",{
        method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+token},
        body:JSON.stringify({code,...body}),cache:"no-store",signal:controller.signal
      });
      const response=await request({}), data=await response.json();
      if(!response.ok)throw Error(data.error||"Access denied.");
      for(const item of data.products){
        const photo=await request({image:item.id});
        if(!photo.ok)continue;
        const blob=await photo.blob();
        if(controller.signal.aborted)return;
        const url=URL.createObjectURL(blob);urls.add(url);
        const card=document.createElement("article"), image=document.createElement("img");
        image.src=url; image.alt=item.name+" — "+item.color;
        const title=document.createElement("strong");title.textContent=item.name;
        const color=document.createElement("p");color.textContent=item.color;
        card.append(image,title,color);grid.append(card);
      }
      if(controller.signal.aborted)return;
      form.hidden=true;status.textContent=grid.children.length?"Collection unlocked. Purchasing is not yet available.":"No collection items are currently available.";
    }catch(error){if(!controller.signal.aborted){status.textContent=error.message||"Unable to unlock the collection.";grid.replaceChildren();}}
    finally{if(!controller.signal.aborted)form.querySelector("button").disabled=false;}
  };
})();
