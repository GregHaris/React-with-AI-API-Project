interface Props {
  heading: string;
  children: string;
}

const Headings = ({ heading, children }: Props) => {
  return (
    <>
      <div>
        {' '}
        <h1>{heading}</h1>
      </div>
      <div>
        {' '}
        <h3>{children}</h3>
      </div>
    </>
  );
};

export default Headings;
