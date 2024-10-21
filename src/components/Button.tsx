interface Props {
  textContent: string;
  handleClick: () => void;
}

const Button = ({ textContent, handleClick }: Props) => {
  return <button type="submit" className="submit-btn" onClick={handleClick}>{textContent}</button>;
};

export default Button;
