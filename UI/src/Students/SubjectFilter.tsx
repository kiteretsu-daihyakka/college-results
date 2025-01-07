import React, {useState, useRef} from 'react';
import './styles/SubjectFilter.css';
import axios from "axios";
import Button from "../Web/Button";
import arrowRight from "../images/PNG/arrow-chevron-right.svg";
import arrowLeft from "../images/PNG/arrow-chevron-left.svg";
import {SingleLineLoading} from "../Home/SemesterCards/Loading.tsx";

function SubjectFilter(props) {

    function handleSubjectClick(e) {
        let subjectClicked = e.currentTarget.getAttribute("name");
        props.handleSubjectClicked(subjectClicked);
    }

    const [showRightArrow, setShowRightArrow] = useState(true);

    function handleRightArrowClick() {
        setShowRightArrow(false);

        setTimeout(()=> {
            // let last_subj_id = `subj_filter_${props?.subjects.length-1}`;
            let last_subj_id = `empty-div-for-scroll-right`;
            document.getElementById(last_subj_id).scrollIntoView({behavior: 'smooth'});
        }, 100);
        // let last_subject_id = `empty-div-for-scroll-right`;
        // document.getElementById(last_subject_id).scrollIntoView({behavior: 'smooth'});
        // document.getElementById(last_subject_id).classList.add("hiddenElement");
    }

    function handleLeftArrowClick() {
        setShowRightArrow(true);

        setTimeout(()=> {
            let all_subj_id = `ALL`;
            document.getElementById(all_subj_id).scrollIntoView({behavior: 'smooth'});
        }, 100);


        // let last_subject_id = `empty-div-for-scroll-left`;
        // // document.getElementById(last_subject_id).scrollIntoView({behavior: 'smooth'});
        // document.getElementById(last_subject_id).scrollTo(0,0);
        // document.getElementById(last_subject_id).classList.add("hiddenElement");
    }

    return (

        <div className='subjectFilter'>
            {!(props.subjects) ? <SingleLineLoading/> : <>
                {/*className='all-subj'*/}
                {/*{!showRightArrow && */}
                    <div className={'divLeftArrow'} style={{visibility:showRightArrow ? 'hidden' : 'visible'}}>
                        <Button onClick={handleLeftArrowClick} type="button" id="arrowLeftSide">
                            <img src={arrowLeft} alt="Move Left side."/>
                        </Button>
                    </div>
                {/*}*/}
                {/*<div style={{marginRight: "65px"}} id={'empty-div-for-scroll-left'}></div>*/}

                <Button id={'ALL'} onClick={handleSubjectClick} type="button" className={`${props.allSelected ? 'primary' : ''}`}
                        name={'ALL'}>All</Button>
                {!_.isEmpty(props.subjects) && props?.subjects?.map((subject, index) => (
                    <Button id={`subj_filter_${index}`}
                            className={`subj ${subject.selected ? 'primary' : ''}`}
                            key={index} onClick={handleSubjectClick} type="button" name={subject.code}>
                        {`${subject.code} - ${subject.name} `}
                        <i className="fa fa-plus subjectYetToSelect"></i>
                        <i className="fa fa-check subjectSelected"></i>
                    </Button>
                ))}
                <div style={{marginLeft: "1px"}} id={'empty-div-for-scroll-right'}></div>
                {showRightArrow &&
                    <>
                        <div className={'divRightArrow'}>
                            <Button onClick={handleRightArrowClick} type="button" id="arrowRightSide">
                                <img src={arrowRight} alt="Move Right side."/>
                            </Button>
                        </div>
                    </>
                }
            </>}
        </div>
    );
}

export default SubjectFilter;
