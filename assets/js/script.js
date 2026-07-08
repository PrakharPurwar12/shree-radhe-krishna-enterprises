// ============================================
// Shree Radhe Krishna Enterprises — script.js
// Core App Logic (Tailwind + Dark Mode edition)
// ============================================

const PRODUCTS = [
  // School Books (1-4)
  { id: 1,  title: 'Oxford School Atlas',                price: 280,  category: 'School Books',            image: 'https://placehold.co/300x300/F0F4FF/081B4B?text=Oxford+Atlas',    badge: 'Recommended', availability: 'In Stock', description: 'Essential atlas for geographic and map-pointing studies in secondary schools. Published by Oxford University Press.' },
  { id: 2,  title: 'High School English Grammar',        price: 220,  category: 'School Books',            image: 'https://placehold.co/300x300/F0F4FF/081B4B?text=Wren+Martin',     badge: 'Essential', availability: 'In Stock', description: 'The classic Wren & Martin English grammar guide, standard textbook for sentence construction and grammar clarity.' },
  { id: 3,  title: 'Modern School Mathematics Class 8',  price: 155,  category: 'School Books',            image: 'https://placehold.co/300x300/F0F4FF/081B4B?text=Maths+Class+8',    badge: '', availability: 'In Stock', description: 'Standard middle school mathematics textbook compiled under CBSE standards for Class 8.' },
  { id: 4,  title: 'English Reader Class 5',             price: 95,   category: 'School Books',            image: 'https://placehold.co/300x300/F0F4FF/081B4B?text=Reader+Class+5',   badge: '', availability: 'Available on Order', description: 'Syllabus reading book for elementary English classes. Standard CBSE textbook.' },
  
  // NCERT Books (5-8)
  { id: 5,  title: 'NCERT Mathematics Class 10',         price: 160,  category: 'NCERT Books',             image: 'https://placehold.co/300x300/F0F4FF/081B4B?text=NCERT+Maths+10',   badge: 'Best Seller', availability: 'In Stock', description: 'Official National Council of Educational Research and Training (NCERT) syllabus textbook for CBSE Class 10 Mathematics.' },
  { id: 6,  title: 'NCERT Science Class 10',              price: 190,  category: 'NCERT Books',             image: 'https://placehold.co/300x300/F0F4FF/081B4B?text=NCERT+Sci+10',     badge: '', availability: 'In Stock', description: 'Official NCERT Science Class 10 textbook covering Physics, Chemistry, and Biology essentials.' },
  { id: 7,  title: 'NCERT Mathematics Class 12 (Part 1)', price: 150,  category: 'NCERT Books',             image: 'https://placehold.co/300x300/F0F4FF/081B4B?text=NCERT+Maths+12',   badge: 'Board Prep', availability: 'Limited Stock', description: 'Official NCERT Class 12 Mathematics part 1 textbook covering Calculus, Algebra, and Vectors.' },
  { id: 8,  title: 'NCERT Science Class 9',              price: 150,  category: 'NCERT Books',             image: 'https://placehold.co/300x300/F0F4FF/081B4B?text=NCERT+Sci+9',      badge: '', availability: 'In Stock', description: 'Official NCERT Class 9 Science textbook. Crucial foundational textbook for board preparation.' },
  
  // Competitive Exam Books (9-12)
  { id: 9,  title: 'Arihant General Knowledge 2025',     price: 195,  category: 'Competitive Exam Books',  image: 'https://placehold.co/300x300/F0F4FF/081B4B?text=GK+2025',         badge: 'Popular', availability: 'In Stock', description: 'Latest edition general knowledge guide covering history, polity, geography, sciences, and current affairs. Highly popular for SSC/Railways.' },
  { id: 10, title: 'Quantitative Aptitude - R.S. Aggarwal', price: 425, category: 'Competitive Exam Books',  image: 'https://placehold.co/300x300/F0F4FF/081B4B?text=Quant+Aptitude',  badge: 'Standard', availability: 'In Stock', description: 'Dr. R.S. Aggarwal\'s quantitative aptitude guide, containing thousands of practice questions for UPSC, Banking, and SSC.' },
  { id: 11, title: 'Lucent General Knowledge English',    price: 220,  category: 'Competitive Exam Books',  image: 'https://placehold.co/300x300/F0F4FF/081B4B?text=Lucent+GK',       badge: '', availability: 'In Stock', description: 'Comprehensive GK textbook popular among state and central government recruitment exam aspirants.' },
  { id: 12, title: 'Verbal & Non-Verbal Reasoning',      price: 495,  category: 'Competitive Exam Books',  image: 'https://placehold.co/300x300/F0F4FF/081B4B?text=Reasoning',        badge: '', availability: 'Available on Order', description: 'Dr. R.S. Aggarwal\'s reasoning textbook, ideal guide for CAT, Bank PO, and SSC exam preparation.' },
  
  // Stationery (13-16)
  { id: 13, title: 'Reynolds 045 Ball Pen (Pack 10)',    price: 50,   category: 'Stationery',              image: 'https://placehold.co/300x300/F0FFF4/166534?text=Reynolds+045',     badge: 'Value Pack', availability: 'In Stock', description: 'The classic blue Reynolds 045 ballpoint pens. Known for fine handwriting performance and long-lasting ink reservoirs.' },
  { id: 14, title: 'Premium Geometry Box Set',           price: 95,   category: 'Stationery',              image: 'https://placehold.co/300x300/F0FFF4/166534?text=Geometry+Set',     badge: '', availability: 'In Stock', description: 'Complete mathematical drawing set containing compass, divider, protractor, set squares, ruler, and pencils.' },
  { id: 15, title: 'Apsara Platinum Pencils Pack',       price: 50,   category: 'Stationery',              image: 'https://placehold.co/300x300/F0FFF4/166534?text=Apsara+Pencils',   badge: '', availability: 'In Stock', description: 'Pack of 10 extra dark writing pencils. Set includes a handy sharpener and high-quality eraser.' },
  { id: 16, title: 'Faber-Castell Highlighters Set',     price: 120,  category: 'Stationery',              image: 'https://placehold.co/300x300/F0FFF4/166534?text=Highlighters',     badge: '', availability: 'Limited Stock', description: 'Set of 5 pastel colors highlighter markers. Ideal for study notes, reference marking, and office files.' },
  
  // Notebooks & Registers (17-20)
  { id: 17, title: 'Classmate A4 Notebook (172 Pages)',    price: 60,   category: 'Notebooks & Registers',   image: 'https://placehold.co/300x300/FFFBEB/D4AF37?text=Classmate+A4',    badge: '', availability: 'In Stock', description: 'Standard single line Classmate A4 notebook. Features premium quality white paper pages with custom back cover facts.' },
  { id: 18, title: 'Spiral Bound Register A4 (300 pgs)', price: 150,  category: 'Notebooks & Registers',   image: 'https://placehold.co/300x300/FFFBEB/D4AF37?text=Spiral+Register',  badge: '', availability: 'In Stock', description: 'High-grade spiral notebook register. Perfect for maintaining notes, office journals, or daily registries.' },
  { id: 19, title: 'Hardbound Office Register (144 pgs)', price: 90,   category: 'Notebooks & Registers',   image: 'https://placehold.co/300x300/FFFBEB/D4AF37?text=Office+Register',  badge: '', availability: 'In Stock', description: 'Durable ledger/office register with thick hard covers and numbered sheets. Ideal for bookkeeping.' },
  { id: 20, title: 'Softcover Practical Notebook',       price: 75,   category: 'Notebooks & Registers',   image: 'https://placehold.co/300x300/FFFBEB/D4AF37?text=Practical+Notebook', badge: '', availability: 'Available on Order', description: 'Practical notebook for school laboratory work. Alternating ruled and plain pages for science diagrams.' },
  
  // Sports Equipment (21-24)
  { id: 21, title: 'Cricket Tennis Ball (Pack 6)',         price: 240,  category: 'Sports Equipment',        image: 'https://placehold.co/300x300/FFF5F5/991B1B?text=Tennis+Balls',     badge: 'Club Grade', availability: 'In Stock', description: 'Durable heavy-duty tennis balls designed for outdoor street cricket and club matches.' },
  { id: 22, title: 'Yonex ZR 100 Badminton Racket',       price: 599,  category: 'Sports Equipment',        image: 'https://placehold.co/300x300/FFF5F5/991B1B?text=Yonex+Racket',     badge: '', availability: 'Limited Stock', description: 'Lightweight aluminum-alloy frame badminton racket, perfect for intermediate play and daily sports.' },
  { id: 23, title: 'Nivia Storm Football Size 5',        price: 399,  category: 'Sports Equipment',        image: 'https://placehold.co/300x300/FFF5F5/991B1B?text=Nivia+Football',   badge: '', availability: 'In Stock', description: 'Official size 5 Nivia rubber football. Highly durable and perfect for hard ground play.' },
  { id: 24, title: 'Carrom Board Set (Medium)',          price: 999,  category: 'Sports Equipment',        image: 'https://placehold.co/300x300/FFF5F5/991B1B?text=Carrom+Board',     badge: '', availability: 'Available on Order', description: 'Classic wooden carrom board. Complete bundle includes pocket coins, striker, and styling powder.' },
  
  // Art & Craft (25-28)
  { id: 25, title: 'Camel Poster Colors Set 12',         price: 140,  category: 'Art & Craft',             image: 'https://placehold.co/300x300/FDF4FF/7C3AED?text=Poster+Colors',   badge: '', availability: 'In Stock', description: 'Rich, vivid poster color paints for student artwork. Non-toxic and mixes smoothly.' },
  { id: 26, title: 'Fevicol MR Squeezy Bottle (200g)',   price: 75,   category: 'Art & Craft',             image: 'https://placehold.co/300x300/FDF4FF/7C3AED?text=Fevicol+200g',    badge: '', availability: 'In Stock', description: 'Strong white synthetic adhesive. Perfect for school craft, cardboard bonding, and bookbinding.' },
  { id: 27, title: 'Camel Wax Crayons Set (24 Shades)',  price: 60,   category: 'Art & Craft',             image: 'https://placehold.co/300x300/FDF4FF/7C3AED?text=Wax+Crayons',      badge: '', availability: 'In Stock', description: 'Bright, smudge-free wax crayons for kids and school drawing classes.' },
  { id: 28, title: 'Premium Drawing Book A3 Size',       price: 90,   category: 'Art & Craft',             image: 'https://placehold.co/300x300/FDF4FF/7C3AED?text=Drawing+Book+A3',  badge: '', availability: 'Available on Order', description: 'Large sketchbook containing 36 thick cartridge paper sheets. Suitable for watercolor, crayons, and sketching.' },
  
  // Office Supplies (29-32)
  { id: 29, title: 'Kangaro Stapler HP-10 + Pin Set',    price: 95,   category: 'Office Supplies',         image: 'https://placehold.co/300x300/F0F9FF/0369A1?text=Kangaro+Stapler',  badge: '', availability: 'In Stock', description: 'Heavy-duty steel stapler bundle. Includes 1000 standard stapler pins for document filing.' },
  { id: 30, title: 'JK Copier A4 Paper Ream (500 sheets)', price: 280,  category: 'Office Supplies',         image: 'https://placehold.co/300x300/F0F9FF/0369A1?text=JK+A4+Ream',      badge: 'Bulk', availability: 'In Stock', description: '500 sheets of high-quality 75 GSM A4 paper. Compatible with standard laser and inkjet office printers.' },
  { id: 31, title: 'Hardboard Lever Arch Folder File',   price: 85,   category: 'Office Supplies',         image: 'https://placehold.co/300x300/F0F9FF/0369A1?text=Index+File',       badge: '', availability: 'In Stock', description: 'Durable lever arch file index folder. Perfect for indexing tax documents, bills, and office files.' },
  { id: 32, title: 'Camel Whiteboard Markers Pack',      price: 100,  category: 'Office Supplies',         image: 'https://placehold.co/300x300/F0F9FF/0369A1?text=Camel+Markers',    badge: '', availability: 'Limited Stock', description: 'Pack of 4 colors whiteboard marker pens (Black, Blue, Red, Green). Refillable and easy to erase.' }
];

