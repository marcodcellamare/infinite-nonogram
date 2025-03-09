import { useSettings } from '!/contexts/settings';

import '!/styles/components/GridHintSize.css';
import { ArrowDown, ArrowRight } from 'lucide-react';

const Size = () => {
	const { cols, rows } = useSettings();

	return (
		<div className='game-grid-hint-size flex flex-1 items-end justify-end font-bold text-white leading-[1.3em]'>
			<div className='flex items-end group'>
				<div className='relative'>
					<span className='transition-[opacity,filter] duration-500 group-hover:opacity-80 group-hover:blur-[0.2rem]'>
						{cols}
					</span>
					<ArrowRight className='lucide-text absolute top-1/2 left-1/2 -translate-1/2 text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100' />
				</div>
				<div>×</div>
				<div className='relative'>
					<span className='transition-[opacity,filter] duration-500 group-hover:opacity-80 group-hover:blur-[0.2rem]'>
						{rows}
					</span>
					<ArrowDown className='lucide-text absolute top-1/2 left-1/2 -translate-1/2 text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100' />
				</div>
			</div>
		</div>
	);
};
export default Size;
