import useFormatDate from '@/hooks/useFormatDate';

import { DateType } from '@/types/leaderboard';

interface DateProps {
	date?: DateType | undefined;
}

const Date = ({ date }: DateProps) => {
	const { date: formatDate } = useFormatDate();

	if (!date) return null;

	return (
		<div className='text-xxs leading-none font-mono justify-self-end'>
			{formatDate(date.toString())}
		</div>
	);
};
export default Date;
