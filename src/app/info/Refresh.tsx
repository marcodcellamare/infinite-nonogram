import { useSettings } from '!/contexts/settings';
import { RefreshCcwIcon } from 'lucide-react';
import { useState } from 'react';

const Refresh = () => {
	const { isRefreshing, setSeed } = useSettings();
	const [spin, setSpin] = useState(false);

	return (
		<button
			type='button'
			className={`btn btn-sm btn-outline btn-circle ${
				!spin ? 'btn-accent' : '!bg-secondary text-white'
			}`}
			disabled={isRefreshing || spin}
			onClick={() => {
				if (!isRefreshing && !spin) {
					setSeed();
					setSpin(true);
				}
			}}>
			<RefreshCcwIcon
				className={`lucide-text text-xl pointer-events-none duration-500 ${
					isRefreshing || spin
						? 'transition-[rotate] -rotate-360'
						: 'transition-none rotate-0'
				}`}
				onTransitionEnd={() => setSpin(false)}
			/>
		</button>
	);
};
export default Refresh;
