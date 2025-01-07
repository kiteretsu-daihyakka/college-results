import React, {useEffect, useState, useRef} from 'react';
import {useForm} from "react-hook-form";
import {SemFilter} from "../Students/SemFilter.tsx";
import fetchSemesterWiseStudent from "../hooks/StudentsProvider.jsx";
import fetchSemesters from "../Home/SemesterCards/SemesterProvider.tsx";
import {useParams} from "react-router-dom";
import Title from "../Web/Title";
import Button from "../Web/Button";
import {updateMarksPage} from "../Utils/Variables";
import {NoStudents} from "../Students/NoStudents.tsx";
import { DevTool } from "@hookform/devtools";
import SubjectFilter from '../Students/SubjectFilter.tsx';
import {SingleBoxLoading, SingleLineLoading} from "../Home/SemesterCards/Loading.tsx";
import {studentMarksURL} from "../Utils/Variables.js";
import Toast from "../Web/Toast";
import axios from "axios";
import './UpdateMarks.css';

function UpdateMarks(props) {
    const params = useParams();
    let current_semID = parseInt(params["semester"]);
    const selectAllSubject = useRef(true);
    const [studentsData, setStudentsData] = useState(null);
    const [semesters, setSemesters] = useState([null, null, null, null]);
    const [subjects, setSubjects] = useState([]);
    // const [selectedSubjects, setSelectedSubjects] = useState([]);
    // const selectedSubjects_cnt = !_.isEmpty(subjects) ? subjects?.filter((subject) => subject.selected).length : 0;
    const selectedSubjects_cnt = !(_.isEmpty(subjects)) ? subjects?.filter((subject) => subject.selected).length : 0;
    const [validation_errors, setValidation_errors] = useState(new Set([]));
    const [loading, setLoading] = useState(false);
    const current_sem = semesters?.filter((sem) => sem?.id === current_semID)[0];
    const [showToast, setShowToast] = useState(false);
    const marks = () => {
        return;
    }
    const {register, handleSubmit, formState, setValue, control} = useForm({
        // values: () =>
        //     let studentsMarksMap = {}
        //     // subjects.forEach(sub => {
        //     //     studentsData.forEach(stu => {
        //     //         studentsMarksMap[`marks_${sub.code}_${stu.id}`] = stu[sub];
        //     //     });
        //     // });
        // subjects?.map((subject) => studentsData?.map(student => {[`marks_${sub.code}_${stu.id}`] : stu[sub]})
        //     return studentsMarksMap;

        // }, shouldUnregister: true
    });
    // if (semesters[0]) {
    //
    //     subjects = current_sem.subjects.map(subject => {
    //         subject["selected"] = false;
    //         return subject;
    //     });
    // }

    function setsemNull() {
        setSemesters([null, null, null, null]);
    }

    function fetchMarks(code_selected) {
        let codes;
        if (code_selected === 'ALL') {
            codes = subjects?.map(subject => subject.code);
        } else {
            codes = [code_selected];
        }
        // console.log({codes});
        // console.log('came before forEach');
        setLoading(true);
        codes.forEach(async (code) => {
            // console.log(code , ' fetch triggered.');
            const response = await axios(`${studentMarksURL}?code=${code}`);
            const response_students = await response.data.data.students;
            setStudentsData(prevStuData => {
                let newStuData = prevStuData?.map(student => {
                    student[code] = 0;
                    response_students.forEach(response_student => {
                        if (response_student.id == student.id) {
                            student[code] = response_student["marks"][code];
                        }
                    })
                    return student;
                });
                return newStuData;
            });
            console.log({studentsData})
        });
        setLoading(false);
    }

    async function handleSubjectClicked(code) {
        setLoading(true);
        console.log({selectedSubjects_cnt});
        if (code == "ALL") {
            if (subjects?.length !== 0 && subjects?.length === selectedSubjects_cnt) {
                setSubjects((prevSubjects) => prevSubjects.map((subject) => {
                    subject["selected"] = false;
                    return subject;
                }));
                console.log('came into if');
            } else {
                setSubjects(prevSubjects => prevSubjects.map((subject) => {
                    subject["selected"] = true;
                    return subject;
                }))
                // fetchMarks(code);
                console.log('came into else');
            }
        } else {
            setSubjects((prevSubjects) => prevSubjects.map((subject) => {
                if (subject.code == code) {
                    if (subject.selected) {
                        Array.prototype.forEach.call(document.getElementsByClassName(`subject-col-${code}`), (e) => {
                            e.classList.add('slideleft');
                        });
                        // setTimeout(() => {
                        //     newsubject["selected"] = false;
                        // }, 500);
                        subject["selected"] = false;
                    } else {
                        subject["selected"] = true;
                        fetchMarks(code);
                    }
                }
                return subject;
            }));
        }
        setLoading(false);
    }

    async function handleSubmitMarks(e) {
        e.preventDefault();
        // console.log({data});
        // console.log({formState});
        // console.log('isDirty: ', formState.isDirty);
        // console.log('dirtyFields: ', formState.dirtyFields);
        // console.log('touchedFields: ',formState.touchedFields);

        // || !(formState.isDirty)
        if (validation_errors.size > 0 || loading ) {
            // console.log('coming here')
            return;
        }
        setLoading(true);
        // console.log({studentsData});
        let subjectMarks = [];
        subjects?.filter(sub => sub.selected).forEach((sub) => {
            let student_marks = studentsData.map(student => {
                return {
                    "id": student.id,
                    "marks": student[sub.code]
                };
            });
            subjectMarks.push({"subject": sub.code, "students": student_marks});
        })

        subjectMarks.forEach(submark => {
            let config = {
                method: "post",
                url: studentMarksURL,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("site")}`,
                },
                data: submark,
            };
            axios(config)
                .then((response) => {
                    // props.hideModal();
                    setShowToast(true);
                    setLoading(false);
                    // props.fetchSemesterWiseStudent(current_semID);
                })
                .catch((errors) => {
                    console.log(errors);
                });
        })
    }


    async function fetchSemestersAndStudents(semesterID) {
        setStudentsData(() => null);
        setValidation_errors(new Set([]));
        // selectedSubjects_cnt = 0;
        let currentSem = null;
        if (semesters[0] == null) {
            let response_semesters = await fetchSemesters();
            setSemesters(response_semesters);
            currentSem = response_semesters?.filter((sem) => sem?.id === semesterID)[0];
        } else {
            currentSem = semesters?.filter((sem) => sem?.id === semesterID)[0];
        }
        let response_subjects = currentSem.subjects.map(subject => {
            return {id: subject.id, code: subject.code, name: subject.name, selected: true};
        });
        setSubjects(response_subjects);
        setStudentsData(await fetchSemesterWiseStudent(semesterID));
    }

    const fiveLoadingRows: JSX.Element[] = [];
    for (let index = 0; index < 10; index++) {
        fiveLoadingRows.push(
            <tr key={index}>
                <td className="name">
                    <SingleLineLoading className={'fullwidth'}/>
                </td>
            </tr>
        );
    }

    function handleMarksUpdate(e, current_student_id, current_code) {
        let stuID_code = `${current_student_id}_${current_code}`;
        // setValue(e.target.getAttribute('name'), e.target.value, {shouldDirty: false});
        // console.log('coming in update');
        let new_mark = e.target.value;
        // console.log({e})
        if (new_mark === "" || new_mark.includes("-") || new_mark.includes(".") || new_mark.includes("e") || parseInt(new_mark) > 100) {
            if (!validation_errors.has(stuID_code)) {
                e.target.classList.add("invalid-input");
                setValidation_errors(prev => prev.add(stuID_code));
            }
        } else if (validation_errors.has(stuID_code)) {
            e.target.classList.remove("invalid-input");
            setValidation_errors(prev => {
                prev.delete(stuID_code);
                // let new_errors_set = prev;
                return prev;
            });
        }
        setStudentsData(prevStuData => {
            return prevStuData.map(student => {
                if (current_student_id == student.id) {
                    student[current_code] = new_mark;
                }
                return student;
            });
        });
    }

    useEffect(() => {
        fetchSemestersAndStudents(current_semID);
        // handleSubjectClicked('ALL');
    }, [current_semID]);

    useEffect(() =>{
        if (selectedSubjects_cnt !== 0 && selectedSubjects_cnt === subjects.length) {
            fetchMarks('ALL');
            console.log('coming in useEffect fetch all');
        }
    }, [subjects]);


    return (
        <>
            <form onSubmit={handleSubmitMarks}>
                <div className={`update-marks-container ${selectedSubjects_cnt === 0 ? "gridWithoutSubmit" : ""}`}>
                    <Title>Update Marks of Students</Title>
                    <div className='breadcrumb'>&nbsp;</div>
                    {showToast && <Toast setShowToast={setShowToast}>Student marks updated successfully.</Toast>}
                    <SemFilter semesters={semesters} action_path={updateMarksPage} className={'forceWidth'}/>
                    <SubjectFilter subjects={subjects} handleSubjectClicked={handleSubjectClicked}
                                   allSelected={selectedSubjects_cnt === subjects?.length}/>

                    {/*|| !(formState.isDirty)*/}
                    {selectedSubjects_cnt > 0 &&
                        <Button
                            className={`marksSubmitBtn primary ${validation_errors.size > 0 || loading ? "disabledState" : ""}`}
                            type="submit">Submit</Button>

                    }


                    <div className="studentsTable marksTable">
                        <>
                            {studentsData !== null && _.isEmpty(studentsData) ? (
                                <NoStudents/>
                            ) : (
                                <>
                                    <table style={{width: "100%"}}>
                                        <thead>
                                        <tr>
                                            <th className="name">Name</th>
                                            {subjects.map(sub => sub.selected && <th key={sub.code}
                                                                                     className={`subject-col-${sub.code} subject-code-header`}>{sub.code}</th>)}
                                            <th className='subject-code-header'></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {studentsData === null ? (
                                            fiveLoadingRows
                                        ) : (
                                            <>
                                                {studentsData.map((student) => (
                                                    <tr key={student.id}>
                                                        <td className="name">{student.name}</td>
                                                        {subjects.map(sub => sub.selected && <td key={sub.code}
                                                                                                 className={`subject-col-${sub.code} marks-field`}>
                                                                {!(sub.code in student) ?
                                                                    <SingleBoxLoading className={'smallHeight'}/> :
                                                                    <input className='markInput'
                                                                        // name={`marks_${sub.code}_${student.id}`}
                                                                        //    defaultValue={10}
                                                                           defaultValue={student[sub.code]}
                                                                           // value={student[sub.code]}
                                                                           type={"number"}
                                                                           min={0} max={100}
                                                                           onChange={(e) => handleMarksUpdate(e, student.id, sub.code)}
                                                                         //  {...register(`${sub.code}.${student.id}`)}
                                                                    />}
                                                            </td>
                                                        )}
                                                        <td className={'marks-field'}></td>
                                                    </tr>
                                                ))}
                                            </>
                                        )}
                                        </tbody>
                                    </table>
                                </>
                            )}
                        </>
                    </div>
                </div>
            </form>
            {/*<DevTool control={control}/>*/}
        </>
    )
        ;
}

export default UpdateMarks;
