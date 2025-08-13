
// Config
const CFG = window.FERME_PI_CONFIG;

// i18n
const state = { lang: 'fr' };
const i18n = {
  fr:{
    nav_home:'Accueil', nav_products:'Produits', nav_csa:'Paniers (CSA)', nav_visit:'Visites', nav_about:'À propos', nav_blog:'Nouvelles', nav_contact:'Contact', nav_shop:'Boutique',
    hero_title:'La Ferme Pi — Frais, local, durable.',
    hero_sub:'Maraîchage diversifié, paniers de saison, œufs frais et visites agrotouristiques à deux pas de chez vous.',
    hero_cta_primary:'Voir nos produits',
    hero_cta_secondary:'S’abonner aux paniers',
    products_title:'Nos produits vedettes',
    csa_title:'Paniers de saison (CSA)',
    csa_text:'Choisissez un panier hebdo ou bihebdo, points de cueillette: ferme, marché, livraison locale.',
    visit_title:'Visitez la ferme',
    visit_text:'Réservez une visite éducative, une auto-cueillette ou un événement privé.',
    about_title:'À propos de nous',
    about_text:'La Ferme Pi cultive avec amour des fruits et légumes sans compromis sur le goût ni la planète.',
    blog_title:'Nouvelles de la ferme',
    contact_title:'Nous joindre',
    contact_note:'Réponse sous 24–48 h.',
    form_name:'Votre nom', form_email:'Courriel', form_msg:'Message', form_send:'Envoyer',
    footer_rights:'© ' + new Date().getFullYear() + ' La Ferme Pi. Tous droits réservés.',
    visit_badge:'Agrotourisme',
    shop_title:'Boutique en ligne',
    shop_sub:'Ajoutez vos produits au panier. Paiement uniquement par Virement Interac.',
    cart_title:'Votre panier',
    empty_cart:'Votre panier est vide.',
    qty:'Qté', remove:'Retirer',
    subtotal:'Sous-total', taxes_note:'Taxes incluses si applicables.',
    checkout:'Passer la commande',
    checkout_title:'Paiement par Virement Interac',
    instruction_intro:'Merci! Pour confirmer votre commande, suivez ces étapes:',
    step1:'1) Envoyez un Virement Interac du montant total à',
    step2:'2) Utilisez le message du virement pour coller votre numéro de commande:',
    step3:'3) Nous confirmerons par courriel et préparerons votre commande.',
    order_info:'Résumé et numéro de commande',
    pickup_label:'Choix de cueillette/livraison',
    name_label:'Nom complet', email_label:'Courriel', note_label:'Note (ex. allergies)',
    place_order:'Générer numéro de commande',
    copy:'Copier', copied:'Copié!',
    email_order:'Envoyer ma commande par courriel',
    close:'Fermer',
  },
  en:{
    nav_home:'Home', nav_products:'Products', nav_csa:'CSA', nav_visit:'Visit', nav_about:'About', nav_blog:'News', nav_contact:'Contact', nav_shop:'Shop',
    hero_title:'La Ferme Pi — Fresh, local, sustainable.',
    hero_sub:'Diverse market gardening, CSA boxes, fresh eggs and agritourism near you.',
    hero_cta_primary:'Browse products',
    hero_cta_secondary:'Subscribe to CSA',
    products_title:'Featured products',
    csa_title:'Seasonal CSA Boxes',
    csa_text:'Pick weekly or biweekly. Pickup points: farm, market, local delivery.',
    visit_title:'Visit the farm',
    visit_text:'Book a tour, U-pick, or private event.',
    about_title:'About us',
    about_text:'La Ferme Pi grows delicious produce with care for people and planet.',
    blog_title:'Farm news',
    contact_title:'Contact us',
    contact_note:'We reply within 24–48 h.',
    form_name:'Your name', form_email:'Email', form_msg:'Message', form_send:'Send',
    footer_rights:'© ' + new Date().getFullYear() + ' La Ferme Pi. All rights reserved.',
    visit_badge:'Agritourism',
    shop_title:'Online shop',
    shop_sub:'Add products to your cart. Payment via Interac e‑Transfer only.',
    cart_title:'Your cart',
    empty_cart:'Your cart is empty.',
    qty:'Qty', remove:'Remove',
    subtotal:'Subtotal', taxes_note:'Taxes included if applicable.',
    checkout:'Checkout',
    checkout_title:'Pay with Interac e‑Transfer',
    instruction_intro:'Thanks! To confirm your order, follow these steps:',
    step1:'1) Send an Interac e‑Transfer for the total amount to',
    step2:'2) Put your order number in the transfer message:',
    step3:'3) We will confirm by email and prepare your order.',
    order_info:'Summary & order number',
    pickup_label:'Pickup/delivery choice',
    name_label:'Full name', email_label:'Email', note_label:'Note (e.g., allergies)',
    place_order:'Generate order number',
    copy:'Copy', copied:'Copied!',
    email_order:'Email my order',
    close:'Close',
  }
};

