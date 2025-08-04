 import { NavLink } from "react-router-dom";
 import { Nav } from "react-bootstrap";

function Sidebar () {
  return (
    <div className="bg-dark text-light vh-100 p-3" style={{ width: "220px" }}>
      <h4 className="text-warning mb-4">Admin Panel</h4>
      <Nav className="flex-column">
        <NavLink to="/admin/products" className="nav-link text-light">Products</NavLink>
        <NavLink to="/admin/categories" className="nav-link text-light">Categories</NavLink>
        <NavLink to="/admin/offers" className="nav-link text-light">Offers</NavLink>
        <NavLink to="/admin/orders" className="nav-link text-light">Orders</NavLink>
      </Nav>
    </div>
  );
};

export default Sidebar;
