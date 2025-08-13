
const CFG = window.FERME_PI_CONFIG;
const PRODUCTS = [
  {id:'sauces', fr:'Sauces fortes', price:8.00},
  {id:'conf-piments', fr:'Confitures de piments', price:7.50},
  {id:'conf-rhub-piments', fr:'Confiture rhubarbe et piments', price:7.50},
  {id:'sirop-menthe', fr:'Sirop de menthe caliente', price:6.00},
];
const Cart = {
  key:'ferme-pi-cart',
  items(){ try{return JSON.parse(localStorage.getItem(this.key))||[]}catch(_){return[]} },
  save(it){ localStorage.setItem(this.key, JSON.stringify(it)); },
  add(id){ const it=this.items(); const l=it.find(x=>x.id===id); if(l){l.qty++} else {it.push({id,qty:1})} this.save(it); },
  set(id,q){ const it=this.items(); const l=it.find(x=>x.id===id); if(l){l.qty=Math.max(1,q|0)} this.save(it); },
  remove(id){ this.save(this.items().filter(x=>x.id!==id)); },
  clear(){ this.save([]); },
  total(){ return this.items().reduce((s,l)=>{ const p=PRODUCTS.find(p=>p.id===l.id); return s+(p?p.price:0)*l.qty },0) }
};
function money(v){ return new Intl.NumberFormat('fr-CA',{style:'currency',currency:CFG.SHOP.currency}).format(v); }
function renderCatalog(){
  const wrap=document.querySelector('#catalog'); if(!wrap) return;
  wrap.innerHTML='';
  PRODUCTS.forEach(p=>{
    const el=document.createElement('article'); el.className='card product';
    el.innerHTML=`<h3>${p.fr}</h3><div class="price">${money(p.price)}</div><button class="add" data-id="${p.id}">+ Ajouter</button>`;
    wrap.appendChild(el);
  });
  wrap.querySelectorAll('.add').forEach(b=>b.addEventListener('click',()=>{Cart.add(b.dataset.id); updateCartBadge();}));
}
function renderCart(){
  const list=document.querySelector('#cart-lines'); if(!list) return;
  const items=Cart.items(); list.innerHTML='';
  if(items.length===0){ list.innerHTML='<div class="small">Votre panier est vide.</div>'; }
  else{
    items.forEach(l=>{
      const p=PRODUCTS.find(p=>p.id===l.id);
      const div=document.createElement('div'); div.className='cart-line';
      div.innerHTML=`<div style="flex:1">${p.fr}</div><input type="number" min="1" value="${l.qty}"/><div class="mono">${money(p.price*l.qty)}</div><button data-x="${l.id}">✕</button>`;
      div.querySelector('input').addEventListener('change',e=>{Cart.set(l.id, parseInt(e.target.value,10)||1); renderCart(); updateCartBadge();});
      div.querySelector('button').addEventListener('click',()=>{Cart.remove(l.id); renderCart(); updateCartBadge();});
      list.appendChild(div);
    });
  }
  const tot=document.querySelector('#cart-total'); if(tot) tot.textContent=money(Cart.total());
  const ck=document.querySelector('#checkout'); if(ck) ck.toggleAttribute('disabled', items.length===0);
}
function genOrderId(){ const t=new Date(), r=Math.random().toString(36).slice(2,6).toUpperCase(); return `${t.getFullYear()}${String(t.getMonth()+1).padStart(2,'0')}${String(t.getDate()).padStart(2,'0')}-${r}`; }
function setupCheckout(){
  const btn=document.querySelector('#place-order'); if(!btn) return;
  btn.addEventListener('click',()=>{
    const name=document.querySelector('#ck-name').value.trim();
    const email=document.querySelector('#ck-email').value.trim();
    const note=document.querySelector('#ck-note').value.trim();
    if(!name||!email){ alert('Entrez nom et courriel.'); return; }
    const id=genOrderId();
    document.querySelector('#order-id').textContent=id;
    const lines=Cart.items().map(l=>{const p=PRODUCTS.find(p=>p.id===l.id); return `• ${p.fr} ×${l.qty} — ${money(p.price*l.qty)}`;}).join('\n');
    document.querySelector('#order-summary').textContent = `${lines}\nSous-total: ${money(Cart.total())}`;
    const mail=CFG.SHOP.interacEmail;
    const subject=encodeURIComponent(`Commande ${id} — ${CFG.SHOP.businessName}`);
    const body=encodeURIComponent(`Bonjour,\n\nVoici ma commande ${id}:\n\n${lines}\nSous-total: ${money(Cart.total())}\n\nNom: ${name}\nCourriel: ${email}\nNote: ${note||'-'}\n\nJ'enverrai le Virement Interac à ${mail}.\nMerci!`);
    document.querySelector('#email-order').href=`mailto:${mail}?subject=${subject}&body=${body}`;
  });
  document.querySelector('#copy-id')?.addEventListener('click',()=>{
    const txt=document.querySelector('#order-id').textContent.trim(); if(!txt) return; navigator.clipboard.writeText(txt);
  });
}
function updateCartBadge(){
  const n=Cart.items().reduce((s,l)=>s+l.qty,0);
  const badge=document.querySelector('#cart-badge'); if(badge) badge.textContent = n>0?`(${n})`:'';
}
window.addEventListener('DOMContentLoaded',()=>{ renderCatalog(); renderCart(); setupCheckout(); updateCartBadge(); });
