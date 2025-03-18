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
		easy: <BabyIcon className={`text-svg-inline ${className}`.trim()} />,
		medium: (
			<GraduationCapIcon
				className={`text-svg-inline ${className}`.trim()}
			/>
		),
		hard: <BrainIcon className={`text-svg-inline ${className}`.trim()} />,
	};

	return icons[difficulty];
};
export default DifficultyIcon;
