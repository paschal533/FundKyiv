const Button = ({ btnName, classStyles, btnType, handleClick }) => (
  <button
    type="button"
    className={
      btnType === "primary"
        ? `btn-primary ${classStyles}`
        : `btn-outline ${classStyles}`
    }
    onClick={handleClick}
  >
    {btnName}
  </button>
);

export default Button;
