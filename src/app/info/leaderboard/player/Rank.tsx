interface RankProps {
	rank: number;
}

const Rank = ({ rank }: RankProps) => (
	<div className='text-xs font-mono justify-self-end'>
		{('0' + (rank + 1)).slice(-2)}.
	</div>
);
export default Rank;
