import "./TeacherLogin.css";

const TeacherLogin = (props) => {
    return (<>
                <div className="TeacherLogin form-group">
                    <h3 className="TeacherLoginTitle">{props.adminTxt} Login</h3>
                    <input placeholder="Username" className="form-control"/>
                    <br/>
                    <input placeholder="Password" className="form-control"/>
                    <br/>
                    <buttton className="loginBtn btn">Login</buttton>
                    <button className="cancelBtn btn">Cancel</button>
                </div>
            </>)
}
export default TeacherLogin