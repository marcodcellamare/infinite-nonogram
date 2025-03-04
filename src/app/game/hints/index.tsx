import { useEngine } from '!/contexts/engine';
import { useSettings } from '!/contexts/settings/hook';
import { useScale } from '!/contexts/scale';

import Group from './Group';

import Config from '!config';

interface HintProps {
	row: number;
	col: number;
}

const Hint = ({ row, col }: HintProps) => {
	const { hints } = useEngine();
	const { rows, cols } = useSettings();
	const { scale } = useScale();

	return (
		<div
			className={`flex relative ${
				row >= 0 || col >= 0 ? 'bg-base-200' : 'bg-base-300'
			}`}
			style={{
				minWidth: `${Config.game.grid.block.size * scale}rem`,
				minHeight: `${Config.game.grid.block.size * scale}rem`,
			}}>
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
			<div
				className={`absolute top-0 bottom-0 left-0 right-0 ${
					row % 5 === 0 || row === -1 ? 'border-t-2' : 'border-t-1'
				} ${col % 5 === 0 || col === -1 ? 'border-l-2' : 'border-l-1'}${
					row >= rows - 1 || row === -1 ? ' border-b-2' : ''
				}${
					col >= cols - 1 || col === -1 ? ' border-r-2' : ''
				} border-primary/15 ---mix-blend-multiply`}
			/>
		</div>
	);
};
export default Hint;
