import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { useEngine } from '!/contexts/engine';

const Points = () => {
	const { i18n } = useTranslation();
	const { advancedScore } = useEngine();

	const advancedScoreRef = useRef<number>(advancedScore);

	useEffect(() => {
		console.log('advancedScore', advancedScore);
	}, [advancedScore]);

	return (
		<div>
			{i18n.t('score.points')} {advancedScoreRef.current}
		</div>
	);
};
export default Points;
