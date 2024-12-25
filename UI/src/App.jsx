import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Header from "./Web/Header.jsx";
import Result from "./Result/Result.jsx";
import Home from "./Home/Home.jsx";
import Subjects from "./Teacher/Subject/Subjects.tsx";
import TeacherLogin from "./Teacher/TeacherLogin/TeacherLogin.tsx";
import Students from "./Students/Students.tsx";

/* providers */
import AuthProvider from "./hooks/AuthProvider.jsx";
import BreadcrumbsSeperator from "./Web/Breadcrumbs/Breadcrumbs";

/* Variables */

function App() {
  const isMobileScreen = useMediaQuery({
    query: "only screen and (max-width: 870px)",
  });
  var _ = require("lodash");
  // const breadcrumbs = [
  //   <Link underline="hover" key="1" color="inherit" href="/">
  //     Home
  //   </Link>,
  //   { label: 'Home', link: '/' },
  //   { label: 'Results', link: '/results' },
  //   { label: 'Students', link: '/student/semester/:semester' },
  //   { label: 'Subjects', link: '/subjects' },
  //   ];
  return (
    <AuthProvider>
      {/* <SemesterProvider> */}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header isMobileScreen={isMobileScreen} />
                <BreadcrumbsSeperator />

                <section className={`${isMobileScreen ? "mobileScreen" : ""}`}>
                  <Home isMobileScreen={isMobileScreen} />
                </section>
              </>
            }
          />
          <Route
            path="/results"
            element={
              <>
                <Header isMobileScreen={isMobileScreen} />
                <BreadcrumbsSeperator path='Result' />

                <section className={`${isMobileScreen ? "mobileScreen" : ""}`}>
                  <Result />
                </section>
              </>
            }
          />
          <Route
            path="/student/semester/:semester"
            element={
              <>
                <Header isMobileScreen={isMobileScreen} />
                <BreadcrumbsSeperator path="Students"/>

                <section className={`${isMobileScreen ? "mobileScreen" : ""}`}>
                  <Students />
                </section>
              </>
            }
          />
          <Route
            path="/subjects"
            element={
              <>
                <Header isMobileScreen={isMobileScreen} />
                <BreadcrumbsSeperator path='Subjects' />

                <section className={`${isMobileScreen ? "mobileScreen" : ""}`}>
                  <Subjects />
                </section>
              </>
            }
          />
          <Route path="/teacher-login" element={<TeacherLogin />} />
          <Route
            path="*"
            element={
              <section className={`${isMobileScreen ? "mobileScreen" : ""}`}>
                <p>Page not found.</p>
              </section>
            }
          />
        </Routes>
      </BrowserRouter>
      {/* </SemesterProvider> */}
    </AuthProvider>
  );
}

export default App;
