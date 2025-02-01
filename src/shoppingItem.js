import shoppingitems from './res/shoppingitems.json';
import { useCart } from './context/CartContext';

export default function ShoppingItem() {
  const { addToCart } = useCart();

  // Pass specific item to the function
  const handleAddToCart = (item) => {
    const cartItem = {
      id: Date.now(),
      name: item.name,
      price: item.price,
      image: item.image, // Include image for cart preview
    };
    addToCart(cartItem);
    alert(`${item.name} added to cart!`);
  };

  return (
    <div className="row mb-5 d-flex flex-wrap m-3">
      {shoppingitems.map((item) => (
        <div className="card m-3" style={{ width: "200px" }} key={item.id}>
          <div
            className="badge bg-dark text-white position-absolute"
            style={{ top: "0.5rem", right: "0.5rem" }}
          >
            Sale
          </div>

          <img className="card-img-top" src={item.image} alt={item.name} />

          <div className="card-body p-4">
            <div className="text-center">
              <h5 className="fw-bolder">{item.name}</h5>

              <div className="d-flex justify-content-center small text-warning mb-2">
                ⭐⭐⭐⭐⭐
              </div>

              <span className="text-muted text-decoration-line-through">$20.00</span> ${item.price}
            </div>
          </div>

          <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
            <div className="text-center">
              <button className="btn btn-outline-dark mt-auto" onClick={() => handleAddToCart(item)}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

