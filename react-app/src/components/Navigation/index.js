import React, { useContext, useEffect, useRef, useState } from "react";
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
// import history.push from "../chat/chat";
import { ChatBoxContext } from "../../context/ChatBox";
import Chat from "../chat/chat";

function Navigation({ isLoaded }) {
  const user = useSelector((state) => state.session.user);
  const history = useHistory();
  const { closeModal } = useModal();


  const { chat, setChat } = useContext(ChatBoxContext)

  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const turnOnChat = () => {
    if (chat === false) setChat(true)
    if (chat === true ) setChat(false)
  }

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  const logoLink = () => {
    history.push('/')
    // if (user) history.push('/accounts')
    // else history.push('/')
  }

  const accounts = () => {
    history.push('/accounts')
  }

  const newAccounts = () => {
    history.push('/accounts/existingnew')
  }

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {

      setShowMenu(false);

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
    closeModal()
    history.push('/')
  };

  const location = () => {
    history.push('/locations')
  }

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  // ===========================================

  return (
    <div id="nav-entire-page">
      <div id="inner-div-nav-entire-page">
        <div id="left-panel-inner-div-nav">
          <img onClick={logoLink} className='pointer' id="logo-nav" src={logo} />

          <div id="nav-bar">
            <div onClick={accounts} className="nav-item">Accounts</div>
            <div onClick={newAccounts} className="nav-item">Checking & Savings</div>
            <div className="nav-item">Credit Cards</div>
            <div className="nav-item">Auto</div>
            <div className="nav-item">Commercial</div>
            <div className="nav-item">Learn & Grow</div>
          </div>
        </div>

        <div id="right-panel-inner-div-nav">
          <img src={search} className="nav-icon grow-big" />
          <img onClick={turnOnChat} src={question} className="nav-icon grow-big" />
          <img onClick={location} src={map} className="nav-icon grow-big" />
          <div id="sign-in-div-nav" onClick={openMenu}>
            <img src={profile} className="nav-icon grow-big pointer" />
            {
              user ? <div className="hidden">Sign In</div> : <div id="sign-in-nav">Sign In</div>
            }
            <ul className={ulClassName} ref={ulRef}>
              {user ? (
                <div id='user-profile-nav-drop'>
                  <div id='thank-you-drop-down'>
                  <img id='logo-dropdown' src={logo} />
                  <div>
                  Thanks for banking with us
                  </div>
                  </div>
                  <div id='username-dropdown' className="profile-dropdown-list">{user.username}</div>
                  <div className="profile-dropdown-list">{`📬 ${user.email}`}</div>
                  <div className="profile-dropdown-list">{`☎️ (${user.phone.slice(0,3)}) ${user.phone.slice(3,6)}-${user.phone.slice(6,11)}`}</div>
                  <div id='logout-dropdown-profile'>
                    <button onClick={handleLogout}>Log Out</button>
                  </div>
                </div>
              ) : (
                <div id='in-out-profile'>
                  <div>Welcome to CapitalTwo</div>
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
                </div>
              )}
            </ul>
          </div>
          {
                chat ?
                  (<div id='chat-div'>
                  <Chat />
                  </div> )
                  :
                  (<div id='chat-div-close'>
                  <Chat />
                  </div> )

              }
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
