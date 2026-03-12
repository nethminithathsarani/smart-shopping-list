import React from "react";
import Footer from "./Footer";

function ShoppingItem({ item, onDelete, onTogglePurchased }) {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center p-2 mb-2 border rounded">
        <span style={{ textDecoration: item.purchased ? "line-through" : "none" }}>
          {item.name} (x{item.quantity})
        </span>
        <div>
          <button className="btn btn-sm btn-success me-2" onClick={onTogglePurchased}>
            {item.purchased ? "Unmark" : "Purchased"}
          </button>
          <button className="btn btn-sm btn-danger" onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ShoppingItem;