// ---- Product Card HTML (dark mode aware) ----
function productCardHTML(p) {
  const badge = p.badge
    ? `<span class="absolute top-2.5 left-2.5 z-20 bg-gold text-brand text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">${p.badge}</span>`
    : '';
  return `
    <div class="product-card-enhanced bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden group relative">
      ${badge}
      <div class="bg-[#F8FAFC] dark:bg-[#0F172A] aspect-square flex items-center justify-center p-5 overflow-hidden relative group/img border-b border-gray-100 dark:border-gray-800">
        <img src="${p.image}" alt="${p.title}" class="w-36 h-36 object-contain group-hover/img:scale-110 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" loading="lazy">
        <!-- Quick View Hover Overlay -->
        <div class="absolute inset-0 bg-brand/40 dark:bg-slate-950/60 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10 backdrop-blur-[2px]">
          <button
            onclick="openQuickView(${p.id}, event)"
            class="bg-white dark:bg-slate-900 text-brand dark:text-white hover:bg-gold dark:hover:bg-gold hover:text-brand dark:hover:text-brand text-xs font-bold px-4 py-2 rounded-lg shadow-lg transform translate-y-3 group-hover/img:translate-y-0 transition-all duration-300 btn-ripple">
            Quick View
          </button>
        </div>
      </div>
      <div class="p-5">
        <p class="text-xs font-semibold text-gold uppercase tracking-wider mb-1.5">${p.category}</p>
        <h3 class="text-sm font-semibold text-gray-800 dark:text-slate-100 mb-4 leading-snug line-clamp-2 h-10">${p.title}</h3>
        <div class="flex items-center justify-between border-t border-gray-50 dark:border-gray-700/50 pt-3 mt-1">
          <span class="text-base font-bold text-brand dark:text-white">₹${p.price}</span>
          <button
            onclick="addToCart(${p.id})"
            id="add-btn-${p.id}"
            class="text-xs bg-brand dark:bg-gold dark:text-brand text-white px-3 py-1.5 rounded-lg font-semibold hover:bg-[#0d2a6e] dark:hover:bg-[#F5C542] transition-colors btn-ripple">
            Add to Cart
          </button>
        </div>
      </div>
    </div>`;
}

