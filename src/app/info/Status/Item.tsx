import { cloneElement, ReactElement, ReactNode } from 'react';

interface ItemProps {
	total: number;
	extraTotal?: number;
	icon: ReactElement<{ className?: string }>;
	color: string;
	children: ReactNode;
}

const Item = ({ total, extraTotal, icon, color, children }: ItemProps) => {
	return (
		<div
			className={`btn btn-xs btn-outline ${color} flex-1 flex-row gap-0.5 items-center justify-start h-auto py-0.5 transition-opacity duration-200${
				total === 0 ? ' opacity-30' : ''
			}`}>
			{cloneElement(icon, { className: 'text-svg-inline text-2xl' })}
			<span className='flex flex-col items-start'>
				<span className='text-xs leading-[1.2em]'>
					<strong>{total}</strong>
					{extraTotal !== undefined ? (
						<span className='text-xxs leading-[1em]'>
							/{extraTotal}
						</span>
					) : null}
				</span>
				<span className='text-xxs leading-[1.2em]'>{children}</span>
			</span>
		</div>
	);
};
export default Item;
