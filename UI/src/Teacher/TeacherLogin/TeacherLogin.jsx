import "./TeacherLogin.css";
import Logo from "../../Web/Logo";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import showPasswordPNG from "../../images/PNG/showPassword.png";
import hidePasswordPNG from "../../images/PNG/hidePassword.png";

const TeacherLogin = (props) => {
  let domain = "http://localhost:3000/";
  let usersURL = domain.concat("users");

  const [email, setEmail] = useState("");
  const [error, setError] = useState(
    "Looks like you are not a teacher after all!"
  );
  const [showPassword, setShowPassword] = useState(false);
  const [invalidEmailClass, setInvalidEmailClass] = useState("");
  const [isTeacher, setIsTeacher] = useState(false);
  const emailInput = useRef();
  const passwordInput = useRef();

  useEffect(() => {
    if (isTeacher) passwordInput.current.focus();
    else emailInput.current.focus();
  }, [isTeacher]);

  const searchTeacher = () => {
    if (!isEmailValid()) {
      setError("Invalid Email Address!");
      setInvalidEmailClass("InvalidEmail");
      return;
    }
    axios
      .get(usersURL, {
        params: {
          email: email,
        },
      })
      .then((response) => {
        if (response.data.length === 0) {
          setInvalidEmailClass("InvalidEmail");
          setError("Looks like you are not a teacher after all!");
        } else {
          setInvalidEmailClass("");
          setIsTeacher(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  function isEmailValid() {
    if (email === "") {
      return false;
    }
    return true;
  }
  // useEffect(() => {
  //   if (apiCall) {
  //     setInvalidEmailClass("InvalidEmail");
  //   }
  // }, [isTeacher]);
  return (
    <>
      <div className={`TeacherLogin form-group ${invalidEmailClass}`}>
        <div
          className={`changeEmailLnk ${isTeacher ? "" : "inactive"}`}
          onClick={() => setIsTeacher(false)}
        >
          &lt; Change email address
        </div>
        <Logo className="TeacherLoginLogo" />
        {!isTeacher && (
          <h3 className="TeacherLoginTitle">Are you a teacher?</h3>
        )}
        <div
          className={isTeacher ? "validatedEmail" : ""}
          title={
            isTeacher
              ? 'Click on "Change email address" link above to change Email Address'
              : ""
          }
        >
          <p>
            <label htmlFor="email">Email Address</label>
          </p>
          <input
            id="email"
            placeholder="example@email.com"
            ref={emailInput}
            className="form-control"
            readOnly={isTeacher}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {isTeacher && (
          <>
            <p>
              <label>Password</label>
            </p>
            <div className="passwordDiv">
            <input
              className="form-control"
              type={showPassword ? "text" : "password"}
              ref={passwordInput}
              // style={{float:"left", alignItems:'center', justifyContent:'center'}}
            />
            <div className="showHidePasswordIcon">
              {showPassword ? (
                <img
                  src={hidePasswordPNG}
                  alt="Hide Password"
                  title="Hide Password"
                  onClick={() => setShowPassword(false)}
                />
              ) : (<img
                  src={showPasswordPNG}
                  alt="Show Password"
                  onClick={() => setShowPassword(true)}
                  title="Show Password"
                />
              )}
            </div>
          </div>
          </>
        )}
        <p className={invalidEmailClass === "" ? "hide" : ""}>{error}</p>
        {/* <input placeholder="Password" className="form-control"/>
                    <br/> */}
        <div className="checkEmailBtnDiv">
          {isTeacher ? (
            <button className="btn checkEmailBtn">Authenticate</button>
          ) : (
            <button className={`btn checkEmailBtn`} onClick={searchTeacher}>
              Let's check
            </button>
          )}
        </div>
        {/* <buttton className="loginBtn btn">Login</buttton> */}
        {/* <button className="cancelBtn btn">Cancel</button> */}
      </div>
    </>
  );
};
export default TeacherLogin;
