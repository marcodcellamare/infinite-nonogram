import { useSettings } from '!/contexts/settings';
import classNames from 'classnames';

import Number from './Number';

import { HintNumbersProps } from '!/types/engine';

import '!/styles/components/game/hints/Group.css';

interface GroupProps {
	type: 'row' | 'col';
	hints: HintNumbersProps[];
	isLineDone: boolean;
}

const Group = ({ type, hints, isLineDone }: GroupProps) => {
	const { isRefreshing, showEffects } = useSettings();

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
					'bg-accent/25': isLineDone,
				},
			])}>
			{!isRefreshing
				? hints.map((hint, k) =>
						hint.filled ? (
							<li key={k}>
								<Number
									total={hint.total}
									isDone={isLineDone || hint.isDone}
								/>
							</li>
						) : null
				  )
				: null}
		</ul>
	);
};
export default Group;
