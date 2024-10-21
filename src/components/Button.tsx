interface Props {
  textContent: string;
  handleClick: () => void;
}

const Button = ({ textContent, handleClick }: Props) => {
  return (
    <div>
      <button onClick={handleClick}>{textContent}</button>
    </div>
  );
};

export default Button;
