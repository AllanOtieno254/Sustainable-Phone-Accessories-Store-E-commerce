/* app.js - global scripts for Sustainable Store
   Features:
   - Load products from /data/products.json
   - Render product cards for home and shop pages
   - Cart management using localStorage (add/remove/update)
   - Utility: format currency, show toast notifications
*/

/* CONFIG */
const API = {
  productsUrl: '/data/products.json' // relative path to local data file
};

/* UTILITIES */
function formatCurrency(v){ return '$' + Number(v).toFixed(2); }

/* Simple toast */
function toast(message, timeout=2000){
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = message;
  document.body.appendChild(t);
  setTimeout(()=> t.remove(), timeout);
}

/* CART (localStorage) */
const Cart = {
  key: 'sustainable_cart_v1',
  get(){ return JSON.parse(localStorage.getItem(this.key) || '[]'); },
  save(items){ localStorage.setItem(this.key, JSON.stringify(items)); },
  add(product, qty=1){
    const items = this.get();
    const found = items.find(i=>i.id===product.id);
    if(found){ found.qty += qty; } else { items.push({...product, qty}); }
    this.save(items);
    updateCartBadge();
  },
  update(id, qty){
    let items = this.get();
    items = items.map(i=> i.id===id ? {...i, qty} : i).filter(i=>i.qty>0);
    this.save(items);
    updateCartBadge();
  },
  remove(id){
    let items = this.get();
    items = items.filter(i=>i.id!==id);
    this.save(items);
    updateCartBadge();
  },
  clear(){ localStorage.removeItem(this.key); updateCartBadge(); }
};

/* Update cart badge(s) */
function updateCartBadge(){
  const badges = document.querySelectorAll('.cart-badge');
  const count = Cart.get().reduce((s,i)=>s+i.qty,0);
  badges.forEach(b=>b.textContent = count);
}

/* Load products JSON */
async function loadProducts(){
  try {
    const res = await fetch(API.productsUrl);
    const data = await res.json();
    return data;
  } catch(err){
    console.error('Failed to load products', err);
    return [];
  }
}

/* Product card HTML generator */
function productCardHTML(p){
  return `
    <div class="product card" data-id="${p.id}">
      <img src="${p.image}" alt="${p.name} image" />
      <h4>${p.name}</h4>
      <p class="muted small">${p.short}</p>
      <div style="display:flex;align-items:center;justify-content:space-between;margin-top:0.5rem">
        <div class="price">${formatCurrency(p.price)}</div>
        <div>
          <button class="btn btn-outline btn-view" data-id="${p.id}">View</button>
          <button class="btn btn-primary btn-add" data-id="${p.id}">Add</button>
        </div>
      </div>
    </div>
  `;
}

