import "./SemesterCard.css";

function SemesterCard(props) {
  return (
    <tr className="sem-card">
      <td key={`${props.semData.name}-name`} className="sem-name">
        {props.semData.name}
      </td>
      <td key={`${props.semData.name}-subjects`} className="subCell">
        Subjects{" "}
        <span className="countLinkCell">
          <button
            type="button"
            className="btn"
            onClick={() => {
              props.linkClickModal(props.semData['id']);
            }}
          >
            {props.semData.subjects.length}
          </button>
        </span>
        {/* <br /> */}
      </td>
      <td key={`${props.semData.name}-students`} className="studCell">
        Students{" "}
        <span className="countLinkCell">{props.semData.studCount}</span>
        {/* <br /> */}
      </td>
      <td key={`${props.semData.name}-results`} className="viewResultCell">
        View Results
        {/* <br /> */}
      </td>
    </tr>
  );
}
export default SemesterCard;
