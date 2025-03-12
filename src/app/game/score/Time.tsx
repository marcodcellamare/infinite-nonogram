import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useTimer } from '!/contexts/timer';

import MegaBadge from '!/app/misc/MegaBadge';
import { ClockIcon } from 'lucide-react';

import { TimeUnit } from '!/types/timer';

const Time = () => {
	const { i18n } = useTranslation();
	const { counter } = useTimer();

	const counterRef = useRef<Partial<Record<TimeUnit, number>>>(counter);

	return (
		<MegaBadge
			title={i18n.t('score.time')}
			icon={<ClockIcon className='lucide-text' />}>
			{Object.keys(counterRef.current).map((type) => {
				const value = counterRef.current[type as TimeUnit] ?? 0;

				return value > 0 ? (
					<div key={type}>
						<strong>{value}</strong>
						{i18n
							.t(`timeUnits.${type}`, {
								count: value,
							})
							.toLowerCase()
							.substring(0, 1)}
					</div>
				) : null;
			})}
		</MegaBadge>
	);
};
export default Time;
