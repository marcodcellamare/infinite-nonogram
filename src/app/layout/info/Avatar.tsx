import useCSSVariable from '@hooks/useCSSVariable';
import { useEngine } from '@contexts/engine';
import BoringAvatar from 'boring-avatars';

interface AvatarProps {
	variant: 'marble' | 'beam' | 'sunset' | 'pixel' | 'ring';
	className?: string;
}

const Avatar = ({ variant = 'beam', className = '' }: AvatarProps) => {
	const cssVariable = useCSSVariable();
	const { name } = useEngine();

	return (
		<BoringAvatar
			name={name}
			variant={variant}
			colors={[
				cssVariable('--color-primary'),
				cssVariable('--color-accent'),
				cssVariable('--color-base-content'),
				cssVariable('--color-secondary'),
				cssVariable('--color-info'),
			]}
			className={className}
		/>
	);
};
export default Avatar;
