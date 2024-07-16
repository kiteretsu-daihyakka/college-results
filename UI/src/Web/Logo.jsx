import "./Logo.css";

export default function Logo(props){
    return (
        <div className={`logo ${props.className}`} onClick={props.onClick}>
            Just College
        </div>
    )
}
