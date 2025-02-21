import { Fragment } from 'react/jsx-runtime';
import { useTranslation } from 'react-i18next';
import { useTimer } from '@contexts/timer/hook';

import { TimeUnit } from '@_types/timer';

const Timer = () => {
	const { i18n } = useTranslation();
	const { counter } = useTimer();

	return Object.keys(counter).length > 0 ? (
		<div className='flex bg-primary text-white px-3 py-1 rounded justify-center'>
			<div className='flex-nowrap'>
				{Object.keys(counter).map((type) => {
					const value = counter[type as TimeUnit] ?? 0;

					return ['seconds'].includes(type) || value > 0 ? (
						<Fragment key={type}>
							<div className='countdown font-mono text-xl'>
								<span
									style={
										{
											'--value': value,
										} as React.CSSProperties
									}>
									{value}
								</span>
							</div>
							{['hours', 'minutes'].includes(type) ? ':' : ''}
							{['years', 'months', 'days'].includes(type) ? (
								<span className='text-xs ms-0.5 me-1'>
									{i18n.t(`timeUnits.${type}`, {
										count: value,
									})}
								</span>
							) : null}
						</Fragment>
					) : null;
				})}
			</div>
		</div>
	) : null;
};
export default Timer;
