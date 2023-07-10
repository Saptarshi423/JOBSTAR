import React from "react";
import Wrapper from "../assets/wrappers/Navbar";
import { FaHome, FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
import Logo from "./Logo";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import {toggleSideBar, logOutUser} from '../features/user/userSlice';
import { toggleSideBar, logOutUser } from "../features/user/userSlice";

function Navbar() {
  const [showLogout, setShowLogout] = useState(false);
  const { user, isSideBarOpen } = useSelector((store) =>{
    console.log(store);
    return store.user
  });
  const dispatch = useDispatch();

  const toggle = ()=>{
    console.log('toggle')
    dispatch(toggleSideBar());
  }
  useEffect(()=>{
    //console.log(isSideBarOpen, user)
  },[isSideBarOpen])

  return (
    <Wrapper>
      <div className="nav-center">
        <button
          type="button"
          className="toggle-btn"
          onClick={() => {
            toggle();
          }}
        >
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className="logo-text">dashboard</h3>
        </div>
        <div className="btn-container">
          <button
            type="button"
            className="btn"
            onClick={() => {
              setShowLogout(!showLogout);
            }}
          >
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>

          <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
            <button
              className="dropdown-btn"
              type="button"
              onClick={() => {
                console.log('log user out');
                dispatch(logOutUser())
              }}
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default Navbar;
