// import fetchSemesters from "../Home/SemesterCards/SemesterProvider";
import axios from "axios";
import {domain} from "../Utils/Variables.js";

const studentDomain = "student";
const studentDomainSemFilter = studentDomain.concat("?semester=");

async function fetchSemesterWiseStudent(current_id) {
    let response = await axios
        .get(`${domain.concat(studentDomainSemFilter).concat(current_id)}`);
    return response.data.data.semester.students;
}

export default fetchSemesterWiseStudent;
