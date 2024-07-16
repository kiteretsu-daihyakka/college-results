import './Backdrop.css';

export default function Backdrop(props) {
  return (
    <div className={`backdrop ${props.className}`} onClick={props.onClick}/>
  )
}
