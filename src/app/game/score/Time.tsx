import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useTimer } from '@/contexts/timer';

import Timer from '@/app/misc/Timer';
import { ClockIcon } from 'lucide-react';

const Time = () => {
	const { i18n } = useTranslation();
	const { timeUnits } = useTimer();

	const timeUnitsRef = useRef(timeUnits);

	return (
		<div className='badge badge-lg badge-light rounded-sm'>
			<ClockIcon className='text-svg' />
			{i18n.t('score.time')}:
			<Timer
				timeUnits={timeUnitsRef.current}
				units='abbr'
				separator={false}
				className='flex gap-1 font-black text-secondary'
			/>
		</div>
	);
};
export default Time;
