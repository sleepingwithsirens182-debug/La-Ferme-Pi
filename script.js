
const state = { lang: 'fr' };
const i18n = {
  fr:{
    nav_home:'Accueil', nav_products:'Produits', nav_about:'À propos', nav_contact:'Contact',
    hero_title:'La Ferme Pi — Frais, local, durable.',
    hero_sub:'Maraîchage diversifié et transformations gourmandes, tout près de chez vous.',
    hero_cta_primary:'Voir nos produits',
    products_title:'Produits vedettes',
    about_title:'À propos de nous',
    contact_title:'Nous joindre',
    contact_note:'Réponse sous 24–48 h.',
    form_name:'Votre nom', form_email:'Courriel', form_msg:'Message', form_send:'Envoyer',
    footer_rights:'© ' + new Date().getFullYear() + ' La Ferme Pi. Tous droits réservés.'
  },
  en:{
    nav_home:'Home', nav_products:'Products', nav_about:'About', nav_contact:'Contact',
    hero_title:'La Ferme Pi — Fresh, local, sustainable.',
    hero_sub:'Market gardening and tasty transformations near you.',
    hero_cta_primary:'Browse products',
    products_title:'Featured products',
    about_title:'About us',
    contact_title:'Contact us',
    contact_note:'We reply within 24–48 h.',
    form_name:'Your name', form_email:'Email', form_msg:'Message', form_send:'Send',
    footer_rights:'© ' + new Date().getFullYear() + ' La Ferme Pi. All rights reserved.'
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
window.addEventListener('DOMContentLoaded',()=>{
  setLang('fr');
  document.querySelectorAll('[data-lang]').forEach(btn=>btn.addEventListener('click',()=>setLang(btn.getAttribute('data-lang'))));
  const form = document.querySelector('#contact-form');
  form?.addEventListener('submit', (e)=>{
    e.preventDefault();
    alert(state.lang === 'fr' ? 'Merci! Nous vous répondrons bientôt.' : 'Thanks! We will get back to you soon.');
    form.reset();
  });
});
