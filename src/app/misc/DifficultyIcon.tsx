import classNames from 'classnames';

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
	className = classNames(['text-svg-inline', className]);

	return {
		easy: <BabyIcon className={className} />,
		medium: <GraduationCapIcon className={className} />,
		hard: <BrainIcon className={className} />,
	}[difficulty];
};
export default DifficultyIcon;
