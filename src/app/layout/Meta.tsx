import { useEffect } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { useTranslation } from 'react-i18next';
import { useSettings } from '!/contexts/settings/hook';
import useCSSVariable from '!/hooks/useCSSVariable';

import { InfinityIcon } from 'lucide-react';

import pkg from '!package';

const Meta = () => {
	const { i18n } = useTranslation();
	const { seed, rows, cols, difficulty } = useSettings();

	useEffect(() => {
		document.documentElement.setAttribute('lang', i18n.language);
	}, [i18n.language]);

	return (
		<>
			<title>{`${i18n.t('title')} v${
				pkg.version
			} | ${cols}x${rows} ${i18n.t(
				`difficulties.${difficulty}`
			)} - ${seed}`}</title>
			<meta
				name='description'
				content={i18n.t('description', { title: i18n.t('title') })}
			/>
			<link
				rel='icon'
				href={`data:image/svg+xml,${renderToStaticMarkup(
					<InfinityIcon
						size={24}
						color={encodeURIComponent(
							useCSSVariable('--color-primary')
						)}
					/>
				)}`}
			/>
		</>
	);
};
export default Meta;
