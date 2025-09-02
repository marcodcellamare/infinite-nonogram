import { useState } from 'react';
import { useSettings } from '@/contexts/settings';
import { useTranslation } from 'react-i18next';
import { useAudio } from '@/contexts/audio';
import classNames from 'classnames';

import { RefreshCcwIcon } from 'lucide-react';

const Refresh = () => {
	const { t } = useTranslation();
	const { isRefreshing, setSeed, showEffects } = useSettings();
	const { play: playSound } = useAudio();

	const [isSpinning, setIsSpinning] = useState(false);

	return (
		<button
			type='button'
			className={classNames([
				'btn btn-sm btn-outline btn-circle',
				!isSpinning ? 'btn-accent' : '!bg-secondary text-white',
			])}
			aria-label={t('refresh')}
			disabled={isRefreshing || isSpinning}
			onPointerEnter={() => playSound('grid-block-over')}
			onClick={() => {
				if (!isRefreshing && !isSpinning) {
					setSeed();
					if (showEffects) setIsSpinning(true);
				}
			}}>
			<RefreshCcwIcon
				className={classNames([
					'text-svg text-xl pointer-events-none',
					{
						'duration-500': showEffects,
						'transition-[rotate] -rotate-360':
							showEffects && (isRefreshing || isSpinning),
						'transition-none rotate-0':
							!isRefreshing && !isSpinning,
					},
				])}
				onTransitionEnd={() => setIsSpinning(false)}
			/>
		</button>
	);
};
export default Refresh;
