import { useState } from "react";
import Semester from "../Semester"
import Subject from "./Subject"
import Add from "./Add"

const Subjects = (props) => {
    let data = [
        {id:1, name:"subject A1", semId:"1"},
        {id:2, name:"subject A2", semId:"1"},
        {id:3, name:"subject A3", semId:"1"},
        {id:4, name:"subject A4", semId:"1"},
        {id:5, name:"subject B1", semId:"2"},
        {id:6, name:"subject B2", semId:"2"},
        {id:7, name:"subject B3", semId:"2"},
        {id:8, name:"subject C1", semId:"3"},
        {id:9, name:"subject C2", semId:"3"},
    ]
    const [semId, setSemId] = useState();
    const [subs, setSubs] = useState(data);
    function onSemesterChange(id){
        if (id === "")
            return;
        setSemId(id);
    }
    return (<>
        <br />
        <Semester onChange={onSemesterChange}/>
        <br />
        <h3>Subjects:</h3>
        {subs.filter(sub => sub.semId === semId).map(sub => <Subject key={sub.id} name={sub.name}/>)}
        {/* <Add/> */}
    </>)
} 
export default Subjects