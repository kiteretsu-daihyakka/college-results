// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import Title from "./Web/Title"
import Header from "./Web/Header";
import Result from './Result/Result';
import Home from './Home/Home';

import Subjects from "./Teacher/Subject/Subjects";
import Teacher from './Teacher/Teacher';
import TeacherLogin from "./Teacher/TeacherLogin/TeacherLogin";
// import Sidebar from "./Web/Sidebar"

function App() {
  
  let adminTxt = "Teacher";
  
  return (
    <>
    <BrowserRouter>
    <Header adminTxt={adminTxt} />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/results' element={<Result/>}/>
        <Route path='/subjects' element={<Subjects/>}/>
        <Route path='/teacher-login' element={<TeacherLogin adminTxt={adminTxt}/>}/>
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
