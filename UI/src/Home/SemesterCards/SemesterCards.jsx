import SemesterCard from "./SemesterCard";
import { useEffect, useState } from "react";
import "./SemesterCards.css";
import SubjectModal from "../SubjectModal/SubjectModal";
import axios from "axios";

const SemesterCards = (props) => {
  
  const [allSemOverview, setallSemOverview] = useState(props.allSemOverview);
  const [semesterSelected, setSemesterSelected] = useState(0);
  
  return (
    <>
      <SubjectModal
        show={semesterSelected !== 0}
        onClose={() => setSemesterSelected(0)}
        semID={semesterSelected}
        allSem={allSemOverview}
      />
      <table className="sem-table">
        <tbody>
          {allSemOverview.map((sem) => (
            <SemesterCard
              semData={sem}
              key={sem.id}
              linkClickModal={setSemesterSelected}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};
export default SemesterCards;
