import { ReactNode } from 'react';
const MegaBadge = ({
	title,
	icon,
	bg = 'bg-white',
	color = 'text-base-content',
	badge = 'badge-primary',
	grow,
	children,
}: {
	title: string;
	icon?: ReactNode;
	bg?: string;
	color?: string;
	badge?: string;
	grow?: boolean;
	children: ReactNode;
}) => {
	return (
		<div
			className={`indicator indicator-top indicator-center flex flex-row gap-4 min-w-[5.5rem] ${bg} ${color} rounded-md px-4 py-3 justify-center items-center text-xl transition-[background-color,color] duration-500${
				grow ? ' grow' : ''
			}`}>
			<div className='flex flex-row flex-nowrap gap-2 '>{children}</div>
			<div
				className={`indicator-item badge badge-sm ${badge} rounded-full shadow`}>
				{icon}
				{title}
			</div>
		</div>
	);
};
export default MegaBadge;
