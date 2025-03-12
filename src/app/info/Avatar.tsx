import useCSSVariable from '!/hooks/useCSSVariable';

import BoringAvatar from 'boring-avatars';

interface AvatarProps {
	name: string;
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
	<div className={`avatar relative ${className}`.trim()}>
		<BoringAvatar
			name={name}
			variant={variant}
			colors={[
				useCSSVariable('--color-primary'),
				useCSSVariable('--color-secondary'),
				useCSSVariable('--color-accent'),
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
