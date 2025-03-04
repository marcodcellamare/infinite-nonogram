import { useMemo } from 'react';
import { useScale } from '!/contexts/scale';
import { useEngine } from '!/contexts/engine';
import { useSettings } from '!/contexts/settings';

import Number from './Number';
import Config from '!config';

import { HintNumbersProps } from '!/types/engine';

interface GroupProps {
	type: 'row' | 'col';
	hints: HintNumbersProps[];
}

const Group = ({ type, hints }: GroupProps) => {
	const { scale } = useScale();
	const { isCompleted } = useEngine();
	const { isRefreshing } = useSettings();

	const xGroupPadding = useMemo(
		() => Config.game.grid.hint.groupPadding * (type === 'row' ? scale : 0),
		[scale, type]
	);

	const yGroupPadding = useMemo(
		() => Config.game.grid.hint.groupPadding * (type === 'col' ? scale : 0),
		[scale, type]
	);

	const xPadding = useMemo(
		() => Config.game.grid.hint.padding * (type === 'row' ? scale : 0),
		[scale, type]
	);

	const yPadding = useMemo(
		() => Config.game.grid.hint.padding * (type === 'col' ? scale : 0),
		[scale, type]
	);

	const isDone = useMemo(
		() =>
			isCompleted ||
			hints.filter((hint) => hint.found?.includes(false)).length === 0,
		[hints, isCompleted]
	);

	return hints ? (
		<ul
			className={`list-none flex flex-grow items-center justify-end transition-[background-color] duration-300 ${
				type === 'col' ? 'flex-col' : 'flex-row'
			}${isDone ? ' bg-white/60' : ''}`}
			style={{
				paddingTop: `${yGroupPadding}em`,
				paddingBottom: `${yGroupPadding}em`,
				paddingLeft: `${xGroupPadding}em`,
				paddingRight: `${xGroupPadding}em`,
				fontSize: `calc(var(--text-xs) * ${scale})`,
			}}>
			{!isRefreshing
				? hints.map((hint, k) => (
						<li
							key={k}
							style={{
								paddingTop: `${yPadding}em`,
								paddingBottom: `${yPadding}em`,
								paddingLeft: `${xPadding}em`,
								paddingRight: `${xPadding}em`,
							}}>
							<Number
								total={hint.total}
								isDone={isDone || hint.isDone}
							/>
						</li>
				  ))
				: null}
		</ul>
	) : null;
};
export default Group;
