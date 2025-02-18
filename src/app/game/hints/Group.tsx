import Number from './Number';

import { Hint } from '@_types/engine';

interface Group {
	type: 'row' | 'col';
	hints: Hint[];
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
					<Number
						total={hint.total}
						isDone={hint.isDone}
					/>
				</li>
			))}
		</ul>
	) : null;
};
export default Group;
