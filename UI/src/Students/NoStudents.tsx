import emptyChair from "../images/PNG/empty-chairs.png";

export const NoStudents = () => {
  return (
    <div className="noStudents">
        <img src={emptyChair} alt="There're not students present."/>
        <p>No students present. Add students using "Add" option.</p>
    </div>
  )
}
