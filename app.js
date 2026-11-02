const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const naira=n=>'\u20A6'+n.toLocaleString('en-NG');
const wa=t=>`https://wa.me/${CFG.wa}?text=${encodeURIComponent(t)}`;
const byId=id=>PRODUCTS.find(p=>p.id===id);
function toast(m){let t=$('#toast');if(!t){t=document.createElement('div');t.id='toast';t.setAttribute('role','status');document.body.append(t)}t.textContent=m;t.classList.add('on');clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove('on'),3500)}
const NAV=[['index.html','Home'],['about.html','The Craft'],['collection.html','Collection'],['gallery.html','Gallery'],['contact.html','Contact']];
function layout(){
const cur=location.pathname.split('/').pop()||'index.html';
$('#hdr').innerHTML=`<div class="wrap bar"><a class="logo" href="index.html">ENNI <span>SHOE</span></a><button class="burger" aria-label="Open menu" aria-expanded="false"><i></i><i></i></button><nav id="nav">${NAV.map(([h,t])=>`<a href="${h}"${h===cur?' class="on"':''}>${t}</a>`).join('')}<a class="btn sm" href="${wa("Hi ENNI SHOE, I'd like to order")}" target="_blank" rel="noopener">Order on WhatsApp</a></nav></div>`;
const b=$('.burger');b.onclick=()=>b.setAttribute('aria-expanded',$('#nav').classList.toggle('open'));
$('#ftr').innerHTML=`<div class="wrap"><div class="grid"><div><h4>ENNI SHOE</h4><p>Handcrafted leather footwear, we craft your footprint; since 2019. Ibadan, Nigeria.</p></div><div><h4>Navigate</h4><a href="about.html">The Craft</a><a href="collection.html">Collection</a><a href="about.html#sizing">Size Guide</a><a href="contact.html#faq">FAQ</a></div><div><h4>Contact</h4><a href="mailto:${CFG.footerEmail}">${CFG.footerEmail}</a><a href="tel:${CFG.phone}">${CFG.phone}</a><a href="${wa("Hi ENNI SHOE, I'd like to order")}" target="_blank" rel="noopener">WhatsApp Order</a><a href="${CFG.ig}" target="_blank" rel="noopener">Instagram</a></div></div><p class="copy">\u00A9 2026 ENNI SHOE. All rights reserved. Handmade in Lagos, Nigeria</p></div>`;
document.body.insertAdjacentHTML('beforeend',`<div class="fab"><button id="top" aria-label="Back to top">\u2191</button><a href="${wa("Hi ENNI SHOE, I'd like to order")}" target="_blank" rel="noopener" aria-label="Order on WhatsApp">WA</a></div><div class="modal" id="modal" hidden><div class="mbox" role="dialog" aria-modal="true"><button class="x" aria-label="Close">\u00D7</button><div id="mbody"></div></div></div><div id="lb" hidden><button class="c" aria-label="Close">\u00D7</button><button class="p" aria-label="Previous">\u2039</button><img alt=""><p></p><button class="n" aria-label="Next">\u203A</button></div>`);
$('#top').onclick=()=>scrollTo({top:0});addEventListener('scroll',()=>$('#top').classList.toggle('on',scrollY>600),{passive:true});
$('.x').onclick=closeModal;$('#modal').onclick=e=>{if(e.target.id==='modal')closeModal()};
$('#lb .c').onclick=()=>$('#lb').hidden=true;$('#lb .p').onclick=()=>lbGo(-1);$('#lb .n').onclick=()=>lbGo(1);
addEventListener('keydown',e=>{if(e.key==='Escape'){closeModal();$('#lb').hidden=true}if(!$('#lb').hidden){if(e.key==='ArrowLeft')lbGo(-1);if(e.key==='ArrowRight')lbGo(1)}});
document.addEventListener('click',e=>{const o=e.target.closest('[data-open]'),r=e.target.closest('[data-order]'),l=e.target.closest('[data-lb]');
if(o)openProduct(o.dataset.open);if(r){e.preventDefault();openOrder(r.dataset.order)}if(l)openLb(+l.dataset.lb)});
reveal()}
function reveal(){const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.1});$$('.rv:not(.in)').forEach(n=>io.observe(n))}
let lastFocus;
function openModal(h){lastFocus=document.activeElement;$('#mbody').innerHTML=h;$('#modal').hidden=false;document.body.style.overflow='hidden';$('.x').focus()}
function closeModal(){$('#modal').hidden=true;document.body.style.overflow='';lastFocus&&lastFocus.focus&&lastFocus.focus()}
const card=p=>`<article class="card fade"><button class="ph" data-open="${p.id}" aria-label="View ${p.name}"><img loading="lazy" src="${pics(p)[0]}" alt="${p.name}"></button><div class="cb"><small>${p.cat}</small><h3>${p.name}</h3><p>${p.desc}</p><div class="row"><b>${naira(p.price)}</b><a href="#" data-order="${p.id}">Order \u2192</a></div></div></article>`;
function openProduct(id){const p=byId(id),im=pics(p),rel=PRODUCTS.filter(x=>x.id!==id).sort((a,b)=>(b.cat===p.cat)-(a.cat===p.cat)).slice(0,3);
openModal(`<div class="pd"><div><img class="main" src="${im[0]}" alt="${p.name}"><div class="th">${im.map((s,i)=>`<button class="${i?'':'on'}" data-th="${s}" aria-label="Photo ${i+1}"><img src="${s}" alt=""></button>`).join('')}</div></div><div><small class="gold">${p.cat}</small><h2>${p.name}</h2><div class="pr">${naira(p.price)}</div><p class="lead">${p.desc}</p><dl><dt>Colours</dt><dd>${p.colours.join(', ')}</dd><dt>Materials</dt><dd>${p.materials}</dd><dt>EU sizes</dt><dd>${p.sizes.join(', ')}</dd><dt>Custom</dt><dd>${p.custom}</dd></dl><button class="btn" data-order="${p.id}">Order Now</button></div></div><h3 style="margin-top:1.8rem">Related designs</h3><div class="rel">${rel.map(r=>`<button data-open="${r.id}"><img src="${pics(r)[0]}" alt="">${r.name}</button>`).join('')}</div>`);
$$('.th button').forEach(b=>b.onclick=()=>{$('.pd .main').src=b.dataset.th;$$('.th button').forEach(x=>x.classList.toggle('on',x===b))})}
function openOrder(id){const p=byId(id)||PRODUCTS[0];
openModal(`<h2>Order on WhatsApp</h2><p class="lead">Fill in your details and we'll open WhatsApp with your order ready to send.</p><form class="f" id="of" novalidate style="margin-top:1.2rem"><div class="two"><label><span>Name</span><input name="name" autocomplete="name"><small class="err"></small></label><label><span>Phone number</span><input name="phone" type="tel" autocomplete="tel"><small class="err"></small></label></div><label><span>Shoe</span><select name="shoe">${PRODUCTS.map(x=>`<option value="${x.id}"${x.id===p.id?' selected':''}>${x.name} - ${naira(x.price)}</option>`).join('')}</select></label><div class="two"><label><span>Size (EU)</span><select name="size"></select><small class="err"></small></label><label><span>Colour</span><select name="colour"></select><small class="err"></small></label></div><label><span>Quantity</span><input name="qty" type="number" min="1" max="20" value="1"><small class="err"></small></label><label><span>Additional instructions</span><textarea name="note" rows="3"></textarea></label><button class="btn" type="submit">Send order on WhatsApp</button><p class="note">This opens WhatsApp with your message. Nothing is saved on this website and no payment is taken here.</p></form>`);
const f=$('#of'),fill=()=>{const s=byId(f.shoe.value);f.size.innerHTML='<option value="">Choose size</option>'+s.sizes.map(z=>`<option>${z}</option>`).join('');f.colour.innerHTML='<option value="">Choose colour</option>'+s.colours.map(z=>`<option>${z}</option>`).join('')};
fill();f.shoe.onchange=fill;
f.onsubmit=e=>{e.preventDefault();const v=Object.fromEntries(new FormData(f)),er={};
if(v.name.trim().length<2)er.name='Enter your name.';if(!/^\+?[0-9\s-]{7,16}$/.test(v.phone.trim()))er.phone='Enter a valid phone number.';
if(!v.size)er.size='Choose a size.';if(!v.colour)er.colour='Choose a colour.';if(!(v.qty>=1&&v.qty<=20))er.qty='Quantity must be 1 to 20.';
showErr(f,er);if(Object.keys(er).length)return;const s=byId(v.shoe);
const msg=`Hi ENNI SHOE, I'd like to order:\nShoe: ${s.name} (${naira(s.price)})\nSize: EU ${v.size}\nColour: ${v.colour}\nQuantity: ${v.qty}\nName: ${v.name.trim()}\nPhone: ${v.phone.trim()}${v.note.trim()?'\nNotes: '+v.note.trim():''}`;
window.open(wa(msg),'_blank','noopener');toast('Opening WhatsApp. Send the message there to place your order.')}}
function showErr(f,er){$$('[name]',f).forEach(i=>{const m=i.parentElement.querySelector('.err');if(m){m.textContent=er[i.name]||'';i.classList.toggle('bad',!!er[i.name])}})}
let LB=[],li=0;
function openLb(i){li=i;lbGo(0);$('#lb').hidden=false}
function lbGo(d){li=(li+d+LB.length)%LB.length;const x=LB[li];$('#lb img').src=x.src;$('#lb img').alt=x.cap;$('#lb p').textContent=x.cap+' ('+(li+1)+' of '+LB.length+')'}
function sortP(l,k){const s={low:(a,b)=>a.price-b.price,high:(a,b)=>b.price-a.price,az:(a,b)=>a.name.localeCompare(b.name)}[k];return s?[...l].sort(s):l}
function chips(el,cb){el.innerHTML=['All',...CATS].map((c,i)=>`<button class="chip${i?'':' on'}" data-c="${c}">${c}</button>`).join('');el.onclick=e=>{const b=e.target.closest('.chip');if(!b)return;$$('.chip',el).forEach(x=>x.classList.toggle('on',x===b));cb(b.dataset.c)}}
function collectionPage(){const STEP=3;let cat='All',n=STEP;const g=$('#pg');
const run=(reset)=>{if(reset)n=STEP;const q=$('#q').value.toLowerCase().trim();let l=PRODUCTS.filter(p=>(cat==='All'||p.cat===cat)&&(p.name+p.desc+p.cat).toLowerCase().includes(q));l=sortP(l,$('#sort').value);
g.innerHTML=l.slice(0,n).map(card).join('')||'<p class="empty">No shoes match your search. Try another word or category.</p>';$('#more').hidden=l.length<=n;$('#count').textContent=l.length+' styles'};
chips($('#chips'),c=>{cat=c;run(true)});$('#q').oninput=()=>run(true);$('#sort').onchange=()=>run(true);$('#more').onclick=()=>{n+=STEP;run()};run(true)}
function galleryPage(){const all=PRODUCTS.flatMap(p=>pics(p).map((s,i)=>({src:s,cap:p.name+' - '+p.cat,cat:p.cat})));let cat='All';
const run=()=>{LB=all.filter(x=>cat==='All'||x.cat===cat);$('#mg').innerHTML=LB.map((x,i)=>`<button class="fade" data-lb="${i}" aria-label="Open ${x.cap}"><img loading="lazy" src="${x.src}" alt="${x.cap}"><span>${x.cap}</span></button>`).join('')};
chips($('#chips'),c=>{cat=c;run()});run()}
function contactForm(){const f=$('#cf');f.onsubmit=e=>{e.preventDefault();const v=Object.fromEntries(new FormData(f)),er={};
if(v.name.trim().length<2)er.name='Enter your name.';if(!/^\S+@\S+\.\S+$/.test(v.email.trim()))er.email='Enter a valid email address.';
if(v.phone.trim()&&!/^\+?[0-9\s-]{7,16}$/.test(v.phone.trim()))er.phone='Enter a valid phone number.';if(v.message.trim().length<10)er.message='Write at least 10 characters.';
showErr(f,er);if(Object.keys(er).length)return;
location.href=`mailto:${CFG.contactEmail}?subject=${encodeURIComponent('Message from '+v.name.trim())}&body=${encodeURIComponent(v.message.trim()+'\n\n'+v.name.trim()+'\n'+v.email.trim()+'\n'+v.phone.trim())}`;toast('Opening your email app to send this message.')}}
document.addEventListener('DOMContentLoaded',()=>{layout();const pg=document.body.dataset.page;
if(pg==='home'){$('#hero').src=pics(byId('black-leather-palm'))[0];$('#feat').innerHTML=PRODUCTS.slice(0,3).map(card).join('');
$('#ig').innerHTML=PRODUCTS.map(p=>`<a href="${CFG.ig}" target="_blank" rel="noopener" aria-label="${p.name} on Instagram"><img loading="lazy" src="${pics(p)[0]}" alt="${p.name}"></a>`).join('')}
if(pg==='collection')collectionPage();if(pg==='gallery')galleryPage();if(pg==='contact')contactForm();reveal()});
