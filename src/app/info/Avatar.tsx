import useCSSVariable from '!/hooks/useCSSVariable';
import { useSettings } from '!/contexts/settings/hook';

import BoringAvatar from 'boring-avatars';

interface AvatarProps {
	variant: 'marble' | 'beam' | 'sunset' | 'pixel' | 'ring';
	className?: string;
}

const Avatar = ({ variant = 'beam', className = '' }: AvatarProps) => {
	const cssVariable = useCSSVariable();
	const { user } = useSettings();

	return (
		<BoringAvatar
			name={user}
			variant={variant}
			colors={[
				cssVariable('--color-primary'),
				cssVariable('--color-accent'),
				cssVariable('--color-secondary'),
				cssVariable('--color-base-300'),
			]}
			className={className}
		/>
	);
};
export default Avatar;
