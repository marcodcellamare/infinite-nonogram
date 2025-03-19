import { cloneElement, ReactElement } from 'react';
import classNames from 'classnames';

interface ItemProps {
	title: number | string;
	subTitle?: number | string;
	description: number | string | ReactElement;
	icon: ReactElement<{ className?: string }>;
	isFirst?: boolean;
	color?: string;
	className?: string;
}

const Item = ({
	title,
	subTitle,
	description,
	icon,
	isFirst,
	className,
}: ItemProps) => (
	<div
		className={classNames([
			'flex flex-row gap-1 items-center',
			'min-w-[75px] px-2 py-1 pointer-events-none',
			className,
			{
				'border-l-1 border-black/10': !isFirst,
			},
		])}>
		{cloneElement(icon, { className: 'text-svg-inline text-2xl' })}
		<span className='flex flex-col items-start'>
			<span className='text-xs leading-[1.2em]'>
				<strong>{title}</strong>
				{subTitle ? (
					<span className='text-xxs leading-[1em]'>/{subTitle}</span>
				) : null}
			</span>
			<span className='text-xxs leading-[1.2em]'>{description}</span>
		</span>
	</div>
);
export default Item;
