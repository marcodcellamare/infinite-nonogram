import CountryBadge from '!/app/misc/CountryBadge';
import classNames from 'classnames';

interface NameProps {
	rank: number;
	name: string;
	country?: string | null;
}

const Name = ({ rank, name, country = null }: NameProps) => {
	return (
		<div
			className={classNames([
				'truncate text-primary',
				{
					'text-sm sm:text-base font-bold': rank === 0,
					'text-xs sm:text-sm': rank < 10,
					'text-xs': rank >= 10,
				},
			])}>
			<CountryBadge
				country={country}
				className='badge badge-xs badge-primary align-text-top hidden sm:inline-block me-1 sm:me-2'
			/>
			{name}
		</div>
	);
};
export default Name;
