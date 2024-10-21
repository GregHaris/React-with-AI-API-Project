interface Props {
  textContent: string;
  handleClick: () => void;
}

const Button = ({ textContent, handleClick }: Props) => {
  return <button className="submit-btn" onClick={handleClick}>{textContent}</button>;
};

export default Button;
