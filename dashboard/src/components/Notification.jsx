import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notifications = () => {
  // Dummy notifications data
  const notifications = [
    {
      id: 1,
      message: 'User John updated Document #123',
      time: '2023-01-21 10:15 AM'
    },
    {
      id: 2,
      message: 'User Emily created a new Document #124',
      time: '2023-01-21 10:30 AM'
    },
    {
      id: 3,
      message: 'User Mark deleted Document #122',
      time: '2023-01-21 11:00 AM'
    }
  ];

  // Example effect to show how you might trigger a Toastify notification
  useEffect(() => {
    // This can be triggered when new changes occur
    toast.info('Welcome to the Notifications page!', {
      position: 'top-right',
      autoClose: 3000
    });
  }, []);

  return (
    <>
      {/* Embedded CSS */}
      <style>{`
        /* Container for the entire page layout */
        .notification-page-container {
          display: flex;
          flex-direction: column;
          height: 100vh;
          font-family: "Roboto", sans-serif; /* Or your project's font */
        }

        /* Topbar styling */
        .topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: #fc0000; /* The red from your snippet */
          color: #fff;
          padding: 0.75rem 1rem;
        }

        .logo-area .logo-text {
          font-weight: bold;
          font-size: 1.2rem;
        }

        .search-area input {
          padding: 0.5rem;
          border-radius: 4px;
          border: none;
          width: 200px;
        }

        .actions-area {
          display: flex;
          gap: 1rem;
        }

        .invite-btn,
        .logout-btn {
          background-color: #fff;
          color: #fc0000;
          border: none;
          border-radius: 4px;
          padding: 0.5rem 1rem;
          cursor: pointer;
          font-weight: 600;
        }

        .invite-btn:hover,
        .logout-btn:hover {
          opacity: 0.8;
        }

        /* Sidebar styling */
        .sidebar {
          background-color: #f8f8f8;
          min-width: 200px;
          padding: 1rem;
        }

        .sidebar-menu {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .sidebar-menu li {
          margin-bottom: 1rem;
        }

        .sidebar-menu li a {
          text-decoration: none;
          color: #333;
          font-weight: 500;
        }

        .sidebar-menu li.active a {
          color: #fc0000;
          font-weight: 700;
        }

        /* Main notifications content */
        .notifications-content {
          flex: 1;
          padding: 2rem;
          background-color: #fff;
        }

        .notifications-content h2 {
          margin-bottom: 1rem;
          color: #333;
        }

        .notifications-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .notification-item {
          background-color: #f0f0f0;
          padding: 1rem;
          border-radius: 4px;
        }

        .notification-message {
          margin: 0;
          font-size: 1rem;
          color: #000;
          font-weight: 500;
        }

        .notification-time {
          font-size: 0.85rem;
          color: #666;
        }
      `}</style>

      <div className="notification-page-container">
        {/* Top Navigation Bar (similar style as your dashboard) */}
        <header className="topbar">
          <div className="logo-area">
            <span className="logo-text">ADMIN</span>
          </div>
          <div className="search-area">
            <input type="text" placeholder="Search" />
          </div>
          <div className="actions-area">
            <button className="invite-btn">+ Invite Members</button>
            <button className="logout-btn">Logout</button>
          </div>
        </header>

        {/* Sidebar (similar to your dashboard) */}
        <aside className="sidebar">
          <ul className="sidebar-menu">
            <li><a href="/dashboard">Dashboard</a></li>
            <li><a href="/messages">Messages</a></li>
            <li className="active"><a href="/notifications">Notifications</a></li>
            <li><a href="/profile">Profile</a></li>
            <li><a href="/settings">Settings</a></li>
            <li><a href="/signout">Sign out</a></li>
          </ul>
        </aside>

        {/* Main content area for Notifications */}
        <main className="notifications-content">
          <h2>Recent Notifications</h2>
          <div className="notifications-list">
            {notifications.map((notif) => (
              <div key={notif.id} className="notification-item">
                <p className="notification-message">{notif.message}</p>
                <span className="notification-time">{notif.time}</span>
              </div>
            ))}
          </div>
        </main>

        {/* Toast Container for React Toastify */}
        <ToastContainer />
      </div>
    </>
  );
};

export default Notifications;

