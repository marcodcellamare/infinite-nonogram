import { useEngine } from '!/contexts/engine';
import { useSettings } from '!/contexts/settings/hook';

import Group from './Group';

interface HintProps {
	row: number;
	col: number;
}

const Hint = ({ row, col }: HintProps) => {
	const { hints } = useEngine();
	const { rows, cols } = useSettings();

	return (
		<div
			className={`flex ${
				row >= 0 || col >= 0
					? 'bg-base-200 text-base-content'
					: 'bg-base-300'
			}${
				col < 0 && row >= 0
					? ' border-x-3 ' +
					  (row % 5 < 4 && row < rows - 1
							? 'border-b-1'
							: 'border-b-3')
					: ''
			}${
				row < 0 && col >= 0
					? ' border-y-3 ' +
					  (col % 5 < 4 && col < cols - 1
							? 'border-r-1'
							: 'border-r-3')
					: ''
			} border-base-300`}>
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
