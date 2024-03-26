import { useState } from "react";
import SemesterCards from "./SemesterCards/SemesterCards";
import SubjectModal from "./SubjectModal/SubjectModal"

export default function Home (props){
    return <>
        <SemesterCards allSemOverview={props.allSemOverview}/>
    </>
}
