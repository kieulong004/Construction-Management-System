import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoon,
  faSun,
  faSearch,
  faHome,
  faSignOutAlt,
  faChevronDown,
  faHardHat,
  faPersonDigging,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import "../../../style/navbar.css";
import Logo from "../../../icons";
import useTheme from "../../../hooks/useTheme";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const { darkMode } = useTheme();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navigate = useNavigate();

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest(".nav-link.sub-menu")) {
      setActiveDropdown(null);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <nav className="sidebar close">
      <header>
        <div className="image-text">
          <span className="image">
            <img
              src={Logo}
              alt="Logo"
              onClick={() => navigate("/admin/dashboard")}
            />
          </span>
        </div>
      </header>
      <div className="menu-bar">
        <div className="menu">
          <li className="search-box">
            <FontAwesomeIcon icon={faSearch} className="bx bx-search icon" />
            <input type="search" placeholder="Search..." />
          </li>
          <ul className="menu-links">
            <li className="nav-link">
              <Link to={"/admin/dashboard"} className="dashboard-subnav">
                <FontAwesomeIcon
                  icon={faHome}
                  className="bx bx-home-alt icon"
                />
                <span className="text nav-text">Dashboard</span>
              </Link>
            </li>
            <li
              className={`nav-link sub-menu ${
                activeDropdown === "Labor" ? "open" : ""
              }`}
            >
              <Link
                to="#"
                className="dashboard-subnav"
                onClick={() => toggleDropdown("Labor")}
              >
                <FontAwesomeIcon
                  icon={faPersonDigging}
                  className="bx bx-home-alt icon"
                />
                <span className="text nav-text">Labor</span>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="bx bx-chevron-down icon down"
                />
              </Link>
              <ul className="submenu">
                <li
                  className="nav-link"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <Link
                    to={"/admin/labor/add"}
                    onClick={() => setActiveDropdown(null)}
                  >
                    <FontAwesomeIcon
                      icon={faPlus}
                      className="bx bx-home-alt icon"
                    />
                    <span className="text nav-text">Add Labor</span>
                  </Link>
                </li>
              </ul>
            </li>
            <li
              className={`nav-link sub-menu ${
                activeDropdown === "Contractor" ? "open" : ""
              }`}
            >
              <Link
                to="#"
                className="dashboard-subnav"
                onClick={() => toggleDropdown("Contractor")}
              >
                <FontAwesomeIcon
                  icon={faHardHat}
                  className="bx bx-home-alt icon"
                />
                <span className="text nav-text">Contractor</span>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="bx bx-chevron-down icon down"
                />
              </Link>
              <ul className="submenu">
                <li className="nav-link">
                  <Link
                    to={"/admin/contractor/add"}
                    onClick={() => setActiveDropdown(null)}
                  >
                    <FontAwesomeIcon
                      icon={faPlus}
                      className="bx bx-home-alt icon"
                    />
                    <span className="text nav-text">Add Contractor</span>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="bottom-content">
          <li>
            <Link to={"/signin"}>
              <FontAwesomeIcon
                icon={faSignOutAlt}
                className="bx bx-log-out icon"
              />
              <span className="text nav-text">Logout</span>
            </Link>
          </li>
          <li className="mode">
            <div className="moon-sun">
              <FontAwesomeIcon
                icon={darkMode ? faSun : faMoon}
                className="icon"
              />
            </div>
            <span className="mode-text text">
              {darkMode ? "Light Mode" : "Dark Mode"}
            </span>
            <div className="toggle-switch">
              <span className="switch" />
            </div>
          </li>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
