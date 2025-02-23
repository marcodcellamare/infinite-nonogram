import { Fragment } from 'react/jsx-runtime';

import { useTranslation } from 'react-i18next';
import { useTimer } from '!/contexts/timer/hook';

import { TimeUnit } from '!/types/timer';

const Timer = () => {
	const { i18n } = useTranslation();
	const { counter, blink } = useTimer();

	return (
		<div
			className={`bg-white/30 backdrop-blur-xs text-primary border-2 border-primary px-3 py-1 rounded-lg transition-opacity duration-500 ease-in-out${
				!blink ? ' opacity-80' : ''
			}`}>
			<div className='flex-nowrap'>
				{Object.keys(counter).map((type) => {
					const value = counter[type as TimeUnit] ?? 0;

					return (
						<Fragment key={type}>
							<div className='countdown font-mono text-lg'>
								<span
									style={
										{
											'--value': value,
										} as React.CSSProperties
									}>
									{value}
								</span>
							</div>
							{['hours', 'minutes'].includes(type) ? (
								<span className='font-mono'>
									{blink ? ':' : ' '}
								</span>
							) : (
								''
							)}
							{['years', 'months', 'days'].includes(type) ? (
								<span className='text-xs ms-0.5 me-1'>
									{i18n.t(`timeUnits.${type}`, {
										count: value,
									})}
								</span>
							) : null}
						</Fragment>
					);
				})}
			</div>
		</div>
	);
};
export default Timer;
