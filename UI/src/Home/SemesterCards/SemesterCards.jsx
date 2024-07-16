import SemesterCard from "./SemesterCard.jsx";
import { useState, useEffect } from "react";
import "./SemesterCards.css";
import SubjectModal from "../SubjectModal/SubjectModal.jsx";
import axios from "axios";

import fetchSemesters from "./SemesterProvider.tsx";
import { domain } from "../../Utils/Variables.js";
let studentURL = domain.concat("student");

const SemesterCards = (props) => {
  const [semesters, setSemesters] = useState([null, null, null, null]);
  const [loading, setLoading] = useState(true);
  const [semesterSelected, setSemesterSelected] = useState(0);


  async function fetchStudents(sem_wise_students) {
    const response = await axios(studentURL);
    let data = await response.data.data;
    data.students.forEach((stud) => {
      sem_wise_students[stud["semester"]["id"]] += 1;
    });
    return data.students;
  }

  async function fetchSemestersOverview() {
    setLoading(true);

    let sems = await fetchSemesters();
    let sem_wise_students = { 1: 0, 2: 0, 3: 0, 4: 0 };
    await fetchStudents(sem_wise_students);
    console.log(sem_wise_students);
    sems.semesters.map((sem) => {
      sem["studCount"] = sem_wise_students[sem?.id];
      return sem;
    });
    setSemesters(sems.semesters);
    setLoading(false);
  }
  useEffect(() => {
    fetchSemestersOverview();
  }, []);

  return (
    <>
      <SubjectModal
        show={semesterSelected !== 0}
        onClose={() => setSemesterSelected(0)}
        semID={semesterSelected}
        allSem={semesters}
        isMobileScreen={props.isMobileScreen}
      />
      <div className="sem-table">
        {semesters?.map((sem, index) => (
          <SemesterCard
            semData={sem}
            key={index}
            loading={loading}
            linkClickModal={setSemesterSelected}
            isMobileScreen={props.isMobileScreen}
          />
        ))}
      </div>
    </>
  );
};
export default SemesterCards;
