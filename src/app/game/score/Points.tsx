import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useEngine } from '@/contexts/engine';
import useFormatNumber from '@/hooks/useFormatNumber';

import { ListOrderedIcon } from 'lucide-react';

const Points = () => {
	const { t } = useTranslation();
	const { score } = useEngine();
	const { number } = useFormatNumber();

	const scoreRef = useRef(score);

	return (
		<div className='badge badge-lg badge-light rounded-sm'>
			<ListOrderedIcon className='text-svg' />
			{t('score.points')}:
			<span className='font-black text-secondary'>
				{number(scoreRef.current)}
			</span>
		</div>
	);
};
export default Points;
