import { Fragment, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import { TimeUnit, TimeUnits } from '@/types/timer';

interface TimerProps {
	timeUnits: TimeUnits;
	onlyTimeUnits?: TimeUnit[];
	forceTimeUnits?: boolean;
	leadingZero?: boolean;
	units?: 'normal' | 'abbr' | false;
	separator?: 'auto' | ':' | '.' | ' ' | false;
	blink?: boolean;
	className?: string;
}

const Timer = ({
	timeUnits,
	onlyTimeUnits = [],
	forceTimeUnits = false,
	leadingZero = false,
	units = 'normal',
	separator = 'auto',
	blink = false,
	className = '',
}: TimerProps) => {
	const { t } = useTranslation();

	const timeUnitsIntersection = useMemo(
		() =>
			onlyTimeUnits.length > 0
				? Object.keys(timeUnits).filter((unit) =>
						onlyTimeUnits.includes(unit as TimeUnit)
				  )
				: Object.keys(timeUnits),

		[timeUnits, onlyTimeUnits]
	);

	return timeUnitsIntersection.length > 0 ? (
		<div className={`counter ${className}`.trim()}>
			{timeUnitsIntersection.map((unit, k) => {
				const value = timeUnits[unit as TimeUnit] ?? 0;

				return forceTimeUnits || unit === 'seconds' || value > 0 ? (
					<Fragment key={unit}>
						<div
							className={classNames([
								`counter-${unit}`,
								'text-nowrap',
							])}>
							<span className='counter-value'>
								{leadingZero ? ('0' + value).slice(-2) : value}
							</span>
							{units !== false ? (
								<span className='counter-label'>
									{units === 'abbr'
										? t(`timeUnits.${unit}`, {
												count: value,
										  })
												.toLowerCase()
												.substring(0, 1)
										: ` ${t(`timeUnits.${unit}`, {
												count: value,
										  }).toLowerCase()}`}
								</span>
							) : (
								false
							)}
							{separator !== false &&
							k < timeUnitsIntersection.length - 1 ? (
								<span
									className={classNames([
										'counter-separator',
										{ 'opacity-0': blink },
									])}>
									{separator === 'auto'
										? (units === 'normal' &&
												k <
													timeUnitsIntersection.length -
														2) ||
										  units === 'abbr' ||
										  units === false
											? ', '
											: units === 'normal'
											? ` ${t('and').toLowerCase()} `
											: null
										: separator}
								</span>
							) : null}
						</div>
					</Fragment>
				) : null;
			})}
		</div>
	) : null;
};
export default Timer;