// ---- Cart State ----
let cart = JSON.parse(localStorage.getItem('srk_cart') || '[]');

function saveCart() { localStorage.setItem('srk_cart', JSON.stringify(cart)); }

function updateCartCount() {
  const total = cart.reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll('[data-cart-count]').forEach(el => {
    el.textContent = total;
    el.classList.toggle('hidden', total === 0);
  });
}

// ---- Cart Actions ----
window.addToCart = function(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;
  const existing = cart.find(i => i.id === id);
  if (existing) { existing.qty++; } else { cart.push({ ...product, qty: 1 }); }
  saveCart();
  updateCartCount();

  if (window.showToast) {
    const name = product.title.length > 28 ? product.title.substring(0, 28) + '…' : product.title;
    window.showToast(`"${name}" added to cart`, '🛍️');
  }

  const btn = document.getElementById(`add-btn-${id}`);
  if (btn) {
    const prev = btn.textContent;
    btn.textContent = 'Added ✓';
    btn.classList.add('!bg-green-600', '!text-white');
    btn.classList.remove('dark:bg-gold', 'dark:text-brand');
    setTimeout(() => {
      btn.textContent = prev;
      btn.classList.remove('!bg-green-600', '!text-white');
      btn.classList.add('dark:bg-gold', 'dark:text-brand');
    }, 1200);
  }
  if (window.location.pathname.endsWith('cart.html')) renderCart();
};

