import './Button.css';

export default function Button(props) {
    return <button className={`btn jst-btn ${props.className ? props.className : ""}`} onClick={props.onClick} type={props.type} id={props.id}
                   onMouseEnter={props.onMouseOver} onMouseLeave={props.onMouseOut} disabled={props.disabled} title={props.title} name={props.name}>
        {props.children}
    </button>
}
