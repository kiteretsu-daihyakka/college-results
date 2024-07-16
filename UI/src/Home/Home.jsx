import { useState } from "react";
import SemesterCards from "./SemesterCards/SemesterCards.jsx";
import SubjectModal from "./SubjectModal/SubjectModal"
import Title from "../Web/Title";
import "./Home.css";

export default function Home (props){
    return <>
        <Title>Home</Title>
        <SemesterCards  isMobileScreen={props.isMobileScreen}/>
    </>
}
