import "./GamImage.scss";

const GamImage = ({ verifier, src, className, children }) => {
  return (
    <div className={className + ` gam-image`}>
      {verifier != null ? (
        <img src={src}></img>
      ) : (
        <img src={"/images/null.png"}></img>
      )}
      {children}
    </div>
  );
};

export default GamImage;
