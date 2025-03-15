import { useTranslation } from 'react-i18next';
import { useTimer } from '!/contexts/timer';

import Timer from '!/app/misc/Timer';
import { ClockIcon } from 'lucide-react';

const Time = () => {
	const { i18n } = useTranslation();
	const { timeUnits } = useTimer();

	return (
		<div>
			<ClockIcon className='lucide-text' />
			{i18n.t('score.time')}
			<Timer
				timeUnits={timeUnits}
				units='abbr'
				separator={false}
				className='flex gap-1'
			/>
		</div>
	);
};
export default Time;