function setLang(l){
  state.lang = l;
  document.documentElement.setAttribute('lang', l);
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.getAttribute('data-i18n');
    el.textContent = i18n[l][key] || el.textContent;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{
    const key = el.getAttribute('data-i18n-placeholder');
    el.setAttribute('placeholder', i18n[l][key] || el.getAttribute('placeholder'));
  });
}

// Simple product catalog (editable)
const PRODUCTS = [
  {id:'tomates', fr:'Tomates anciennes', en:'Heirloom tomatoes', price:6.00, unit:'/lb'},
  {id:'oeufs', fr:'Oeufs (12)', en:'Eggs (12)', price:6.50, unit:'/dz'},
  {id:'miel', fr:'Miel 500g', en:'Honey 500g', price:10.00, unit:''},
  {id:'basilic', fr:'Basilic (bouquet)', en:'Basil (bunch)', price:3.50, unit:''},
  {id:'panier-mini', fr:'Panier mini (CSA essai)', en:'Mini CSA box (trial)', price:20.00, unit:''}
];

// Cart
const cart = {
  items: JSON.parse(localStorage.getItem('cart')||'[]'),
  save(){ localStorage.setItem('cart', JSON.stringify(this.items)); },
  add(id){ const line = this.items.find(x=>x.id===id); if(line){ line.qty+=1 } else { this.items.push({id, qty:1}) } this.save(); renderCart(); },
  setQty(id, qty){ const line = this.items.find(x=>x.id===id); if(line){ line.qty = Math.max(1, qty|0); this.save(); renderCart(); } },
  remove(id){ this.items = this.items.filter(x=>x.id!==id); this.save(); renderCart(); },
  clear(){ this.items=[]; this.save(); renderCart(); },
  total(){ return this.items.reduce((sum,l)=>{ const p = PRODUCTS.find(p=>p.id===l.id); return sum + (p?p.price:0)*l.qty; },0); }
};

function money(v){ return (new Intl.NumberFormat(state.lang==='fr'?'fr-CA':'en-CA',{style:'currency',currency:CFG.SHOP.currency})).format(v); }

function renderProducts(){
  const wrap = document.querySelector('#shop-products');
  wrap.innerHTML = '';
  PRODUCTS.forEach(p=>{
    const el = document.createElement('article');
    el.className='card product';
    const name = state.lang==='fr'?p.fr:p.en;
    el.innerHTML = `<h3>${name}</h3>
      <div class="price">${money(p.price)} <span class="small">${p.unit}</span></div>
      <button class="add" data-id="${p.id}">+ Ajouter</button>`;
    wrap.appendChild(el);
  });
  wrap.querySelectorAll('.add').forEach(btn=>btn.addEventListener('click',()=>cart.add(btn.dataset.id)));
}

function renderCart(){
  const box = document.querySelector('#cart-box');
  const list = document.querySelector('#cart-lines');
  const total = document.querySelector('#cart-total');
  list.innerHTML='';
  if(cart.items.length===0){
    list.innerHTML = `<div class="small">${i18n[state.lang].empty_cart}</div>`;
  } else {
    cart.items.forEach(l=>{
      const p = PRODUCTS.find(p=>p.id===l.id);
      const li = document.createElement('div');
      li.className='cart-line';
      li.innerHTML = `<div style="flex:1">${state.lang==='fr'?p.fr:p.en}</div>
        <input type="number" min="1" value="${l.qty}" />
        <div class="mono">${money(p.price*l.qty)}</div>
        <button data-x="${l.id}">✕</button>`;
      li.querySelector('input').addEventListener('change', ev=> cart.setQty(l.id, parseInt(ev.target.value,10)||1));
      li.querySelector('button').addEventListener('click',()=>cart.remove(l.id));
      list.appendChild(li);
    });
  }
  total.textContent = money(cart.total());
  box.querySelector('#checkout').disabled = cart.items.length===0;
}