window.updateQty = function(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
  saveCart();
  updateCartCount();
  if (delta > 0 && window.showToast) window.showToast('Quantity updated', '✓');
  renderCart();
};

window.removeFromCart = function(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
  updateCartCount();
  if (window.showToast) window.showToast('Item removed from cart', '🗑️');
  renderCart();
};

// ---- Cart Render ----
function renderCart() {
  const listEl    = document.getElementById('cart-items');
  const subtotalEl = document.getElementById('cart-subtotal');
  const totalEl   = document.getElementById('cart-total');
  const emptyEl   = document.getElementById('cart-empty');
  const summaryEl = document.getElementById('cart-summary');
  if (!listEl) return;

  if (cart.length === 0) {
    listEl.innerHTML = '';
    if (emptyEl)   emptyEl.classList.remove('hidden');
    if (summaryEl) { summaryEl.classList.add('hidden'); summaryEl.style.display = ''; }
    return;
  }
  if (emptyEl)   emptyEl.classList.add('hidden');
  if (summaryEl) { summaryEl.classList.remove('hidden'); summaryEl.style.display = 'grid'; }

  listEl.innerHTML = cart.map(item => `
    <div class="flex gap-4 py-5 border-b border-gray-100 dark:border-gray-700 last:border-0">
      <img src="${item.image}" alt="${item.title}" class="w-20 h-20 rounded-lg object-contain bg-[#F8FAFC] dark:bg-[#0F172A] p-2 shrink-0">
      <div class="flex-1 min-w-0">
        <p class="text-xs text-gold font-semibold uppercase mb-0.5">${item.category}</p>
        <p class="font-semibold text-gray-800 dark:text-slate-100 text-sm leading-snug mb-1.5">${item.title}</p>
        <p class="text-sm font-bold text-brand dark:text-white">₹${item.price}</p>
      </div>
      <div class="flex flex-col items-end gap-2 shrink-0">
        <button onclick="removeFromCart(${item.id})" class="text-xs text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors">Remove</button>
        <div class="flex items-center gap-0 border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
          <button onclick="updateQty(${item.id}, -1)" class="w-8 h-8 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm font-bold text-gray-600 dark:text-gray-300">−</button>
          <span class="w-7 text-center text-sm font-semibold dark:text-white">${item.qty}</span>
          <button onclick="updateQty(${item.id}, 1)"  class="w-8 h-8 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm font-bold text-gray-600 dark:text-gray-300">+</button>
        </div>
        <p class="text-sm font-bold text-gray-700 dark:text-gray-300">₹${item.price * item.qty}</p>
      </div>
    </div>`).join('');

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  if (subtotalEl) subtotalEl.textContent = `₹${subtotal}`;
  if (totalEl)    totalEl.textContent    = `₹${subtotal}`;
}

