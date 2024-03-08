// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Title from "./Web/Title"
import Header from "./Web/Header";
import Result from './Result/Result';
import Home from './Home';

// import Subjects from "./Teacher/Subject/Subjects";
// import Sidebar from "./Web/Sidebar"
// import Result from './Result/Result';

function App() {
  let adminTxt = "Teacher";
  
  return (
    <>
    <BrowserRouter>
    <Header adminTxt={adminTxt}/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/results' element={<Result/>}/>
        {/* <Route path='/subjects' element={<Tea/>}/> */}
        <Route path='/teacher-login' element={<p>Login will come soon!</p>}/>
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
