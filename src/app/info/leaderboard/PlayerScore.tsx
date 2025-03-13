import useFormatNumber from '!/hooks/useFormatNumber';

interface PlayerScoreProps {
	rank: number;
	score: number;
}

const PlayerScore = ({ rank, score }: PlayerScoreProps) => {
	const { number } = useFormatNumber();

	return (
		<div
			className={`font-mono justify-self-end ${
				rank < 10 ? 'text-xs' : 'text-xxs'
			}`}>
			{number(score)}
		</div>
	);
};
export default PlayerScore;