/* DOM ready */
document.addEventListener('DOMContentLoaded', async () => {
  updateCartBadge();

  // Render featured products (home page)
  const featured = document.getElementById('featured-products');
  if(featured){
    const prods = await loadProducts();
    featured.innerHTML = prods.slice(0,8).map(productCardHTML).join('\n');
  }

  // Render shop grid (shop page)
  const shopGrid = document.getElementById('shop-grid');
  if(shopGrid){
    const prods = await loadProducts();
    shopGrid.innerHTML = prods.map(productCardHTML).join('\n');
  }

  // Click delegation for Add/View buttons
  document.body.addEventListener('click', (e) => {
    const addBtn = e.target.closest('.btn-add');
    if(addBtn){
      const id = addBtn.dataset.id;
      loadProducts().then(products => {
        const p = products.find(x=>x.id===id);
        if(p){ Cart.add(p,1); toast('Added to cart'); }
      });
    }
    const viewBtn = e.target.closest('.btn-view');
    if(viewBtn){
      const id = viewBtn.dataset.id;
      window.location.href = 'product.html?id=' + encodeURIComponent(id);
    }
  });

  // CART PAGE RENDER
  const cartList = document.getElementById('cart-list');
  if(cartList){
    const items = Cart.get();
    if(items.length === 0){
      cartList.innerHTML = '<p>Your cart is empty.</p>';
    } else {
      const listHtml = items.map(i => `
        <div class="card" style="display:flex;gap:1rem;align-items:center;margin-bottom:0.6rem">
          <img src="${i.image}" alt="${i.name}" style="width:80px;height:80px;object-fit:cover;border-radius:8px"/>
          <div style="flex:1">
            <strong>${i.name}</strong><div class="muted small">${formatCurrency(i.price)} each</div>
          </div>
          <div style="display:flex;flex-direction:column;align-items:end">
            <div>
              <button class="btn btn-outline cart-decrease" data-id="${i.id}">-</button>
              <span style="padding:0 8px">${i.qty}</span>
              <button class="btn btn-outline cart-increase" data-id="${i.id}">+</button>
            </div>
            <button class="btn btn-outline" style="margin-top:6px" data-id="${i.id}" id="remove-${i.id}">Remove</button>
          </div>
        </div>
      `).join('\n');
      cartList.innerHTML = listHtml;

      // Summary
      const subtotal = items.reduce((s,i)=>s + i.price * i.qty, 0);
      const shipping = items.length ? 4.99 : 0;
      const total = subtotal + shipping;
      const summary = document.getElementById('cart-summary');
      if(summary) summary.innerHTML = `
        <div class="card">
          <h3>Order summary</h3>
          <p>Subtotal: <strong>${formatCurrency(subtotal)}</strong></p>
          <p>Shipping: <strong>${formatCurrency(shipping)}</strong></p>
          <p>Total: <strong>${formatCurrency(total)}</strong></p>
          <a href="checkout.html" class="btn btn-primary">Proceed to checkout</a>
        </div>
      `;
    }
  }

  // Cart interactions (increase, decrease, remove, clear)
  document.body.addEventListener('click', (e)=>{
    if(e.target.matches('.cart-increase')){
      const id = e.target.dataset.id; const items = Cart.get(); const it = items.find(x=>x.id===id); if(it){ Cart.update(id, it.qty+1); location.reload(); }
    }
    if(e.target.matches('.cart-decrease')){
      const id = e.target.dataset.id; const items = Cart.get(); const it = items.find(x=>x.id===id); if(it){ Cart.update(id, Math.max(1, it.qty-1)); location.reload(); }
    }
    if(e.target.matches('[id^="remove-"]')){
      const id = e.target.id.replace('remove-',''); Cart.remove(id); location.reload();
    }
    if(e.target.matches('#clear-cart')){ Cart.clear(); location.reload(); }
  });

  // PRODUCT PAGE logic (product.html)
  const productContainer = document.getElementById('product-container');
  if(productContainer){
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const products = await loadProducts();
    const p = products.find(x=>x.id === id);
    if(!p){
      productContainer.innerHTML = '<p>Product not found.</p>';
    } else {
      productContainer.innerHTML = `
        <div class="product card">
          <img src="${p.image}" alt="${p.name}" style="height:320px;object-fit:cover" />
          <h2>${p.name}</h2>
          <p class="muted">${p.short}</p>
          <p>${p.description}</p>
          <div style="display:flex;align-items:center;gap:1rem;margin-top:1rem">
            <div class="price">${formatCurrency(p.price)}</div>
            <div>
              <input type="number" id="qty" value="1" min="1" style="width:70px;padding:6px;border-radius:6px;border:1px solid rgba(0,0,0,0.08)">
            </div>
            <div>
              <button id="add-to-cart" class="btn btn-primary">Add to cart</button>
              <button id="buy-now" class="btn btn-outline">Buy now</button>
            </div>
          </div>
        </div>
      `;
      document.getElementById('add-to-cart').addEventListener('click', ()=>{
        const qty = parseInt(document.getElementById('qty').value || '1', 10);
        Cart.add(p, qty); toast('Added to cart'); updateCartBadge();
      });
      document.getElementById('buy-now').addEventListener('click', ()=>{
        Cart.add(p,1); window.location.href = 'checkout.html';
      });
    }
  }

  // CHECKOUT PAGE render (checkout.html)
  const checkoutOrder = document.getElementById('checkout-order');
  if(checkoutOrder){
    const items = Cart.get();
    if(items.length === 0){
      checkoutOrder.innerHTML = '<p>Your cart is empty.</p>';
      const btn = document.getElementById('place-order'); if(btn) btn.disabled = true;
    } else {
      checkoutOrder.innerHTML = items.map(i=>`<div style="display:flex;justify-content:space-between;padding:6px 0">${i.name} x ${i.qty} <strong>${formatCurrency(i.price * i.qty)}</strong></div>`).join('') + '<hr/>';
      const subtotal = items.reduce((s,i)=>s+i.price*i.qty,0); const shipping = 4.99; const total = subtotal + shipping;
      const totalEl = document.getElementById('checkout-total'); if(totalEl) totalEl.textContent = formatCurrency(total);
    }
  }

  // PLACE ORDER (mock)
  const placeOrderBtn = document.getElementById('place-order');
  if(placeOrderBtn){
    placeOrderBtn.addEventListener('click', ()=> {
      const name = document.getElementById('billing-name').value.trim();
      const email = document.getElementById('billing-email').value.trim();
      if(!name || !email){ alert('Please complete billing name and email'); return; }
      const orderId = 'ORD-' + Math.random().toString(36).slice(2,9).toUpperCase();
      Cart.clear();
      window.location.href = 'order-success.html?orderId=' + encodeURIComponent(orderId);
    });
  }

  // ORDER SUCCESS page
  const orderSuccess = document.getElementById('order-success');
  if(orderSuccess){
    const params = new URLSearchParams(window.location.search);
    const id = params.get('orderId') || 'UNKNOWN';
    orderSuccess.innerHTML = `<div class="card" style="text-align:center;padding:2rem"><h2>Thank you!</h2><p>Your order <strong>${id}</strong> has been placed. We'll email you the receipt shortly.</p><a href="shop.html" class="btn btn-primary">Back to shop</a></div>`;
  }

  // Newsletter subscribe (mock)
  const subscribeForm = document.getElementById('subscribe-form');
  if(subscribeForm){
    subscribeForm.addEventListener('submit', (e)=>{ e.preventDefault(); const email = document.getElementById('subscribe-email').value.trim(); if(email){ toast('Thanks for subscribing!'); subscribeForm.reset(); } else alert('Enter email'); });
  }

  // Contact form (mock)
  const contactForm = document.getElementById('contact-form');
  if(contactForm){
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const result = document.getElementById('contact-result');
      if(result) result.textContent = 'Thanks — we received your message (mock).';
      contactForm.reset();
    });
  }
});
