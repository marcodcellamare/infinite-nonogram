import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useTimer } from '!/contexts/timer';

import { Clock } from 'lucide-react';

import { TimeUnit } from '!/types/timer';

const Time = () => {
	const { i18n } = useTranslation();
	const { counter } = useTimer();

	const counterRef = useRef<Partial<Record<TimeUnit, number>>>(counter);

	return (
		<div className='indicator indicator-top indicator-center flex flex-row gap-4 text-base-content text-xl bg-white rounded-md shadow px-5 py-3 items-center'>
			{Object.keys(counterRef.current).map((type) => {
				const value = counterRef.current[type as TimeUnit] ?? 0;

				return value > 0 ? (
					<div key={type}>
						<strong>{value}</strong>{' '}
						{i18n
							.t(`timeUnits.${type}`, {
								count: value,
							})
							.toLowerCase()}
					</div>
				) : null;
			})}
			<div className='indicator-item badge badge-sm badge-primary'>
				<Clock className='lucide-text' /> {i18n.t('score.time')}
			</div>
		</div>
	);
};
export default Time;
