import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="navbar-logo">
          <img src="/pokeball.svg" alt="Pokébola" />
          Pokédex
        </NavLink>
        <div className="navbar-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Pokémon
          </NavLink>
          <NavLink
            to="/types"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Tipos
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
