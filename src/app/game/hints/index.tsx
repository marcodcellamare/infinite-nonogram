import { useEngine } from '@/contexts/engine';
import { useSettings } from '@/contexts/settings/hook';
import { useInteraction } from '@/contexts/interaction';
import classNames from 'classnames';

import Group from './Group';
import Size from './Size';
import Highlight from '../block/Highlight';

import '@/styles/components/game/hints/Main.css';

interface HintProps {
	row: number;
	col: number;
}

const Hint = ({ row, col }: HintProps) => {
	const { hints, isCompleted, isDone } = useEngine();
	const { rows, cols, showIntersections } = useSettings();
	const { overCol, overRow } = useInteraction();

	return (
		<div
			className={classNames([
				'game-grid-hint',
				'flex relative pointer-events-none',
				row >= 0 || col >= 0 ? 'bg-base-200/50' : 'bg-accent',
				{
					'game-grid-hint-t-strong': row % 5 === 0 || row === -1,
					'game-grid-hint-l-strong': col % 5 === 0 || col === -1,
					'game-grid-hint-b-strong': row >= rows - 1 || row === -1,
					'game-grid-hint-r-strong': col >= cols - 1 || col === -1,
				},
			])}>
			{row >= 0 || col >= 0 ? (
				<>
					{col < 0 && hints.rows[row] ? (
						<Group
							type='row'
							hints={hints.rows[row]}
							isLineDone={isDone.rows[row]}
						/>
					) : null}
					{row < 0 && hints.cols[col] ? (
						<Group
							type='col'
							hints={hints.cols[col]}
							isLineDone={isDone.cols[col]}
						/>
					) : null}
				</>
			) : (
				<Size />
			)}
			{showIntersections &&
			!isCompleted &&
			(overCol === col || overRow === row) ? (
				<Highlight />
			) : null}
		</div>
	);
};
export default Hint;
