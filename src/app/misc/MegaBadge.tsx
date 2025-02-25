import { ReactNode } from 'react';
const MegaBadge = ({
	title,
	icon,
	children,
}: {
	title: string;
	icon: ReactNode;
	children: ReactNode;
}) => {
	return (
		<div className='indicator indicator-top indicator-center flex flex-row gap-4 min-w-[6rem] text-base-content text-xl bg-white rounded-md shadow px-5 py-3 justify-center items-center'>
			<div className='flex flex-row flex-nowrap gap-2'>{children}</div>
			<div className='indicator-item badge badge-sm badge-primary rounded-full'>
				{icon}
				{title}
			</div>
		</div>
	);
};
export default MegaBadge;
