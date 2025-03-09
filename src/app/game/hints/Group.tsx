import { useMemo } from 'react';
import { useEngine } from '!/contexts/engine';
import { useSettings } from '!/contexts/settings';

import Number from './Number';

import { HintNumbersProps } from '!/types/engine';

import '!/styles/components/GridHintGroup.css';

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

	return hints ? (
		<ul
			className={`game-grid-hint-group list-none flex ${
				type === 'col'
					? 'game-grid-hint-group-col flex-col'
					: 'game-grid-hint-group-row flex-row'
			} flex-grow items-center justify-end ${
				showEffects ? ' transition-[background-color] duration-300' : ''
			} ${isDone ? ' bg-white/60' : ''}`}>
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
	) : null;
};
export default Group;
