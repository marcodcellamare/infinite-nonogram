import { BabyIcon, BrainIcon, GraduationCapIcon } from 'lucide-react';

import { DifficultyTypes } from '!/types/settings';

interface DifficultyIconProps {
	difficulty: DifficultyTypes;
	className?: string;
}

const DifficultyIcon = ({
	difficulty,
	className = '',
}: DifficultyIconProps) => {
	const icons = {
		easy: <BabyIcon className={`lucide-text ${className}`.trim()} />,
		medium: (
			<GraduationCapIcon className={`lucide-text ${className}`.trim()} />
		),
		hard: <BrainIcon className={`lucide-text ${className}`.trim()} />,
	};

	return icons[difficulty];
};
export default DifficultyIcon;