// ---- Pages Init ----
function initCarouselControls() {
  const container = document.getElementById('featured-products');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  if (!container || !prevBtn || !nextBtn) return;

  const scrollAmount = () => {
    const item = container.querySelector('.carousel-item');
    return item ? item.getBoundingClientRect().width : 300;
  };

  prevBtn.onclick = () => {
    container.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
  };

  nextBtn.onclick = () => {
    container.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
  };

  // Drag-to-scroll functionality for desktops
  let isDown = false;
  let startX;
  let scrollLeft;

  container.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
    container.style.scrollBehavior = 'auto'; // Disable smooth scroll while dragging
  });

  container.addEventListener('mouseleave', () => {
    isDown = false;
    container.style.scrollBehavior = 'smooth';
  });

  container.addEventListener('mouseup', () => {
    isDown = false;
    container.style.scrollBehavior = 'smooth';
  });

  container.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 1.5;
    container.scrollLeft = scrollLeft - walk;
  });
}

function initHome() {
  const container = document.getElementById('featured-products');
  if (!container) return;

  // Custom skeletons for carousel item structure
  if (container.classList.contains('carousel-container')) {
    container.innerHTML = Array.from({ length: 4 }).map(() => `
      <div class="carousel-item p-2">
        <div class="rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800/60 bg-white dark:bg-[#1E293B]">
          <div class="skeleton h-48 w-full"></div>
          <div class="p-4 space-y-3">
            <div class="skeleton h-3 w-1/3 rounded"></div>
            <div class="skeleton h-4 w-3/4 rounded"></div>
            <div class="skeleton h-3 w-1/2 rounded"></div>
            <div class="flex justify-between items-center mt-2">
              <div class="skeleton h-5 w-16 rounded"></div>
              <div class="skeleton h-8 w-24 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>`).join('');
  } else if (window.showSkeletons) {
    window.showSkeletons('featured-products', 4);
  }

  setTimeout(() => {
    const featured = PRODUCTS.slice(0, 8); // Display top 8 products in carousel
    container.innerHTML = featured.map(p => `
      <div class="carousel-item p-2">
        <div class="tilt-card h-full">
          ${productCardHTML(p)}
        </div>
      </div>
    `).join('');

    // Re-initialize premium animations / tilts
    if (window.initTiltCards) window.initTiltCards();
    if (window.initMagneticButtons) window.initMagneticButtons();
    initCarouselControls();
  }, 400);
}

