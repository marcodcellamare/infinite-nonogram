import { useEngine } from '@contexts/engine';
import Group from './Group';

interface Hint {
	row: number;
	col: number;
}

const Hint = ({ row, col }: Hint) => {
	const { hints } = useEngine();

	return (
		<div
			className={`flex min-w-[1rem] min-h-[1rem] ${
				row >= 0 || col >= 0
					? 'bg-gray-200 text-gray-500 text-xs'
					: 'bg-gray-300'
			}${
				col < 0 && row >= 0
					? ' border-x-3 ' +
					  (row % 5 < 4 ? 'border-b-1' : 'border-b-3')
					: ''
			}${
				row < 0 && col >= 0
					? ' border-y-3 ' +
					  (col % 5 < 4 ? 'border-r-1' : 'border-r-3')
					: ''
			} border-gray-300`}>
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
