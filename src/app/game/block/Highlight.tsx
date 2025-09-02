import { useSettings } from '@/contexts/settings';
import classNames from 'classnames';

const Highlight = ({ isTarget }: { isTarget?: boolean }) => {
	const { showIntersections } = useSettings();

	if (!showIntersections) return;

	return (
		<div
			className={classNames([
				'absolute inset-0 pointer-events-none',
				{
					'bg-secondary/10': !isTarget,
					'border-2 border-secondary': isTarget,
				},
			])}
		/>
	);
};
export default Highlight;
