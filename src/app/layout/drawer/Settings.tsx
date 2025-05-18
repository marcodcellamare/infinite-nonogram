import { useTranslation } from 'react-i18next';
import { useSettings } from '!/contexts/settings/hook';
import { useScale } from '!/contexts/scale';
import useFormatNumber from '!/hooks/useFormatNumber';
import useBreakpoints from '!/hooks/useBreakpoints';

import Seed from '!/app/settings/Seed';
import Difficulty from '!/app/settings/Difficulty';
import Range from '!/app/settings/Range';
import Toggle from '!/app/settings/Toggle';
import Randomize from '!/app/settings/Randomize';
import Share from '!/app/info/Share';

import Config from '!config';
import {
	ArrowBigUpIcon,
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

const Settings = () => {
	const { i18n } = useTranslation();
	const {
		rows,
		cols,
		isAuto,
		showIntersections,
		showEffects,
		isLeaderboardOn,
		isMusicOn,
		setRows,
		setCols,
		setIsAuto,
		setShowIntersections,
		setShowEffects,
		setIsLeaderboardOn,
		setIsMusicOn,
	} = useSettings();
	const { scale, setScale } = useScale();
	const { percentage } = useFormatNumber();
	const { currentBreakpoint } = useBreakpoints();

	return (
		<>
			<Seed />
			<div className='flex flex-col gap-1'>
				<Range
					label={i18n.t('size.width')}
					value={cols}
					min={Config.game.grid.min}
					max={Config.game.grid.max}
					onChange={setCols}
				/>
				<Range
					label={i18n.t('size.height')}
					value={rows}
					min={Config.game.grid.min}
					max={Config.game.grid.max}
					onChange={setRows}
				/>
			</div>
			<Difficulty />
			<Range
				label={i18n.t('scale')}
				value={scale}
				showValue={percentage(scale)}
				min={Config.game.scale.min}
				max={Config.game.scale.max}
				step={Config.game.scale.step}
				help={
					<>
						<kbd className='kbd kbd-xs'>
							<ArrowBigUpIcon className='text-svg-inline me-1' />{' '}
							shift
						</kbd>{' '}
						+ {i18n.t('scrollwheel')}
					</>
				}
				onChange={setScale}
			/>
			<div className='flex flex-wrap gap-0.5'>
				<Randomize />
				<Share />
			</div>
			<div className='flex flex-col flex-wrap gap-2'>
				<Toggle
					label={i18n.t('music')}
					icon={<Volume2Icon />}
					iconOff={<VolumeOffIcon />}
					checked={isMusicOn}
					onChange={setIsMusicOn}
				/>
				<Toggle
					label={i18n.t('effects')}
					icon={<SparklesIcon />}
					iconOff={<SparkleIcon />}
					checked={showEffects}
					onChange={setShowEffects}
				/>
				<Toggle
					label={i18n.t('auto')}
					icon={<MouseIcon />}
					iconOff={<MouseOffIcon />}
					checked={isAuto}
					disabled={['xs', 'sm'].includes(currentBreakpoint)}
					onChange={setIsAuto}
				/>
				<Toggle
					label={i18n.t('intersections')}
					icon={<LocateIcon />}
					iconOff={<LocateOffIcon />}
					checked={showIntersections}
					disabled={['xs', 'sm'].includes(currentBreakpoint)}
					onChange={setShowIntersections}
				/>
				<Toggle
					label={i18n.t('saveLeaderboard')}
					icon={<CloudUploadIcon />}
					iconOff={<CloudOff />}
					checked={isLeaderboardOn}
					onChange={setIsLeaderboardOn}
				/>
			</div>
		</>
	);
};
export default Settings;
