import { ReactNode } from 'react';

interface ContainerProps {
	show: boolean;
	label?: string;
	children: ReactNode;
}

const Container = ({ show, label, children }: ContainerProps) => (
	<div
		className={`relative text-primary bg-white p-5 md:p-10 inline-block min-w-fit rounded-lg shadow-lg shadow-primary/20 transition-[margin-right] duration-300${
			show ? ' -me-10 md:-me-25' : ''
		}`}>
		{children}
		{label ? (
			<div className='absolute left-5 md:left-10 top-0 -translate-y-1/2 badge badge-secondary'>
				{label}
			</div>
		) : null}
	</div>
);
export default Container;
