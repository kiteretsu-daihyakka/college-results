import { useState } from "react";
import Semester from "../Semester"
import Subject from "./Subject"
import Add from "./Add"
import Title from "../../Web/Title";

const Subjects = (props) => {
    const [subs, setSubs] = useState([]);
    function onSemesterChange(id){
        if (id === "")
            return;
        setSubs(props.allSemOverview.filter(sem => parseInt(sem.id) === parseInt(id))[0].subjects)
    }
    return (<>
    <Title>Subjects</Title>
        <br />
        <Semester onChange={onSemesterChange} allSemOverview={props.allSemOverview}/>
        <br />
        <h3>Subjects:</h3>
        {subs.map(sub => <Subject key={sub.name} name={sub.name}/>)}
        {/* <Add/> */}
    </>)
} 
export default Subjects
