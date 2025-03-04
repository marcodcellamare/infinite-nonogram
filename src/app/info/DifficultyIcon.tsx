import { Baby, Brain, GraduationCap } from 'lucide-react';

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
		easy: <Baby className={`lucide-text ${className}`.trim()} />,
		medium: <GraduationCap className={`lucide-text ${className}`.trim()} />,
		hard: <Brain className={`lucide-text ${className}`.trim()} />,
	};

	return icons[difficulty];
};
export default DifficultyIcon;
