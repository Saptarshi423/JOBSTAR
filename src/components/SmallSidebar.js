import React, { useEffect } from 'react';
import Wrapper from '../assets/wrappers/SmallSidebar';
import { FaTimes } from 'react-icons/fa';
import Logo from './Logo';
import { useSelector, useDispatch } from 'react-redux';
import {toggleSideBar} from '../features/user/userSlice';
import NavLinks from './NavLinks';


function SmallSidebar() {
  const {isSideBarOpen} = useSelector((store)=>store.user);
  const dispatch = useDispatch();
  const toggle = ()=>{
    console.log('toggle')
    dispatch(toggleSideBar())
  }
  
  return (
    <Wrapper>
      <div className={`sidebar-container ${isSideBarOpen ? 'show-sidebar' : ''}`}>
        <div className='content'>
          <button className='close-btn' onClick={toggle}>
            <FaTimes/>
            <header>
              <Logo/>
            </header>
          <NavLinks toggleSidebar={toggle}/>
          </button>
        </div>
      </div>
    </Wrapper>
  )
}

export default SmallSidebar;