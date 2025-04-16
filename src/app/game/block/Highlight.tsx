import classNames from 'classnames';

const Highlight = ({ isTarget }: { isTarget?: boolean }) => (
	<div
		className={classNames([
			'absolute top-0 bottom-0 left-0 right-0 bg-primary/10',
			{
				'border-2 border-primary/50': isTarget,
			},
		])}
	/>
);
export default Highlight;
