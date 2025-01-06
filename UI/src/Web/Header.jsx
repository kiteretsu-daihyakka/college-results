import {useEffect, useState} from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Header.css";
import {NavLink, Link, useNavigate} from "react-router-dom";
// import Button from "@mui/material/Button";
import Logo from "./Logo";
import MenuPNG from "../images/PNG/menu.png";
import {useMediaQuery} from "react-responsive";
import HamburgerMenu from "./HamburgerMenu";
import TeacherLoginBtn, {TeacherLogoutBtn} from "./Navigation/TeacherLoginBtn";
import {useAuth} from "../hooks/AuthProvider";

const Header = (props) => {
    const auth = useAuth();
    const navi = useNavigate();
    const [links, setLinks] = useState([
        // {"path":"home", "text":"Home", "title":"Home"},
        {path: "results", text: "Results", title: "Results"},
        {path: "students/semester/1", text: "Students", title: "Students"},
        {path: "subjects", text: "Subjects", title: "Subjects"},
    ]);
    const [mobileMenuOpen, setmobileMenuOpen] = useState("");
    useEffect(() => {
        if (auth.teacher) {
            setLinks(prevState => {
                return [...prevState, {path: "update-marks/semester/1", text: "Update Marks", title: "Update Marks"}]
            })
        }
    }, []);
    let links_output = links.map((lnk) => {
        return (
            <Nav.Link
                as={Link}
                to={`/${lnk["path"]}`}
                className="link"
                key={lnk["title"]}
                onClick={(e) => {
                    e.preventDefault();
                    navi(`/${lnk["path"]}`);
                    setmobileMenuOpen("");
                }}
            >
                {lnk["text"]}
            </Nav.Link>
        );
    });

    function onHomeLinkClick() {
        navi("/");
        setmobileMenuOpen("");
    }

    return (
        <>
            {mobileMenuOpen !== "" && props.isMobileScreen && (
                <HamburgerMenu
                    links={links_output}
                    onHomeLinkClick={onHomeLinkClick}
                    mobileMenuOpen={mobileMenuOpen}
                    onClose={() => setmobileMenuOpen("")}
                    teacherLoggedIn={auth.teacher}
                />
            )}
            <Navbar
                className={`header ${
                    props.isMobileScreen ? "mobileScreen".concat(" ", mobileMenuOpen) : ""
                }`}
            >
                <Container className="header-container">
                    {props.isMobileScreen && (
                        <div className="menuIcnDiv">
                            <img
                                src={MenuPNG}
                                className="menuIcn"
                                onClick={() => setmobileMenuOpen("menuOpen")}
                                alt="menu icon"
                            />
                        </div>
                    )}

                    <Navbar.Brand to="/" as={Link} id="logo">
                        <Logo onClick={onHomeLinkClick}/>
                    </Navbar.Brand>
                    {!props.isMobileScreen && (
                        <Nav>
                            {links_output}
                            {!auth.teacher ? (
                                <TeacherLoginBtn className="link BigScreenLoginBtnRadius"/>
                            ) : (
                                <TeacherLogoutBtn className="link BigScreenLoginBtnRadius"/>
                            )}
                        </Nav>
                    )}
                </Container>
            </Navbar>
        </>
    );
};
export default Header;
