import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter, Routes, Route, useNavigate, Navigate} from "react-router-dom";
import {useMediaQuery} from "react-responsive";
import Header from "./Web/Header.jsx";
import Result from "./Result/Result.jsx";
import Home from "./Home/Home.jsx";
import Subjects from "./Teacher/Subject/Subjects.tsx";
import TeacherLogin from "./Teacher/TeacherLogin/TeacherLogin.tsx";
import Students from "./Students/Students.tsx";
import UpdateMarks from "./Marks/UpdateMarks.tsx";
import BreadcrumbsSeperator from "./Web/Breadcrumbs/Breadcrumbs";
/* providers */
import AuthProvider from "./hooks/AuthProvider.jsx";
import HeaderWrapper from "./Wrappers/HeaderWrapper";
import ProtectedRoute from "./Wrappers/Security/ProtectedRoute";


/* Variables */

function App() {
    const isMobileScreen = useMediaQuery({
        query: "only screen and (max-width: 870px)",
    });

    const _ = require('lodash');
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
                            <HeaderWrapper isMobileScreen={isMobileScreen}>
                                <BreadcrumbsSeperator />
                                <section
                                    className={`${isMobileScreen ? "mobileScreen" : ""}`}
                                >
                                    <Home isMobileScreen={isMobileScreen}/>
                                </section>
                            </HeaderWrapper>
                        }
                    />
                    <Route
                        path="/students/semester/:semester"
                        element={
                            <HeaderWrapper isMobileScreen={isMobileScreen}>
                                <BreadcrumbsSeperator path="Students"/>
                                <section
                                    className={`${isMobileScreen ? "mobileScreen" : ""}`}
                                >
                                    <Students/>
                                </section>
                            </HeaderWrapper>
                        }
                    />
                    <Route
                        path="update-marks/semester/:semester"
                        element={
                            <ProtectedRoute>
                                <HeaderWrapper isMobileScreen={isMobileScreen}>
                                    <section className={`${isMobileScreen ? "mobileScreen" : ""} update-marks`}>
                                        <UpdateMarks/>
                                    </section>
                                </HeaderWrapper>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/subjects"
                        element={
                            <HeaderWrapper isMobileScreen={isMobileScreen}>
                                <BreadcrumbsSeperator path='Subjects' />
                                <section
                                    className={`${isMobileScreen ? "mobileScreen" : ""}`}
                                >
                                    <Subjects/>
                                </section>
                            </HeaderWrapper>
                        }
                    />
                    <Route
                        path="/results"
                        element={
                            <HeaderWrapper isMobileScreen={isMobileScreen}>
                                <BreadcrumbsSeperator path='Result' />
                                <section
                                    className={`${isMobileScreen ? "mobileScreen" : ""}`}
                                >
                                    <Result/>
                                </section>
                            </HeaderWrapper>
                        }
                    />
                    <Route
                        path="*"
                        element={
                            <HeaderWrapper isMobileScreen={isMobileScreen}>
                                <section className={`${isMobileScreen ? "mobileScreen" : ""}`}>
                                    <p>Page not found.</p>
                                </section>
                            </HeaderWrapper>
                        }
                    ></Route>
                    <Route path="/teacher-login" element={<TeacherLogin/>}/>
                </Routes>
            </BrowserRouter>
            {/* </SemesterProvider> */}
        </AuthProvider>
    );
}

export default App;
