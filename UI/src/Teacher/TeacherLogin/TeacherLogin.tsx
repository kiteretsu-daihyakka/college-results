import "./TeacherLogin.css";
import Logo from "../../Web/Logo";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import showPasswordPNG from "../../images/PNG/showPassword.png";
import hidePasswordPNG from "../../images/PNG/hidePassword.png";
import { useNavigate, Navigate } from "react-router-dom";
import Title from "../../Web/Title";
import { domain } from "../../Utils/Variables";
import Button from "../../Web/Button";
import { useAuth } from "../../hooks/AuthProvider";

const TeacherLogin = (props) => {
  const navi = useNavigate();
  let isTeacherURL = domain.concat("teacher/exists");
  let teacherLoginURL = domain.concat("teacher/login");
  const auth = useAuth();
  // if (auth.teacher){

  // }
  // useEffect(()=>{

  // },[auth.teacher, navi]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [invalidEmailClass, setInvalidEmailClass] = useState("");
  const [isTeacher, setIsTeacher] = useState(false);
  const emailInput = useRef();
  const passwordInput = useRef();

  useEffect(() => {
    if (auth.teacher) {
      navi("/");
      return;
    } else {
      if (isTeacher) passwordInput?.current.focus();
      else emailInput?.current.focus();
      setError("");
      setShowPassword(false);
      setPassword("");
    }
  }, [isTeacher]);

  let config;
  if (isTeacher) {
    config = {
      method: "post",
      url: teacherLoginURL,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: { email: email, password: password },
    };
  } else {
    config = {
      method: "post",
      url: isTeacherURL,
      headers: {},
      data: { email: email },
    };
  }
  function onLogoClick() {
    navi("/");
  }
  function onPasswordChangeHandler(e) {
    setPassword(e.target.value);
    setInvalidEmailClass("");
    setError("");
  }
  function onEmailChangeHandler(e) {
    setEmail(e.target.value);
    setInvalidEmailClass("");
    setError("");
  }
  async function loginTeacher() {
    axios(config)
      .then(function (response) {
        auth.login(response);
        navi("/");
        // responseHandler(response);
      })
      .catch(function (error) {
        setError("Looks like you are not a teacher after all!");
        // responseHandler(error.response);

        // setError(
        //   "Something went wrong from our end, Please try again after sometime."
        // );
      });
    function responseHandler(response) {
      if (response.data.data?.exists) {
        setInvalidEmailClass("");
      } else {
        // setInvalidEmailClass("InvalidEmail");
        setError(
          "Looks like you are not a teacher after all!, Check Your Email and Password."
        );
      }
    }
  }
  async function checkIsTeacher() {
    axios(config)
      .then(function (response) {
        responseHandler(response);
      })
      .catch(function (error) {
        responseHandler(error.response);
        // setError(
        //   "Something went wrong from our end, Please try again after sometime."
        // );
      });
    function responseHandler(response) {
      if (response.data.data?.exists) {
        setInvalidEmailClass("");
        setIsTeacher(true);
      } else {
        setInvalidEmailClass("InvalidEmail");
        setError("Looks like you are not a teacher after all!");
      }
    }
  }
  function searchTeacher(e) {
    e.preventDefault();

    if (isTeacher && password !== "") {
      loginTeacher();
    } else if (!isEmailValid() || (isTeacher && password === "")) {
      return;
    } else {
      checkIsTeacher();
    }
  }
  function isEmailValid() {
    if (email === "") {
      return false;
    } else if (
      /[a-z0-9]+([-.][a-z0-9])*@[a-z]+[.][a-z]{2,3}/.test(email.toLowerCase())
    ) {
      return true;
    } else {
      setError("Invalid Email Address!");
      setInvalidEmailClass("InvalidEmail");
      return false;
    }
  }

  return (
    <section className="teacherLoginSection">
      <>
        <Title>Teacher Login</Title>
        <div className={`TeacherLogin ${isTeacher ? "increaseHeight" : ""} form-group ${invalidEmailClass}`}>
          <form onSubmit={searchTeacher}>
            {isTeacher && (
              <div
                className={`changeEmailLnk`}
                onClick={() => setIsTeacher(false)}
              >
                &lt; Change email address
              </div>
            )}
            <Logo className="TeacherLoginLogo" onClick={onLogoClick} />
            {!isTeacher && (
              <h3 className="TeacherLoginTitle">Are you a teacher?</h3>
            )}
            <div className="credentials">
              <div
                className={isTeacher ? "validatedEmail" : "enterEmail"}
                title={
                  isTeacher
                    ? 'Click on "Change email address" link above to change Email Address'
                    : ""
                }
              >
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  placeholder="example@email.com"
                  ref={emailInput}
                  className="form-control"
                  readOnly={isTeacher}
                  value={email}
                  onChange={(e) => onEmailChangeHandler(e)}
                />
              </div>
              {isTeacher && (
                <div className={`TakePassword ${error !== "" ? "IncorrectPassword" : ""}`}>
                  <label htmlFor="password">Password</label>
                  <div className="passwordDiv">
                    <input
                      className={`form-control ${
                        showPassword ? "" : "betterPasswordMaskStyle"
                      }`}
                      type={showPassword ? "text" : "password"}
                      ref={passwordInput}
                      value={password}
                      onChange={(e) => onPasswordChangeHandler(e)}
                      id="password"
                    />
                      {showPassword ? (
                        <img
                          src={hidePasswordPNG}
                          alt="Hide Password"
                          title="Hide Password"
                          onClick={() => setShowPassword(false)}
                          className="showHidePasswordIcon"
                        />
                      ) : (
                        <img
                          src={showPasswordPNG}
                          alt="Show Password"
                          onClick={() => setShowPassword(true)}
                          title="Show Password"
                          className="showHidePasswordIcon"
                        />
                      )}
                  </div>
                </div>
              )}
              <p className={`error ${error === "" ? "hide" : ""}`}>{error}</p>
            </div>
            <div className="checkEmailBtnDiv">
              <Button
                className={`${isTeacher ? "checkPasswordBtn" : "checkEmailBtn"} ${
                  (email === "") | (isTeacher & (password === ""))
                    ? "disabledState"
                    : ""
                }`}
                title={`${
                  (email === "") | (isTeacher & (password === ""))
                    ? `Please enter ${isTeacher ? "password" : "email"} first.`
                    : ""
                }`}
                type="submit"
              >
                {isTeacher ? "Authenticate" : "Let's check"}
              </Button>
            </div>
          </form>
        </div>
      </>
    </section>
  );
};
export default TeacherLogin;
