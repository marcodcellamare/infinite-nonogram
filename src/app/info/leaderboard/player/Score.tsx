import useFormatNumber from '!/hooks/useFormatNumber';

interface ScoreProps {
	score: number;
}

const Score = ({ score }: ScoreProps) => {
	const { number } = useFormatNumber();

	return (
		<div className='font-mono text-nowrap text-xs text-secondary'>
			{number(score)}
		</div>
	);
};
export default Score;
