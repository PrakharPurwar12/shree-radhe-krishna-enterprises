import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Mock book data
const booksData = [
  { id: 1, title: "The Great Novel", price: 12.99, category: "Fiction", image: "https://via.placeholder.com/150" },
  { id: 2, title: "Mystery Tales", price: 9.99, category: "Fiction", image: "https://via.placeholder.com/150" },
  { id: 3, title: "Sci-Fi Adventures", price: 14.99, category: "Sci-Fi", image: "https://via.placeholder.com/150" },
  { id: 4, title: "Classic Reads", price: 10.99, category: "Fiction", image: "https://via.placeholder.com/150" },
  { id: 5, title: "Fantasy Realms", price: 15.99, category: "Fantasy", image: "https://via.placeholder.com/150" },
  { id: 6, title: "Historical Fiction", price: 11.99, category: "Fiction", image: "https://via.placeholder.com/150" },
  { id: 7, title: "Thriller Nights", price: 13.99, category: "Thriller", image: "https://via.placeholder.com/150" },
  { id: 8, title: "Poetry Collection", price: 8.99, category: "Poetry", image: "https://via.placeholder.com/150" },
];

// Navigation Component
const NavBar = ({ cartCount }) => (
  <nav className="bg-blue-600 text-white p-4 sticky top-0 shadow-md">
    <div className="container mx-auto flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">BookHaven</Link>
      <ul className="flex space-x-6">
        <li><Link to="/" className="hover:text-gray-200">Home</Link></li>
        <li><Link to="/books" className="hover:text-gray-200">Books</Link></li>
        <li><Link to="/about" className="hover:text-gray-200">About</Link></li>
        <li><Link to="/contact" className="hover:text-gray-200">Contact</Link></li>
        <li><Link to="/cart" className="hover:text-gray-200">Cart ({cartCount})</Link></li>
      </ul>
    </div>
  </nav>
);

// Home Component
const Home = ({ addToCart }) => (
  <div>
    <section className="bg-blue-100 py-20 text-center">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-4">Welcome to BookHaven</h1>
        <p className="text-lg mb-6">Discover a world of stories, knowledge, and adventure.</p>
        <Link to="/books" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Shop Now</Link>
      </div>
    </section>
    <section className="container mx-auto py-10">
      <h2 className="text-3xl font-bold text-center mb-8">Featured Books</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {booksData.slice(0, 4).map(book => (
          <div key={book.id} className="bg-white p-4 rounded shadow">
            <img src={book.image} alt={book.title} className="w-full h-48 object-cover mb-4" />
            <h3 className="text-xl font-semibold">{book.title}</h3>
            <p className="text-gray-600">${book.price.toFixed(2)}</p>
            <button
              className="bg-blue-600 text-white py-2 px-4 rounded mt-2 hover:bg-blue-700"
              onClick={() => addToCart(book)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  </div>
);

// Books Component
const Books = ({ addToCart }) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const categories = ['All', 'Fiction', 'Sci-Fi', 'Fantasy', 'Thriller', 'Poetry'];

  const filteredBooks = booksData.filter(book =>
    book.title.toLowerCase().includes(search.toLowerCase()) &&
    (category === 'All' || book.category === category)
  );

  return (
    <section className="container mx-auto py-10">
      <h2 className="text-3xl font-bold text-center mb-8">Our Collection</h2>
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center">
        <input
          type="text"
          placeholder="Search books..."
          className="w-full sm:w-1/3 p-2 border rounded mb-4 sm:mb-0"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          className="w-full sm:w-1/4 p-2 border rounded"
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredBooks.map(book => (
          <div key={book.id} className="bg-white p-4 rounded shadow">
            <img src={book.image} alt={book.title} className="w-full h-48 object-cover mb-4" />
            <h3 className="text-xl font-semibold">{book.title}</h3>
            <p className="text-gray-600">${book.price.toFixed(2)}</p>
            <p className="text-gray-500">{book.category}</p>
            <button
              className="bg-blue-600 text-white py-2 px-4 rounded mt-2 hover:bg-blue-700"
              onClick={() => addToCart(book)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

// About Component
const About = () => (
  <section className="container mx-auto py-10">
    <h2 className="text-3xl font-bold text-center mb-8">About BookHaven</h2>
    <p className="text-lg text-gray-700 mb-6">BookHaven is your one-stop destination for books of all genres. Founded in 2025, our mission is to bring stories and knowledge to every reader. We believe in the power of books to inspire, educate, and entertain.</p>
    <p className="text-lg text-gray-700">Our team is passionate about curating the best selection of books, from timeless classics to the latest bestsellers. Visit us online or in-store to explore our collection!</p>
  </section>
);

// Contact Component
const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setTimeout(() => {
        setFormData({ name: '', email: '', message: '' });
        setSubmitted(false);
        navigate('/');
      }, 2000);
    }
  };

  return (
    <section className="container mx-auto py-10">
      <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
      <p className="text-lg text-gray-700 mb-6">Have questions? Reach out to us!</p>
      {submitted && <p className="text-green-600 text-center mb-4">Message sent! Redirecting...</p>}
      <div className="max-w-md mx-auto">
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            className="w-full p-2 border rounded"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Message</label>
          <textarea
            className="w-full p-2 border rounded"
            rows="4"
            value={formData.message}
            onChange={e => setFormData({ ...formData, message: e.target.value })}
          />
        </div>
        <button
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          onClick={handleSubmit}
        >
          Send Message
        </button>
      </div>
      <p className="text-lg text-gray-700 mt-6">Or email us at: <a href="mailto:info@bookhaven.com" className="text-blue-600">info@bookhaven.com</a></p>
    </section>
  );
};

// Cart Component
const Cart = ({ cart, updateQuantity, removeFromCart }) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <section className="container mx-auto py-10">
      <h2 className="text-3xl font-bold text-center mb-8">Your Cart</h2>
      <div className="bg-white p-4 rounded shadow">
        {cart.length === 0 ? (
          <p className="text-gray-700">Your cart is empty.</p>
        ) : (
          cart.map(item => (
            <div key={item.id} className="flex justify-between items-center mb-2">
              <span>{item.title} (x{item.quantity})</span>
              <div className="flex items-center">
                <button
                  className="bg-gray-300 text-gray-700 py-1 px-2 rounded mr-2"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  -
                </button>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
                <button
                  className="bg-gray-300 text-gray-700 py-1 px-2 rounded ml-2 mr-2"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
                <button
                  className="bg-red-600 text-white py-1 px-2 rounded"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <p className="text-xl font-semibold mt-4">Total: ${total.toFixed(2)}</p>
      <button className="bg-blue-600 text-white py-2 px-4 rounded mt-4 hover:bg-blue-700">Checkout</button>
    </section>
  );
};

// Main App Component
const App = () => {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (book) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === book.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...book, quantity: 1 }];
    });
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      setCart(prev => prev.filter(item => item.id !== id));
    } else {
      setCart(prev =>
        prev.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <BrowserRouter>
      <NavBar cartCount={cartCount} />
      <Routes>
        <Route path="/" element={<Home addToCart={addToCart} />} />
        <Route path="/books" element={<Books addToCart={addToCart} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />} />
      </Routes>
      <footer className="bg-blue-600 text-white py-6">
        <div className="container mx-auto text-center">
          <p>© 2025 BookHaven. All rights reserved.</p>
        </div>
      </footer>
    </BrowserRouter>
  );
};

// Render the app
const root = createRoot(document.getElementById('root'));
root.render(<App />);