import SemesterCard from "./SemesterCard";
import { useEffect, useState } from "react";
import "./SemesterCards.css";
import SubjectModal from "../SubjectModal/SubjectModal";

const SemesterCards = () =>{
    const [allSemOverview, setallSemOverview] = useState([
        {id:1,name:"Freshman Year - Fall Semester", subjCount:69,studCount:69},
        {id:2,name:"Freshman Year - Spring Semester", subjCount:69,studCount:69},
        {id:3,name:"Sophomore Year - Fall Semester", subjCount:69,studCount:69},
        {id:4,name:"Sophomore Year - Spring Semester", subjCount:69,studCount:69},
    ]);
    const [subjectModalVisible, subjectModalShow] = useState(false);
    useEffect(()=>console.log(subjectModalVisible),[subjectModalVisible])
    return (
        <>
            <SubjectModal show={subjectModalVisible} onClose={()=>subjectModalShow(false)}/>
            <table className="sem-table">
            <tbody>
                {allSemOverview.map(sem=><SemesterCard semData={sem} key={sem.id} linkClickModal={subjectModalShow}/>)}
            </tbody>
        </table>
        </>
    )
}
export default SemesterCards
