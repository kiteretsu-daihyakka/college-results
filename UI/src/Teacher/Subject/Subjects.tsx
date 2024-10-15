import { useEffect, useState } from "react";
import Semester from "../Semester";
import Subject from "./Subject";
import Add from "./Add";
import Title from "../../Web/Title";
import fetchSemesters from "../../Home/SemesterCards/SemesterProvider.tsx";

const Subjects = (props) => {
  const [subs, setSubs] = useState([]);
//   const [semesters, setSemesters] = useState([null, null, null, null]);
  
  useEffect(() => {
    // fetchSemesters().then((semesters) => {
    //   setSemesters(semesters);
    // });
  }, []);
  return (
    <>
      <Title>Subjects</Title>
      
      <br />
      <h3>Subjects:</h3>
      {subs.map((sub) => (
        <Subject key={sub.name} name={sub.name} />
      ))}
      {/* <Add/> */}
    </>
  );
};
export default Subjects;
