import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useEngine } from '!/contexts/engine';
import useFormatNumber from '!/hooks/useFormatNumber';

import { ListOrderedIcon } from 'lucide-react';

const Points = () => {
	const { i18n } = useTranslation();
	const { score } = useEngine();
	const { number } = useFormatNumber();

	const scoreRef = useRef(score);

	return (
		<div className='badge badge-lg badge-primary rounded-sm'>
			<ListOrderedIcon className='text-svg-inline' />
			{i18n.t('score.points')}:
			<span className='font-black text-white'>
				{number(scoreRef.current)}
			</span>
		</div>
	);
};
export default Points;
