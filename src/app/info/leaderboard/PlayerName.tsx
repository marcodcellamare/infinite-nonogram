import CountryBadge from '!/app/misc/CountryBadge';

interface PlayerNameProps {
	rank: number;
	name: string;
	country?: string | null;
}

const PlayerName = ({ rank, name, country = null }: PlayerNameProps) => (
	<div
		className={`truncate text-primary ${
			rank === 0
				? 'text-sm sm:text-base font-bold'
				: rank < 10
				? 'text-xs sm:text-sm'
				: 'text-xs'
		}`}>
		<CountryBadge
			country={country}
			className='badge badge-xs badge-primary me-1 align-text-top hidden xl:inline-block'
		/>
		{name}
	</div>
);
export default PlayerName;
