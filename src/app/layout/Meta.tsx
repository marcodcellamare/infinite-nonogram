import { useEffect } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { useTranslation } from 'react-i18next';
import { useSettings } from '!/contexts/settings/hook';
import { cssVariable } from '!/utils/misc';
import Config from '!config';

import { InfinityIcon } from 'lucide-react';

import pkg from '!package';

type CrossOrigin = 'anonymous' | 'use-credentials' | undefined;

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
							cssVariable('--color-primary')
						)}
					/>
				)}`}
			/>
			{Config.preload.map((preload, k) => (
				<link
					key={k}
					rel={preload.rel}
					href={preload.href}
					crossOrigin={preload.crossorigin as CrossOrigin}
				/>
			))}
			{Config.meta.map((meta, k) => (
				<meta
					key={k}
					name={meta.name}
					httpEquiv={meta.httpEquiv}
					content={
						Array.isArray(meta.content)
							? meta.content.join('; ')
							: meta.content
					}
				/>
			))}
		</>
	);
};
export default Meta;
