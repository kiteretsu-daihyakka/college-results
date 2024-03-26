import {useState} from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Header.css";
import {NavLink, Link, useNavigate} from "react-router-dom";
// import Button from "@mui/material/Button";
import Logo from './Logo'

const Header = (props) => {
  const navi = useNavigate();
  let adminTxt = props.adminTxt;
  const [links, setLinks] = useState([
    // {"path":"home", "text":"Home", "title":"Home"},
    {path: "results", text: "Results", title: "Results"},
    {path: "subjects", text: "Subjects", title: "Subjects"}
  ]);
  let links_output = links.map((lnk) => {
    return (
          <Nav.Link
            as={Link}
            to={`/${lnk["path"]}`}
            className="link"
            key={lnk["title"]}
          >
              {lnk["text"]}
          </Nav.Link>
    );
  });
  function onLoginClick(){
    navi("/".concat(adminTxt.toLowerCase().concat("-login")))
  }
  return (
    <>
      <Navbar className="header">
        <Container className="header-container" style={{maxWidth: "100%"}}>
          <Navbar.Brand to="/" as={Link} style={{color: "white"}}>
            <Logo/>
          </Navbar.Brand>
          <Nav>
            {links_output}
            {/* <div className="Teacherlogin"> */}
            <button className="btn" type="button" style={{
              color: "#6C6C69",
              marginLeft: "13px",
              border: "none",
              marginRight: "23px",
              backgroundColor:"white"
            }} onClick={onLoginClick}>
              {adminTxt} Login
            </button>
            {/* </div> */}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};
export default Header;
