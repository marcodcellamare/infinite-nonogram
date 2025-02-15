import Number from './Number';

interface Group {
	type: 'row' | 'col';
	hints: number[];
}

const Group = ({ type, hints }: Group) => {
	//const { hints } = useEngine();

	return hints ? (
		<ul
			className={`list-none p-2 flex flex-grow items-center justify-end ${
				type === 'col' ? 'flex-col' : 'flex-row'
			}`}>
			{hints.map((hint, k) => (
				<li
					key={k}
					className='leading-none p-0.5'>
					<Number hint={hint} />
				</li>
			))}
		</ul>
	) : null;
};
export default Group;
