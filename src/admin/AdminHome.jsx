import React, { useState } from 'react';
import ProductsManager from './ProductsManager';
import CategoriesManager from './CategoriesManager';
import OffersManager from './OffersManager';
import OrdersManager from './OrdersManager';

function AdminHome() {
  const [activeTab, setActiveTab] = useState('products');
  const [showSidebar, setShowSidebar] = useState(true);

  const renderContent = () => {
    switch (activeTab) {
      case 'products': return <ProductsManager />;
      case 'categories': return <CategoriesManager />;
      case 'offers': return <OffersManager />;
      case 'orders': return <OrdersManager />;
      default: return <h5>Select a tab</h5>;
    }
  };

  return (
    <div className="d-flex flex-column flex-md-row" style={{ minHeight: '100vh' }}>
      <div className="bg-dark text-white d-md-none p-2 d-flex justify-content-between align-items-center">
        <h5 className="m-0">Admin Panel</h5>
        <button className="btn btn-light btn-sm" onClick={() => setShowSidebar(!showSidebar)}>
          {showSidebar ? 'Hide Menu' : 'Show Menu'}
        </button>
      </div>

      {showSidebar && (
        <div className="bg-dark text-white p-3" style={{ width: '250px' }}>
          <h4 className="d-none d-md-block">Admin Panel</h4>
          <ul className="nav flex-column mt-3">
            {['products', 'categories', 'offers', 'orders'].map(tab => (
              <li className="nav-item mt-2" key={tab}>
                <button
                  className={`btn text-start w-100 ${activeTab === tab ? 'btn-light' : 'btn-outline-light'}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex-grow-1 p-4 bg-light">
        {renderContent()}
      </div>
    </div>
  );
}

export default AdminHome;

