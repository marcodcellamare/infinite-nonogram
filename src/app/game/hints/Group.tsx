import { useMemo } from 'react';
import { useEngine } from '!/contexts/engine';
import { useSettings } from '!/contexts/settings';
import classNames from 'classnames';

import Number from './Number';

import { HintNumbersProps } from '!/types/engine';

import '!/styles/components/game/hints/Group.css';

interface GroupProps {
	type: 'row' | 'col';
	hints: HintNumbersProps[];
}

const Group = ({ type, hints }: GroupProps) => {
	const { isCompleted } = useEngine();
	const { isRefreshing, showEffects } = useSettings();

	const isDone = useMemo(
		() =>
			isCompleted ||
			hints.filter((hint) => hint.found?.includes(false)).length === 0,
		[hints, isCompleted]
	);

	if (!hints) return null;

	return (
		<ul
			className={classNames([
				'game-grid-hint-group',
				'list-none flex flex-grow items-center justify-end',
				type === 'col'
					? 'game-grid-hint-group-col flex-col'
					: 'game-grid-hint-group-row flex-row',
				{
					'transition-[background-color] duration-400': showEffects,
					'bg-accent/25': isDone,
				},
			])}>
			{!isRefreshing
				? hints.map((hint, k) => (
						<li key={k}>
							<Number
								total={hint.total}
								isDone={isDone || hint.isDone}
							/>
						</li>
				  ))
				: null}
		</ul>
	);
};
export default Group;
