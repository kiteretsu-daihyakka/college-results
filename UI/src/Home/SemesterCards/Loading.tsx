import "./Loading.scss";

const Loading = () => {
  return (
    <div>
      <div className="text-line"></div>
      <div className="text-line"></div>
      <div className="text-line"></div>
    </div>
  );
};
const SingleLineLoading = (props) => {
  
  return (
    <div>
      <div className={`text-line ${props.className}`}></div>
    </div>
  );
};

const BoxLoading = (props) => {
  
  return (
    <div>
      <div className={`square`}></div>
      <div className={`square`}></div>
    </div>
  );
};
export default Loading;
export {SingleLineLoading, BoxLoading};
