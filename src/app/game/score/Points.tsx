import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useEngine } from '!/contexts/engine';
import useFormatNumber from '!/hooks/useFormatNumber';

import MegaBadge from '!/app/misc/MegaBadge';
import { ListOrdered } from 'lucide-react';

const Points = () => {
	const { i18n } = useTranslation();
	const { score } = useEngine();
	const { number } = useFormatNumber();

	const scoreRef = useRef<number>(score);

	return (
		<MegaBadge
			title={i18n.t('score.points')}
			icon={<ListOrdered className='lucide-text' />}>
			<strong>{number(scoreRef.current)}</strong>
		</MegaBadge>
	);
};
export default Points;
