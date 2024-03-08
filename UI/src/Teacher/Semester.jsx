import { useState } from "react"
import { useEffect } from "react"
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Semester = (props) => {
    const [sems, setSems] = useState([{ id: "1", name: "Semester 1" },
    { id: "2", name: "Semester 2" },
    { id: "3", name: "Semester 3" },
        // { id: "4", name: "Semester 4" },
        // { id: "5", name: "Semester 5" }
    ]);
    // useEffect(() => {
    //     // static data
    //     let data = [

    //     ]
    //     setSems(data);
    // }, [sems])
    return (<>
        {/* <Nav id="semesters">
            {sems.map((sem) => <Nav.Link as={NavLink} to={`?semester=${sem.id}`} key={sem.id}>{sem.name}</Nav.Link>)}
        </Nav> */}

        <h3>
            <label htmlFor="semesters" className="label label-default" style={{border:"0px solid black", float:"left", verticalAlign: "text-top"}}>Semester:</label>
        </h3>
        <select 
            id="semesters" className="form-select form-select-md" 
            onChange={(e)=>props.onChange(e.target.value)}
            style={{ width: "70%", margin: "auto" }} defaultValue={""}
            >
            <option value="" disabled>Select Semester</option>
            {sems.map((sem) => <option key={sem.id} value={sem.id}>{sem.name}</option>)}
        </select>
    </>)
}
export default Semester