interface Hint {
	hint: number;
}

const Number = ({ hint }: Hint) => {
	return <span>{hint}</span>;
};
export default Number;
