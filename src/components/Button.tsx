interface Props {
  textContent: string;
  handleClick: () => void;
}

const Button = ({ textContent, handleClick }: Props) => {
  return <button type="submit" onClick={handleClick}>{textContent}</button>;
};

export default Button;
