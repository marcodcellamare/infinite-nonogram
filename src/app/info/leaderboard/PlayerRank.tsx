interface PlayerRankProps {
	rank: number;
}

const PlayerRank = ({ rank }: PlayerRankProps) => (
	<div
		className={`font-mono justify-self-end ${
			rank < 10 ? 'text-xs' : 'text-xxs'
		}`}>
		{('0' + (rank + 1)).slice(-2)}.
	</div>
);
export default PlayerRank;
