import { useState } from 'react';
import { useSettings } from '!/contexts/settings';
import classNames from 'classnames';

import { RefreshCcwIcon } from 'lucide-react';

const Refresh = () => {
	const { isRefreshing, setSeed, showEffects } = useSettings();
	const [isSpinning, setIsSpinning] = useState(false);

	return (
		<button
			type='button'
			className={classNames([
				'btn btn-sm btn-outline btn-circle',
				!isSpinning ? 'btn-accent' : '!bg-secondary text-white',
			])}
			disabled={isRefreshing || isSpinning}
			onClick={() => {
				if (!isRefreshing && !isSpinning) {
					setSeed();
					if (showEffects) setIsSpinning(true);
				}
			}}>
			<RefreshCcwIcon
				className={classNames([
					'text-svg-inline text-xl pointer-events-none',
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
