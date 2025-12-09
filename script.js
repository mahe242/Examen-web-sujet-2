// script.js minimal — affichage des Ferrari avec images et prix sous les images
const products = [
  {
    id: 1,
    name: 'Ferrari 488',
    price: 250000,
    img: 'https://forbes.it/wp-content/uploads/2019/10/Ferrari_488_Challenge_Evo_01.jpg',
    desc: 'V8 biturbo, équilibre entre sportivité et confort.',
    specs: [
      'Moteur: V8 biturbo 3.9 L',
      'Puissance: ~660 ch',
      '0–100 km/h: ~3,0 s',
      'Transmission: Double embrayage, 7 rapports',
      'Places: 2'
    ]
  }
];

const productsEl = document.getElementById('products');
const cartCountEl = document.getElementById('cart-count');
let cartCount = 0;

function render() {
  if (!productsEl) return;
  productsEl.innerHTML = '';

  products.forEach(p => {
    const el = document.createElement('div');
    el.className = 'product';
    el.innerHTML = `
      ${p.img ? `<img src="${p.img}" alt="${p.name}">` : ''}
      <div class="info">
        <div class="name">${p.name}</div>
        <div class="price">€${p.price.toLocaleString('fr-FR')}</div>
        <button class="toggle-desc" data-id="${p.id}">Voir description</button>
        <div class="desc">${p.desc}</div>
        ${p.specs ? `<ul class="specs">${p.specs.map(s => `<li>${s}</li>`).join('')}</ul>` : ''}
      </div>
      <button class="btn" data-id="${p.id}">Acheter</button>
    `;
    productsEl.appendChild(el);
  });

  document.querySelectorAll('.btn').forEach(b => {
    b.addEventListener('click', () => {
      const id = Number(b.getAttribute('data-id'));
      const prod = products.find(x => x.id === id);
      cartCount += 1;
      if (cartCountEl) cartCountEl.textContent = cartCount;
      // total
      cartTotal += (prod ? prod.price : 0);
      if (cartTotalEl) cartTotalEl.textContent = cartTotal.toLocaleString('fr-FR');
    });
  });

  // toggle description buttons
  document.querySelectorAll('.toggle-desc').forEach(btn => {
    btn.addEventListener('click', () => {
      const productEl = btn.closest('.product');
      if (!productEl) return;
      const desc = productEl.querySelector('.desc');
      const specs = productEl.querySelector('.specs');
      if (!desc) return;
      const isShown = desc.classList.toggle('show');
      if (specs) specs.classList.toggle('show', isShown);
      btn.textContent = isShown ? 'Masquer description' : 'Voir description';
    });
  });
}

// appel initial
// valeur totale du panier
let cartTotal = 0;
const cartTotalEl = document.getElementById('cart-total');

render();
