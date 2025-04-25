import { useSettings } from '!/contexts/settings';
import classNames from 'classnames';

const Highlight = ({ isTarget }: { isTarget?: boolean }) => {
	const { showIntersections } = useSettings();

	if (!showIntersections) return;

	return (
		<div
			className={classNames([
				'absolute top-0 bottom-0 left-0 right-0 pointer-events-none',
				{
					'bg-secondary/10': !isTarget,
					'border-2 border-secondary': isTarget,
				},
			])}
		/>
	);
};
export default Highlight;
