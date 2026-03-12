import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
import { Link } from "react-router-dom";
import API from "../services/api";
import Footer from "../components/Footer";

function Dashboard() {
  const username = localStorage.getItem("userName");
  const userId = localStorage.getItem("userId");
  

  const [items, setItems] = useState([]);
  

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await API.get(`/items/user/${userId}`);
        setItems(res.data);
  
      } catch (err) {
        console.error("Error fetching items", err);
      }
    };
    fetchItems();
  }, [userId]);

  
  const purchasedCount = items.filter(item => item.purchased).length;
  const notPurchasedCount = items.filter(item => !item.purchased).length;


  const data = {
    labels: ["Purchased", "Not Purchased"],
    datasets: [
      {
        label: "Number of Items",
        data: [purchasedCount, notPurchasedCount],
        backgroundColor: ["#28a745", "#dc3545"],
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Items by Purchase Status" }
    }
  };

  return (
    <div className="container mt-5">
      <div className="text-center mb-3">
        <img src="/drink-cup.gif" alt="Drink Cup" style={{ width: 80, height: 80, objectFit: "contain" }} />
      </div>
      <h2 className="text-center mb-4">Welcome, <span style={{ color: '#000000ff' }}>{username}</span>!</h2>
      <div className="my-4" style={{ maxWidth: 400, margin: "0 auto" }}>
        <Bar data={data} options={options} height={180} />
      </div>

      <div className="bg-white shadow-sm mb-4 p-4 w-100" style={{ borderRadius: "12px", boxSizing: "border-box" }}>
        <h4 className="mb-3">About Us</h4>
        <p className="mb-0">
          Grocery Genie is your smart companion for organizing shopping lists, tracking purchases, and making grocery trips easier. Our mission is to help you save time and money while enjoying a seamless shopping experience.
        </p>
      </div>

     
      <div className="bg-white shadow-sm mb-5 p-4 w-100" style={{ borderRadius: "12px", boxSizing: "border-box" }}>
        <h5 className="mb-3">Our Location</h5>
        <div style={{ width: "100%", height: "250px" }}>
          <iframe
            title="Grocery Genie Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126743.2175854847!2d79.786164!3d6.927079!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2596e2e2e2e2e%3A0x2e2e2e2e2e2e2e2e!2sColombo%2C%20Sri%20Lanka!5e0!3m2!1sen!2slk!4v1695290000000!5m2!1sen!2slk"
            width="100%"
            height="100%"
            style={{ border: 0, borderRadius: "12px" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