function openModal(){ document.querySelector('#modal').classList.add('open'); }
function closeModal(){ document.querySelector('#modal').classList.remove('open'); }

function genOrderId(){
  const t = new Date();
  const rnd = Math.random().toString(36).slice(2,6).toUpperCase();
  return `${t.getFullYear()}${String(t.getMonth()+1).padStart(2,'0')}${String(t.getDate()).padStart(2,'0')}-${rnd}`;
}

function buildEmailLink(summary){
  const mail = CFG.SHOP.interacEmail;
  const subject = encodeURIComponent(`Commande ${summary.orderId} — ${CFG.SHOP.businessName}`);
  const body = encodeURIComponent(
`Bonjour,

Voici ma commande ${summary.orderId}:

${summary.lines.map(l=>`• ${l.name} ×${l.qty} — ${money(l.subtotal)}`).join('\n')}
Sous-total: ${money(summary.total)}

Pickup: ${summary.pickupLabel}
Nom: ${summary.name}
Courriel: ${summary.email}
Note: ${summary.note||'-'}

J'enverrai le Virement Interac de ${money(summary.total)} à ${mail}.
Merci!`
  );
  return `mailto:${mail}?subject=${subject}&body=${body}`;
}

window.addEventListener('DOMContentLoaded',()=>{
  // brand via CSS vars from config
  const r = document.documentElement;
  const B = CFG.BRAND;
  r.style.setProperty('--green', B.primary);
  r.style.setProperty('--leaf', B.secondary);
  r.style.setProperty('--wheat', B.accent);
  r.style.setProperty('--soil', B.soil);
  r.style.setProperty('--cream', B.cream);
  r.style.setProperty('--ink', B.ink);

  setLang('fr');
  document.querySelectorAll('[data-lang]').forEach(btn=>btn.addEventListener('click',()=>setLang(btn.dataset.lang)));

  // Render shop
  renderProducts(); renderCart();

  // Checkout
  document.querySelector('#checkout').addEventListener('click', ()=>{
    openModal();
    document.querySelector('#order-summary').textContent='';
    document.querySelector('#order-id').textContent='';
  });

  document.querySelector('#close-modal').addEventListener('click', closeModal);

  document.querySelector('#place-order').addEventListener('click', ()=>{
    const name = document.querySelector('#ck-name').value.trim();
    const email = document.querySelector('#ck-email').value.trim();
    const note = document.querySelector('#ck-note').value.trim();
    const pick = document.querySelector('#ck-pickup').value;
    if(!name || !email){ alert(state.lang==='fr'?'Entrez nom et courriel.':'Enter name and email.'); return; }
    const orderId = genOrderId();
    const lines = cart.items.map(l=>{
      const p = PRODUCTS.find(p=>p.id===l.id);
      return { id:l.id, name:state.lang==='fr'?p.fr:p.en, qty:l.qty, subtotal:p.price*l.qty };
    });
    const total = cart.total();
    const pickupLabel = CFG.SHOP.pickupOptions.find(x=>x.id===pick);
    const summary = { orderId, lines, total, name, email, note, pickup:pick, pickupLabel: state.lang==='fr'?pickupLabel.fr:pickupLabel.en };
    document.querySelector('#order-id').textContent = orderId;
    document.querySelector('#order-summary').textContent =
      lines.map(l=>`${l.name} ×${l.qty} — ${money(l.subtotal)}`).join('\n') + `\n${(state.lang==='fr'?'Sous-total':'Subtotal')}: ${money(total)}`;
    // Build email link
    const emailBtn = document.querySelector('#email-order');
    emailBtn.href = buildEmailLink(summary);
    // Store plain text for copy
    const copyText = `${CFG.SHOP.businessName} — ${state.lang==='fr'?'Commande':'Order'} ${orderId}`;
    emailBtn.dataset.copy = copyText;
    // Optionally clear cart after generating
    // cart.clear();
  });

  document.querySelector('#copy-id').addEventListener('click', (e)=>{
    const txt = document.querySelector('#order-id').textContent.trim();
    if(!txt) return;
    navigator.clipboard.writeText(txt).then(()=>{
      e.target.textContent = i18n[state.lang].copied;
      setTimeout(()=> e.target.textContent = i18n[state.lang].copy, 1200);
    });
  });
});
