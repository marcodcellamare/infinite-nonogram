import { useSettings } from '!/contexts/settings';
import handleClassNames from 'classnames';

import { HintNumbersProps } from '!/types/engine';

const Number = ({ total, isDone }: HintNumbersProps) => {
	const { showEffects } = useSettings();

	return (
		<div
			className={handleClassNames([
				'min-w-[1.3em] h-[1.3em] leading-[1.3em] text-center',
				{
					'transition-[color] duration-200': showEffects,
					'text-accent': isDone,
					'text-primary font-bold': !isDone,
				},
			])}>
			{total}
		</div>
	);
};
export default Number;
