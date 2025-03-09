import useCSSVariable from '!/hooks/useCSSVariable';
import { useSettings } from '!/contexts/settings/hook';

import BoringAvatar from 'boring-avatars';

interface AvatarProps {
	variant: 'marble' | 'beam' | 'sunset' | 'pixel' | 'ring';
	className?: string;
}

const Avatar = ({ variant = 'beam', className = '' }: AvatarProps) => {
	const { user } = useSettings();

	return (
		<BoringAvatar
			name={user}
			variant={variant}
			colors={[
				useCSSVariable('--color-primary'),
				useCSSVariable('--color-secondary'),
				useCSSVariable('--color-accent'),
				useCSSVariable('--color-error'),
			]}
			className={className}
		/>
	);
};
export default Avatar;
