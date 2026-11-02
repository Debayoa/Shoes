/* CENTRAL PRODUCT DATA - add a new shoe by adding one P({...}) entry.
   Put photos in assets/images/ and set image:'assets/images/name.jpg' and images:[...].
   Leave image empty to use a generated placeholder. */
const CFG={wa:'2348122867348',phone:'+2348122867348',contactEmail:'abdullahadisa16@gmail.com',footerEmail:'okanlawonmuhideen21@gmail.com',ig:'https://www.instagram.com/ennishoe'};
const CATS=['Women','Men','Sandals & Slides'];
const P=o=>({image:'',images:[],colours:['Black','Brown'],sizes:[38,40,42,44,46],materials:'Full-grain leather',custom:'Custom sizing or colour takes 7-10 working days, since each pair is cut to order.',...o});
const PRODUCTS=[
P({id:'female-slippers',name:'Female Slippers',cat:'Women',price:18000,desc:'Soft-sole comfort slippers, everyday wear.'}),
P({id:'black-leather-palm',name:'Black Leather Palm',cat:'Men',price:32000,desc:'Structured loafer for business and formal wear.',colours:['Black']}),
P({id:'male-slippers',name:'Male Slippers',cat:'Men',price:17500,desc:'Lightweight, durable, built for daily rounds.'}),
P({id:'slide-sander',name:'Slide Sander',cat:'Sandals & Slides',price:20000,desc:'Rugged slide built for outdoor, all-day comfort.'}),
P({id:'sandals',name:'Sandals',cat:'Sandals & Slides',price:19000,desc:'Breathable open-cut leather for warm days.'}),
P({id:'loafers',name:'Loafers',cat:'Men',price:29500,desc:'Classic silhouette, timeless everyday style.'})
];
/* Placeholder artwork (SVG), replaced automatically once real photos are set. */
function ph(p,i){const h=[...p.id].reduce((a,c)=>a+c.charCodeAt(0),0)%40+20,H=[170,210,250][i%3],y=H-90;
const s=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 ${H}"><rect width="210" height="${H}" fill="hsl(${h},28%,${80-i*3}%)"/><g transform="translate(20 ${y})" fill="#2b1c12"><path d="M0 50V16Q38 8 66 -8L86 8Q124 18 170 44V50Z"/><rect y="50" width="170" height="7" fill="#a8844b"/></g><text x="105" y="${H-14}" text-anchor="middle" font-family="Georgia" font-size="11" fill="#2b1c12">${p.name.replace(/&/g,'and')}</text></svg>`;
return 'data:image/svg+xml,'+encodeURIComponent(s)}
function pics(p){return [p.image||ph(p,0),...(p.images.length?p.images:[1,2].map(i=>ph(p,i)))]}
