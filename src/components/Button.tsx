interface Props {
  textContent: string;
  handleClick: () => void;
  // optional logic to disable the button
  disabled?: boolean 
}

const Button = ({ textContent, handleClick }: Props) => {
  return <button type="submit" onClick={handleClick}>{textContent}</button>;
};

export default Button;
