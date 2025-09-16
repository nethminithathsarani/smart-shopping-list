import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Dashboard() {
  const username = localStorage.getItem("username");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await API.get(`/items/user/${userId}`);
        setItems(res.data);
        setTotalItems(res.data.length);
      } catch (err) {
        console.error("Error fetching items", err);
      }
    };
    fetchItems();
  }, [userId]);

  const recentItems = items.slice(-3).reverse(); // last 3 added items

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Welcome, {username}!</h2>

      {/* Dashboard Cards */}
      <div className="row">
        {/* Overview Card */}
        <div className="col-md-4 mb-3">
          <div className="card text-white bg-primary shadow">
            <div className="card-body">
              <h5 className="card-title">Your Shopping Overview</h5>
              <p className="card-text">
                You have <strong>{totalItems}</strong> items in your shopping list.
              </p>
            </div>
          </div>
        </div>

        {/* Recent Items Card */}
        <div className="col-md-4 mb-3">
          <div className="card text-white bg-secondary shadow">
            <div className="card-body">
              <h5 className="card-title">Recently Added</h5>
              {recentItems.length > 0 ? (
                <ul className="list-unstyled">
                  {recentItems.map((item) => (
                    <li key={item.id}>{item.name} - {item.quantity}</li>
                  ))}
                </ul>
              ) : (
                <p>No recent items.</p>
              )}
              <Link to="/items" className="btn btn-light btn-sm">View All</Link>
            </div>
          </div>
        </div>

        {/* Add Item Card */}
        <div className="col-md-4 mb-3">
          <div className="card text-white bg-success shadow">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">Add New Item</h5>
              <button
                className="btn btn-light mt-auto"
                onClick={() => navigate("/items")}
              >
                + Add Item
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Insights */}
      <div className="row mt-4">
        <div className="col-md-6 mb-3">
          <div className="card shadow">
            <div className="card-body">
              <h5 className="card-title">Shopping Stats</h5>
              <p>Food: 40%, Household: 20%, Others: 40%</p>
              <small className="text-muted">More analytics coming soon!</small>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <div className="card shadow">
            <div className="card-body">
              <h5 className="card-title">Notifications</h5>
              <ul>
                <li>Reminder: Buy milk in the next 2 days.</li>
                <li>Your bread is running low – buy more soon!</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
