// import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";
import { domain } from "../../Utils/Variables.js";

// const semContext = createContext();
let semesterURL = domain.concat("semester");

// const SemesterProvider = ({children}) =>{
    
//     return <semContext.Provider value={{ fetchSemesters }}>
//             {children}
//         </semContext.Provider>;
// }
async function fetchSemesters () {
    const response = await axios(semesterURL);
    return await response.data.data.semesters;
}
// export default SemesterProvider;
export default fetchSemesters;

// export const useSemesters = () => useContext(semContext);
