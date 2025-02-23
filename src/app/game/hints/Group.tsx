import { useMemo } from 'react';
import { useScale } from '!/contexts/scale';

import Number from './Number';
import Config from '!config';

import { HintNumbersProps } from '!/types/engine';

interface GroupProps {
	type: 'row' | 'col';
	hints: HintNumbersProps[];
}

const Group = ({ type, hints }: GroupProps) => {
	const { scale } = useScale();

	const xSpace = useMemo(
		() => Config.game.grid.hint.padding * (type === 'row' ? scale : 0),
		[scale, type]
	);

	const ySpace = useMemo(
		() => Config.game.grid.hint.padding * (type === 'col' ? scale : 0),
		[scale, type]
	);

	const isDone = useMemo(
		() => hints.filter((hint) => hint.found?.includes(false)).length === 0,
		[hints]
	);

	return hints ? (
		<ul
			className={`list-none flex flex-grow items-center justify-end transition-[background-color] duration-300 ${
				type === 'col' ? 'flex-col' : 'flex-row'
			}${isDone ? ' bg-white/50' : ''}`}
			style={{
				paddingTop: `${ySpace * 2}em`,
				paddingBottom: `${ySpace * 2}em`,
				paddingLeft: `${xSpace * 2}em`,
				paddingRight: `${xSpace * 2}em`,
				fontSize: `calc(var(--text-xs) * ${scale})`,
			}}>
			{hints.map((hint, k) => (
				<li
					key={k}
					className='leading-none'
					style={{
						marginTop: `${ySpace}em`,
						marginBottom: `${ySpace}em`,
						marginLeft: `${xSpace}em`,
						marginRight: `${xSpace}em`,
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
