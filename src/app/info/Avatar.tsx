import classNames from 'classnames';
import { cssVariable } from '@/utils/misc';

import BoringAvatar from 'boring-avatars';

interface AvatarProps {
	name: string | null;
	country?: string | null;
	variant?: 'marble' | 'beam' | 'sunset' | 'pixel' | 'ring';
	className?: string;
}

const Avatar = ({
	name,
	country = null,
	variant = 'marble',
	className = '',
}: AvatarProps) => (
	<div className={classNames(['avatar relative', className])}>
		<BoringAvatar
			name={`${name || ''}${country || ''}`}
			variant={variant}
			colors={[
				cssVariable('--color-primary'),
				cssVariable('--color-secondary'),
				cssVariable('--color-accent'),
				cssVariable('--color-info'),
				cssVariable('--color-warning'),
			]}
			className='w-full'
		/>
		{country ? (
			<div className='absolute top-1/2 left-1/2 -translate-1/2 badge badge-outline badge-xs !border-base-200 !text-base-200 px-1 rounded-full text-xxs font-black'>
				{country}
			</div>
		) : null}
	</div>
);

export default Avatar;
