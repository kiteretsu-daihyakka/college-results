// import logo from './logo.svg';
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

import Title from "./Web/Title";
import Header from "./Web/Header";
import Result from "./Result/Result";
import Home from "./Home/Home";

import Subjects from "./Teacher/Subject/Subjects";
import Teacher from "./Teacher/Teacher";
import TeacherLogin from "./Teacher/TeacherLogin/TeacherLogin";
// import Sidebar from "./Web/Sidebar"
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  let adminTxt = "Teacher";
  let domain = "http://localhost:3000/";
  let semesterURL = domain.concat("semesters");
  const [allSemOverview, setallSemOverview] = useState([]);

  useEffect(() => {
    axios.get(semesterURL).then(response=>setallSemOverview(response.data)).catch(error=>console.log(error));
  }, [semesterURL]);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header adminTxt={adminTxt} />
                <Home allSemOverview={allSemOverview}/>
              </>
            }
          />
          <Route
            path="/results"
            element={
              <>
                <Header adminTxt={adminTxt} />
                <Result />
              </>
            }
          />
          <Route
            path="/subjects"
            element={
              <>
                <Header adminTxt={adminTxt} />
                <Subjects allSemOverview={allSemOverview}/>
              </>
            }
          />
          <Route
            path="/teacher-login"
            element={<TeacherLogin adminTxt={adminTxt} />}
          />
        </Routes>
      </BrowserRouter>
    </>
    // <div className="App">
    //   <Title>Home</Title>

    //   {/* <Header adminTxt={"Teacher"}/> */}

    //   {/* <Sidebar/> */}
    //   {/* <Subjects/> */}
    // </div>
  );
}

export default App;
