import Logo from "./Logo";
import CrossPNG from "../images/PNG/Cross.png";
import RightArrow from "../images/PNG/right_arrow.png";
import "./HamburgerMenu.css";
import TeacherLoginBtn,{TeacherLogoutBtn} from "./Navigation/TeacherLoginBtn";
import Backdrop from "./Backdrop";
import React, { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";

const HamburgerMenu = (props) => {
  return (
    <div className={`hamburger-menu-master`}>
      <div className="hamburger-menu">
        <Logo onClick={props.onHomeLinkClick} />
        <div className="hamburger-menu-header-closeIcn">
          <img
            src={CrossPNG}
            alt="Close Hamburger Menu Icon"
            onClick={props.onClose}
          />
        </div>
        {!props.teacherLoggedIn ? (
          <div className="hamburger-menu-teacher-login">
            <TeacherLoginBtn className="link primary"/>
          </div>
        ) : (
          <div className="hamburger-menu-teacher-login">
            <TeacherLogoutBtn className="link primary"/>
          </div>
        )}
        {props.links.map((lnk, index) => (
          <React.Fragment key={index}>
            <div className="ham-link">{lnk}</div>
            <div className="ham-link-arrow">
              <img src={RightArrow} alt="Right Arrow" />
            </div>
          </React.Fragment>
        ))}
        <div className="rest"></div>
      </div>
      <Backdrop className="hamburger-menu-back" onClick={props.onClose} />
    </div>
  );
};
export default HamburgerMenu;
