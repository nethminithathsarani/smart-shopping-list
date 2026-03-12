import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import API from "../services/api";
import { Modal, Button, Form } from "react-bootstrap";

function Items() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [newQty, setNewQty] = useState(1);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [editName, setEditName] = useState("");
  const [editQty, setEditQty] = useState(1);
  const userId = localStorage.getItem("userId");

  
  const fetchItems = async () => { 
    try { 
      const res = await API.get(`/items/user/${userId}`);
      setItems(res.data);
      
    } catch (err) {
      console.error("Error fetching items", err);
    }
  };

  
  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!newItem.trim()) return; 
    try {
      await API.post(`/items/user/${userId}`, { name: newItem, quantity: newQty });
      setNewItem(""); 
      setNewQty(1); 
      fetchItems();
    } catch (err) {
      console.error("Error adding item", err);
    }
  };

  
  const openEditModal = (item) => {
    setEditItem(item); 
    setEditName(item.name); 
    setEditQty(item.quantity);
    setShowEditModal(true); 
  };

  
  const handleSaveEdit = async () => {
    try {
      await API.put(`/items/user/${userId}/item/${editItem.id}`, {
        name: editName,
        quantity: editQty,
        purchased: editItem.purchased,
      });
      setShowEditModal(false); 
      fetchItems();
    } catch (err) {
      console.error("Error updating item", err);
    }
  };

  
  const handleDelete = async (id) => {
    try {
      await API.delete(`/items/user/${userId}/item/${id}`);
      fetchItems();
    } catch (err) {
      console.error("Error deleting item", err);
    }
  };

 
  const togglePurchased = async (item) => {
    try {
      await API.put(`/items/user/${userId}/item/${item.id}`, {
        ...item, 
        purchased: !item.purchased, 
      });
      fetchItems();
    } catch (err) {
      console.error("Error marking purchased", err);
    }
  };

  useEffect(() => {
    fetchItems(); 
  }, []);

  return (
    <>
      <div className="container mt-5">
        <h2 className="mb-4">Your Shopping List</h2>
        <form onSubmit={handleAddItem} className="d-flex mb-3">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Enter item"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
          />
          <input
            type="number"
            className="form-control me-2"
            placeholder="Qty"
            value={newQty}
            min="1"
            onChange={(e) => setNewQty(Number(e.target.value))}
          />
          <button type="submit" className="btn btn-success">Add</button>
        </form>

        {items.length === 0 ? (
          <p>No items found. Add some!</p>
        ) : (
          <ul className="list-group">
            {items.map((item) => (
              <li
                key={item.id}
                className={`list-group-item d-flex justify-content-between align-items-center`}
              >
                <div
                  style={{
                    textDecoration: item.purchased ? "line-through" : "none",
                    color: item.purchased ? "gray" : "black",
                  }}
                >
                  <strong>{item.name}</strong> - {item.quantity}
                </div>
                <div>
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => openEditModal(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger me-2"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                  <button
                    className={`btn btn-sm ${item.purchased ? "btn-secondary" : "btn-warning"}`}
                    onClick={() => togglePurchased(item)}
                  >
                    {item.purchased ? "Unmark" : "Purchased"}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

       
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Item Name</Form.Label>
                <Form.Control
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  value={editQty}
                  min="1"
                  onChange={(e) => setEditQty(Number(e.target.value))}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSaveEdit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <Footer />
    </>
  );
}

export default Items;