function renderProductList(list) {
  const container = document.getElementById('product-list');
  if (!container) return;
  if (list.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-20 text-center">
        <div class="text-5xl mb-4">🔍</div>
        <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">No products found</h3>
        <p class="text-sm text-gray-400">Try a different search term or category.</p>
      </div>`;
    return;
  }
  container.innerHTML = list.map(productCardHTML).join('');
}

function initProducts() {
  const searchEl = document.getElementById('search');
  const catBtns  = document.querySelectorAll('[data-cat]');
  
  // Parse query parameter
  const params = new URLSearchParams(window.location.search);
  const catParam = params.get('category');
  let activeCategory = catParam || 'All';

  const filter = () => {
    const q = searchEl ? searchEl.value.toLowerCase() : '';
    renderProductList(PRODUCTS.filter(p =>
      (activeCategory === 'All' || p.category === activeCategory) &&
      (p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
    ));
  };

  // Apply initial active styles and click events
  catBtns.forEach(btn => {
    const isActive = btn.dataset.cat === activeCategory;
    btn.classList.toggle('bg-brand',    isActive);
    btn.classList.toggle('dark:bg-gold',isActive);
    btn.classList.toggle('dark:text-brand', isActive);
    btn.classList.toggle('text-white',  isActive);
    btn.classList.toggle('border-brand',isActive);
    btn.classList.toggle('dark:border-gold', isActive);
    btn.classList.toggle('text-gray-600', !isActive);
    btn.classList.toggle('dark:text-gray-400', !isActive);
    btn.classList.toggle('border-gray-300', !isActive);
    btn.classList.toggle('dark:border-gray-600', !isActive);

    btn.addEventListener('click', () => {
      activeCategory = btn.dataset.cat;
      
      // Update URL query parameter without page reload
      const url = new URL(window.location);
      if (activeCategory === 'All') {
        url.searchParams.delete('category');
      } else {
        url.searchParams.set('category', activeCategory);
      }
      window.history.replaceState({}, '', url);

      catBtns.forEach(b => {
        const isBActive = b === btn;
        b.classList.toggle('bg-brand',    isBActive);
        b.classList.toggle('dark:bg-gold',isBActive);
        b.classList.toggle('dark:text-brand', isBActive);
        b.classList.toggle('text-white',  isBActive);
        b.classList.toggle('border-brand',isBActive);
        b.classList.toggle('dark:border-gold', isBActive);
        b.classList.toggle('text-gray-600', !isBActive);
        b.classList.toggle('dark:text-gray-400', !isBActive);
        b.classList.toggle('border-gray-300', !isBActive);
        b.classList.toggle('dark:border-gray-600', !isBActive);
      });
      filter();
    });
  });

  if (searchEl) searchEl.addEventListener('input', filter);

  // Skeleton → real products
  if (window.showSkeletons) window.showSkeletons('product-list', 8);
  setTimeout(filter, 300);
}

function initCart() {
  renderCart();
  const btn = document.getElementById('checkout-btn');
  if (btn) btn.addEventListener('click', () =>
    window.showToast
      ? window.showToast('Our team will contact you to confirm the order!', '✅')
      : alert('Our team will contact you to confirm your order.')
  );
}

function initContact() {
  const form = document.getElementById('contact-form');
  const msg  = document.getElementById('form-message');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (msg) { msg.textContent = 'Thank you! We will get back to you within 24 hours.'; msg.classList.remove('hidden'); }
    if (window.showToast) window.showToast('Message sent successfully!', '📩');
    form.reset();
    setTimeout(() => { if (msg) msg.classList.add('hidden'); }, 5000);
  });
}

// ---- Quick View Modal ----
window.openQuickView = function(productId, event) {
  if (event) {
    event.stopPropagation();
    event.preventDefault();
  }
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const modal = document.getElementById('quick-view-modal');
  const modalImg = document.getElementById('modal-product-img');
  const modalBadge = document.getElementById('modal-product-badge');
  const modalCategory = document.getElementById('modal-product-category');
  const modalTitle = document.getElementById('modal-product-title');
  const modalPrice = document.getElementById('modal-product-price');
  const modalAddBtn = document.getElementById('modal-add-to-cart-btn');
  const modalDesc = document.getElementById('modal-product-description');
  const modalAvailContainer = document.getElementById('modal-product-availability-container');
  const modalWhatsapp = document.getElementById('modal-whatsapp-btn');

  if (!modal) return;

  modalImg.src = product.image;
  modalImg.alt = product.title;

  if (product.badge) {
    modalBadge.textContent = product.badge;
    modalBadge.classList.remove('hidden');
  } else {
    modalBadge.classList.add('hidden');
  }

  modalCategory.textContent = product.category;
  modalTitle.textContent = product.title;
  modalPrice.textContent = `₹${product.price}`;

  if (modalDesc) {
    modalDesc.textContent = product.description || 'Premium quality business stationery and school essentials.';
  }

  if (modalAvailContainer) {
    let availHTML = '';
    const status = product.availability || 'In Stock';
    if (status === 'In Stock') {
      availHTML = `
        <span class="inline-flex items-center gap-1.5 text-xs text-green-600 dark:text-green-400 font-semibold bg-green-50 dark:bg-green-900/10 px-2.5 py-1 rounded-md">
          <span class="w-1.5 h-1.5 rounded-full bg-green-600 dark:bg-green-400 animate-pulse"></span>
          In Stock
        </span>`;
    } else if (status === 'Limited Stock') {
      availHTML = `
        <span class="inline-flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 font-semibold bg-amber-50 dark:bg-amber-900/10 px-2.5 py-1 rounded-md">
          <span class="w-1.5 h-1.5 rounded-full bg-amber-600 dark:bg-amber-400 animate-pulse"></span>
          Limited Stock
        </span>`;
    } else {
      availHTML = `
        <span class="inline-flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400 font-semibold bg-blue-50 dark:bg-blue-900/10 px-2.5 py-1 rounded-md">
          <span class="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse"></span>
          Available on Order
        </span>`;
    }
    modalAvailContainer.innerHTML = availHTML;
  }

  if (modalWhatsapp) {
    const textMsg = `Hi, I am interested in purchasing "${product.title}" (Price: ₹${product.price}) from Shree Radhe Krishna Enterprises. Please provide details.`;
    modalWhatsapp.href = `https://wa.me/917905048864?text=${encodeURIComponent(textMsg)}`;
  }

  modalAddBtn.onclick = () => {
    addToCart(product.id);
    closeQuickView();
  };

  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};

window.closeQuickView = function() {
  const modal = document.getElementById('quick-view-modal');
  if (!modal) return;
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};

document.addEventListener('DOMContentLoaded', () => {
  const closeBtn = document.getElementById('close-modal-btn');
  const modal = document.getElementById('quick-view-modal');
  if (closeBtn) closeBtn.onclick = closeQuickView;
  if (modal) {
    modal.onclick = (e) => {
      if (e.target === modal) closeQuickView();
    };
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeQuickView();
    });
  }
});

// ---- Active Nav ----
function setActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('[data-nav]').forEach(link => {
    const isActive = link.dataset.nav === page;
    link.classList.toggle('text-brand',  isActive);
    link.classList.toggle('dark:text-white', isActive);
    link.classList.toggle('font-semibold', isActive);
    link.classList.toggle('text-gray-500', !isActive);
    link.classList.toggle('dark:text-gray-400', !isActive);
  });
}

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  setActiveNav();

  const page = window.location.pathname.split('/').pop() || 'index.html';
  if (page === 'index.html' || page === '') initHome();
  if (page === 'products.html') initProducts();
  if (page === 'cart.html')     initCart();
  if (page === 'contact.html')  initContact();
});