import React from "react";
import { BiDonateBlood } from "react-icons/bi";
import { BiUserCircle } from "react-icons/bi";
import { TbLogout } from "react-icons/tb";
import { useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast } from "react-toastify";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  // console.log('user',user.name)

  const handleLogOut = () => {
    localStorage.clear();
    toast.success("Logout Successfully !");
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar bg-dark">
        <div className="container-fluid">
          <div className="navbar-brand h1 d-flex align-items-center justify-content-center">
            <BiDonateBlood color="red" width={"25px"} height={"24px"} />
            Blood Bank App
          </div>
          <ul className="navbar-nav flex-row">
            <li className="navbar-item mx-3">
              <span className="nav-link d-flex align-items-center justify-content-center">
                <BiUserCircle />
                <span>
                  Welcome{" "}
                  {user?.name || user?.hospitalName || user?.organisationName} !
                </span>
                <span className="badge text-bg-success">{user?.role}</span>
              </span>
            </li>
            {
             (location.pathname === '/' || location.pathname === '/donar' || location.pathname === '/hospital') ? (
                <li className="navbar-item mx-3">
                <Link to='/analytics' className="nav-link">
                    Analatics
                </Link> 
                </li>
              ) : (
                <li className="navbar-item mx-3">
                <Link to='/' className="nav-link">
                     Home
                </Link> 
                </li>
              )
            }
           

            <li className="navbar-item mx-3">
              <button
                className="btn btn-danger d-flex align-items-center justify-content-center"
                onClick={handleLogOut}
              >
                <TbLogout />
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
