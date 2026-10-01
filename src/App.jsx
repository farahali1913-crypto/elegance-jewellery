import { useState } from "react";
import earrings from "./assets/earrings.jpg";
import bracelets from "./assets/bracelets.jpg";
import necklace from "./assets/necklace.jpg";
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const addToCart = (product, price) => {
    setCart([...cart, { name: product, price: price }]);
  };

  const removeFromCart = (indexToRemove) => {
    setCart(
      cart.filter((_, index) => index !== indexToRemove)
    );
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price,
    0
  );

  const filteredProducts = [
    {
      name: "Elegant Necklace",
      price: 1500,
      image: necklace,
      alt: "Elegant Necklace",
    },
    {
      name: "Golden Earrings",
      price: 1000,
      image: earrings,
      alt: "Golden Earrings",
    },
    {
      name: "Beautiful Bracelet",
      price: 1200,
      image: bracelets,
      alt: "Beautiful Bracelet",
    },
  ].filter((product) =>
    product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleWhatsAppOrder = () => {
    const phoneNumber = "923249422350";

    const orderItems = cart
      .map(
        (item, index) =>
          `${index + 1}. ${item.name} - Rs. ${item.price.toLocaleString()}`
      )
      .join("\n");

    const message =
      `Hello Elegance Jewellery! 👋\n\n` +
      `I would like to place an order:\n\n` +
      `${orderItems}\n\n` +
      `Total Items: ${cart.length}\n` +
      `Total Price: Rs. ${totalPrice.toLocaleString()}\n\n` +
      `Thank you!`;

    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappURL, "_blank");
  };

  return (
    <div className="app">

      {/* ================= NAVBAR ================= */}
      <nav className="navbar">
        <div className="navbar-logo">
          <h2>Elegance Jewellery</h2>
        </div>

        <div className="navbar-links">
          <a href="#home">Home</a>
          <a href="#shop">Shop</a>
          <a href="#cart">Cart</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>


      {/* ================= HOME ================= */}
      <section id="home" className="hero-section">

        <div className="hero-content">

          <span className="hero-small-title">
            ELEGANT • TIMELESS • BEAUTIFUL
          </span>

          <h1>
            Beautiful Jewellery
            <br />
            for Every Occasion
          </h1>

          <p>
            Discover elegant jewellery made to make you shine.
          </p>

          <button
            className="hero-button"
            onClick={() => {
              document
                .getElementById("shop")
                .scrollIntoView({ behavior: "smooth" });
            }}
          >
            Shop Now
          </button>

        </div>

      </section>


      {/* ================= SHOP ================= */}
      <section id="shop" className="shop-section">

        <div className="section-heading">
          <span>OUR COLLECTION</span>

          <h2>Our Jewellery</h2>

          <p>
            Discover our beautiful collection of elegant jewellery.
          </p>
        </div>


        {/* ================= SEARCH BAR ================= */}
        <div className="search-container">

          <div className="search-box">

            <span className="search-icon">⌕</span>

            <input
              type="text"
              placeholder="Search jewellery..."
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
            />

            {searchTerm && (
              <button
                className="clear-search"
                onClick={() => setSearchTerm("")}
                aria-label="Clear search"
              >
                ×
              </button>
            )}

          </div>

        </div>


        {/* ================= PRODUCT GRID ================= */}
        {filteredProducts.length > 0 ? (

          <div className="product-grid">

            {filteredProducts.map((product) => (

              <div
                className="product-card"
                key={product.name}
              >

                <div className="product-image-wrapper">

                  <img
                    src={product.image}
                    alt={product.alt}
                  />

                </div>

                <div className="product-info">

                  <h3>{product.name}</h3>

                  <p className="product-price">
                    Rs. {product.price.toLocaleString()}
                  </p>

                  <button
                    className="product-button"
                    onClick={() =>
                      addToCart(
                        product.name,
                        product.price
                      )
                    }
                  >
                    Add to Cart
                  </button>

                </div>

              </div>

            ))}

          </div>

        ) : (

          <div className="no-results">

            <h3>No jewellery found</h3>

            <p>
              Try searching for another jewellery item.
            </p>

          </div>

        )}

      </section>


      {/* ================= CART ================= */}
      <section id="cart" className="cart-section">

        <div className="section-heading cart-heading">

          <span>YOUR SELECTION</span>

          <h2>Your Cart</h2>

        </div>


        {cart.length === 0 ? (

          <div className="empty-cart">

            <p>Your cart is currently empty.</p>

            <span>
              Add some beautiful jewellery to your cart.
            </span>

          </div>

        ) : (

          <div className="cart-content">

            <ul className="cart-list">

              {cart.map((item, index) => (

                <li
                  className="cart-item"
                  key={index}
                >

                  <div className="cart-item-details">

                    <h3>{item.name}</h3>

                    <p>
                      Rs. {item.price.toLocaleString()}
                    </p>

                  </div>


                  <button
                    className="remove-button"
                    onClick={() =>
                      removeFromCart(index)
                    }
                  >
                    Remove
                  </button>

                </li>

              ))}

            </ul>


            {/* ================= CART SUMMARY ================= */}
            <div className="cart-summary">

              <div className="cart-total-row">

                <span>Total Items</span>

                <strong>{cart.length}</strong>

              </div>

              <div className="cart-total-row total-price-row">

                <span>Total Price</span>

                <strong>
                  Rs. {totalPrice.toLocaleString()}
                </strong>

              </div>


              {/* ================= WHATSAPP ORDER ================= */}
              <button
                className="whatsapp-order-button"
                onClick={handleWhatsAppOrder}
              >
                <span className="whatsapp-icon">
                  WhatsApp
                </span>

                Order on WhatsApp
              </button>

            </div>

          </div>

        )}

      </section>


      {/* ================= ABOUT ================= */}
      <section id="about" className="about-section">

        <div className="section-heading">

          <span>OUR STORY</span>

          <h2>About Us</h2>

        </div>

        <p className="about-text">

          We offer beautiful and affordable jewellery for
          women who love elegant style. Our collection is
          designed to add a touch of beauty and confidence
          to every occasion.

        </p>

      </section>


      {/* ================= CONTACT ================= */}
      <section id="contact" className="contact-section">

        <div className="section-heading">

          <span>GET IN TOUCH</span>

          <h2>Contact Us</h2>

        </div>

        <div className="contact-card">

          <p>
            Have a question or want to know more about
            our jewellery?
          </p>

          <p className="whatsapp-number">
            WhatsApp: +92 3249422350
          </p>

        </div>

      </section>


      {/* ================= FOOTER ================= */}
      <footer className="footer">

        <p>
          © 2026 Elegance Jewellery. All rights reserved.
        </p>

      </footer>

    </div>
  );
}

export default App;