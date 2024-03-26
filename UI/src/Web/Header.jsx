import {useState} from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Header.css";
import {NavLink, Link} from "react-router-dom";
// import Button from "@mui/material/Button";

const Header = (props) => {
  let adminTxt = props.adminTxt;
  const [links, setLinks] = useState([
    // {"path":"home", "text":"Home", "title":"Home"},
    {path: "results", text: "Results", title: "Results"},
    {path: "subjects", text: "Subjects", title: "Subjects"},
    {
      path: `${adminTxt.toLowerCase()}-login`,
      text: `${adminTxt} Login`,
      title: `${adminTxt} Login`,
    },
  ]);
  let links_output = links.map((lnk) => {
    return (
      <>
        {lnk["text"].toLowerCase().includes("login") ? (
          <Nav.Link
            as={Link}
            to={`/${lnk["path"]}`}
            className="link"
            key={lnk["title"]}
          >
            <button
              className="btn"
              style={{
                // marginLeft: "13px",
                backgroundColor: "#963434",
                fontWeight: "normal",
              }}
            >
              {lnk["text"]}
            </button>
          </Nav.Link>
        ) : (
          <Nav.Link
            as={Link}
            to={`/${lnk["path"]}`}
            className="link"
            key={lnk["title"]}
          >
            <button
              className="btn"
              style={{
                // marginLeft: "13px",
                border: "none",
                marginRight: "23px",
              }}
            >
              {lnk["text"]}
            </button>
          </Nav.Link>
        )}
      </>
    );
  });
  return (
    <>
      <Navbar className="header">
        <Container className="header-container" style={{maxWidth: "100%"}}>
          <Navbar.Brand to="/" as={Link} className="logo">
            L.I.G.M.A. College
          </Navbar.Brand>
          <Nav>{links_output}</Nav>
        </Container>
      </Navbar>
    </>
  );
};
export default Header;
