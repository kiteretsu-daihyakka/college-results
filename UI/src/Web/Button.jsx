import './Button.css';
export default function Button (props){
    return <button className={`btn jst-btn ${props.className}`} onClick={props.onClick} type={props.type} id={props.id} onMouseEnter={props.onMouseOver} onMouseLeave={props.onMouseOut}>
        {props.children}
    </button>
}
