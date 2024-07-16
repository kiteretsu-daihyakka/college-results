import Loading, {BoxLoading, SingleLineLoading} from "./Loading.tsx";
import "./SemesterCard.css";
import VerticalLine from "./VerticalLine";
import { useNavigate } from "react-router-dom";


function SemesterCard(props) {
  const navi = useNavigate();
  
  const modalOpenHandler = () =>{
    if (subjects?.length !== 0) {
      props.linkClickModal(props.semData["id"]);
    }
  }
  const studentLinkClicked = () => {
    navi(`student/semester/${props.semData["id"]}`);
  }
  let name = null;
  let subjects = null;
  let studCount = null;

  if (props.semData) {
    name = props.semData.name;
    subjects = props.semData.subjects;
    studCount = props.semData.studCount;
  }
 
  let card = (
    <div className={`sem-card ${props.loading ? "text-loader" :""}`}>
      
      {props.loading ? 
        <>
        <Loading/>
        {!props.isMobileScreen && 
        <>
          <BoxLoading/>
          <BoxLoading/>
          <BoxLoading/>
        </>}
       </>:
        <>
        <div key={`${name}-name`} className={`sem-name ${props.loading ? "loadingSquare":""}`}>
      {name}
      </div>
      <div key={`${name}-subjects`} className={`subCell`}>
      
        <div>Subjects</div>
        <div
          className={`countLinkCell underlined ${
            subjects?.length === 0 ? "inactive" : ""
          }`}
          onClick={modalOpenHandler}
        >
          {subjects?.length}
        </div>

      </div>

      <VerticalLine />
 
      <div key={`${name}-students`} className={`studCell`}>
      <div>Students</div>
        <div className="countLinkCell underlined" onClick={studentLinkClicked}>
          {studCount}
        </div>
      </div>
      <VerticalLine />
      <div key={`${name}-results`} className="viewResultCell">
        View<br />Results
      </div>
        </>}
    </div>
  );
  return card;
}
export default SemesterCard;
