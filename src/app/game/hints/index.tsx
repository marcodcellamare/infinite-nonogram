import { useEngine } from '@contexts/engine';
import Group from './Group';

interface Hint {
	row: number;
	col: number;
}

const Hint = ({ row, col }: Hint) => {
	const { hints, rows, cols } = useEngine();

	return (
		<div
			className={`flex min-w-[2.5rem] min-h-[2.5rem] ${
				row >= 0 || col >= 0
					? 'bg-base-200 text-base-content text-xs'
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
