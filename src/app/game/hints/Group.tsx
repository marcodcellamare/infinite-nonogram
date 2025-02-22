import { useMemo } from 'react';
import { useScale } from '@contexts/scale';

import Number from './Number';

import { Hint } from '@_types/engine';

import Config from '@config';

interface GroupProps {
	type: 'row' | 'col';
	hints: Hint[];
}

const Group = ({ type, hints }: GroupProps) => {
	//const { hints } = useEngine();
	const { scale } = useScale();

	const padding = useMemo(() => {
		return type === 'col'
			? Config.game.grid.hint.padding * scale
			: Config.game.grid.hint.padding;
	}, [scale, type]);

	return hints ? (
		<ul
			className={`list-none flex flex-grow items-center justify-end ${
				type === 'col' ? 'flex-col' : 'flex-row'
			}`}
			style={{
				marginTop: `${padding * 3}em`,
				marginBottom: `${padding * 3}em`,
				marginLeft: `${padding * 3}em`,
				marginRight: `${padding * 3}em`,
				fontSize: `calc(var(--text-xs) * ${scale})`,
			}}>
			{hints.map((hint, k) => (
				<li
					key={k}
					className='leading-none'
					style={{
						marginTop: `${padding}em`,
						marginBottom: `${padding}em`,
						marginLeft: `${padding}em`,
						marginRight: `${padding}em`,
					}}>
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
