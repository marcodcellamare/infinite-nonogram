import { useEngine } from '!/contexts/engine';
import { useSettings } from '!/contexts/settings/hook';

import Group from './Group';

import '!/styles/components/GridHint.css';

interface HintProps {
	row: number;
	col: number;
}

const Hint = ({ row, col }: HintProps) => {
	const { hints } = useEngine();
	const { rows, cols } = useSettings();

	return (
		<div
			className={`game-grid-hint flex relative ${
				row >= 0 || col >= 0 ? 'bg-base-200' : 'bg-base-300'
			}${row % 5 === 0 || row === -1 ? ' game-grid-hint-t-strong' : ''}${
				col % 5 === 0 || col === -1 ? ' game-grid-hint-l-strong' : ''
			}${
				row >= rows - 1 || row === -1 ? ' game-grid-hint-b-strong' : ''
			}${
				col >= cols - 1 || col === -1 ? ' game-grid-hint-r-strong' : ''
			}`}>
			{row >= 0 || col >= 0 ? (
				<>
					{col < 0 && hints.rows[row] ? (
						<Group
							type='row'
							hints={hints.rows[row]}
						/>
					) : null}
					{row < 0 && hints.cols[col] ? (
						<Group
							type='col'
							hints={hints.cols[col]}
						/>
					) : null}
				</>
			) : null}
		</div>
	);
};
export default Hint;
