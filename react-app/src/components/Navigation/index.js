import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/session";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import OpenModalButton from "../OpenModalButton";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import logo from "./capTwoLogo.png";
import search from "./search.png";
import question from "./question.png";
import map from "./map.png";
import profile from "./profile.png";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";

function Navigation({ isLoaded }) {
  const user = useSelector((state) => state.session.user);
  const history = useHistory();
  const { closeModal } = useModal();


  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  const logoLink = () => {
    if (user) history.replace('/accounts')
    else history.replace('/')
  }

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.replace('/')
    closeModal()
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  // ===========================================

  return (
    <div id="nav-entire-page">
      <div id="inner-div-nav-entire-page">
        <div id="left-panel-inner-div-nav">
          <img onClick={logoLink} className='pointer' id="logo-nav" src={logo} />

          <div id="nav-bar">
            <div className="nav-item">Credit Cards</div>
            <div className="nav-item">Checking & Savings</div>
            <div className="nav-item">Auto</div>
            <div className="nav-item">Business</div>
            <div className="nav-item">Commercial</div>
            <div className="nav-item">Learn & Grow</div>
          </div>
        </div>

        <div id="right-panel-inner-div-nav">
          {/* <img src={search} className="nav-icon grow-big" /> */}
          {/* <img src={question} className="nav-icon grow-big" /> */}
          {/* <img src={map} className="nav-icon grow-big" /> */}
          <div id="sign-in-div-nav" onClick={openMenu}>
            <img src={profile} className="nav-icon grow-big pointer" />
            {
              user ? <div className="hidden">Sign In</div> : <div id="sign-in-nav">Sign In</div>
            }
            <ul className={ulClassName} ref={ulRef}>
              {user ? (
                <>
                  <div>{user.username}</div>
                  <div>{user.email}</div>
                  <div>
                    <button onClick={handleLogout}>Log Out</button>
                  </div>
                </>
              ) : (
                <>
                  <OpenModalButton
                    buttonText="Log In"
                    onItemClick={closeMenu}
                    modalComponent={<LoginFormModal />}
                  />

                  <OpenModalButton
                    buttonText="Sign Up"
                    onItemClick={closeMenu}
                    modalComponent={<SignupFormModal />}
                  />
                </>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* <ul>
			<img src={search} />
			<li>
				<NavLink exact to="/">Home</NavLink>
			</li>
			{isLoaded && (
				<li>
					<ProfileButton user={sessionUser} />
				</li>
			)}
		</ul> */}
    </div>
  );
}

export default Navigation;
