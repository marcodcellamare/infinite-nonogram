import { useSettings } from '@/contexts/settings/hook';

import {
	CloudOff,
	CloudUploadIcon,
	LocateIcon,
	LocateOffIcon,
	MouseIcon,
	MouseOffIcon,
	SparkleIcon,
	SparklesIcon,
	Volume2Icon,
	VolumeOffIcon,
} from 'lucide-react';

const Preferences = () => {
	const {
		isMusicOn,
		showEffects,
		isAuto,
		showIntersections,
		isLeaderboardOn,
	} = useSettings();

	return (
		<div className='flex flex-col gap-1.5 px-1.5 py-3 bg-base-200/50 text-svg text-sm text-base-content/30 rounded-full backdrop-blur-xs'>
			{isMusicOn ? (
				<Volume2Icon className='text-secondary' />
			) : (
				<VolumeOffIcon />
			)}
			{showEffects ? (
				<SparklesIcon className='text-secondary' />
			) : (
				<SparkleIcon />
			)}
			{isAuto ? (
				<MouseIcon className='text-secondary' />
			) : (
				<MouseOffIcon />
			)}
			{showIntersections ? (
				<LocateIcon className='text-secondary' />
			) : (
				<LocateOffIcon />
			)}
			{isLeaderboardOn ? (
				<CloudUploadIcon className='text-secondary' />
			) : (
				<CloudOff />
			)}
		</div>
	);
};
export default Preferences;
