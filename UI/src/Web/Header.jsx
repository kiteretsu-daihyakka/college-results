import { useState } from "react"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./Header.css";
import { Link } from "react-router-dom";

const Header = (props) => {
    let adminTxt = props.adminTxt;
    const [links, setLinks] = useState([
      // {"path":"home", "text":"Home", "title":"Home"}, 
      // {"path":"subjects", "text":"Subjects", "title":"Subjects"},
      {"path":"results", "text":"Results", "title":"Results"},
      {"path":`${adminTxt.toLowerCase()}-login`, "text":`${adminTxt} Login`, "title":`${adminTxt} Login`}
  ])
    return (<>
        <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="home/">LOGO</Navbar.Brand>
          <Nav className="me-auto" >
            {links.map(lnk => <Nav.Link as={Link} to={`/${lnk['path']}`} className="link" key={lnk['title']} style={{color:"black"}}>{lnk['text']}</Nav.Link>)}
          </Nav>
        </Container>
      </Navbar>
    </>)
}
export default Header