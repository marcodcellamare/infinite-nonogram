import { ReactNode } from 'react';
import classNames from 'classnames';
import { useSettings } from '!/contexts/settings';

interface ContainerProps {
	show: boolean;
	label?: string;
	children: ReactNode;
}

const Container = ({ show, label, children }: ContainerProps) => {
	const { showEffects } = useSettings();

	return (
		<div
			className={classNames([
				'relative text-primary bg-white p-5 md:p-10 inline-block',
				'rounded-lg shadow-lg shadow-primary/20',
				{
					'transition-[margin-right] duration-300': showEffects,
					'-me-10 md:-me-25': show,
				},
			])}>
			{children}
			{label ? (
				<div className='absolute left-5 md:left-10 top-0 -translate-y-1/2 badge badge-secondary'>
					{label}
				</div>
			) : null}
		</div>
	);
};
export default Container;
