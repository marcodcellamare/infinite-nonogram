import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSettings } from '@/contexts/settings/hook';

import Favicon from '../misc/Favicon';
import Config from '@config';

import pkg from '@package';

type CrossOrigin = 'anonymous' | 'use-credentials' | undefined;

const Meta = () => {
	const { i18n } = useTranslation();
	const { seed, rows, cols, difficulty } = useSettings();

	useEffect(
		() => document.documentElement.setAttribute('lang', i18n.language),
		[i18n.language]
	);

	return (
		<>
			<title>{`${import.meta.env.DEV ? '[DEV] ' : ''}${i18n.t(
				'title'
			)} v${pkg.version} | ${cols}x${rows} ${i18n.t(
				`difficulties.${difficulty}`
			)} - ${seed}`}</title>
			<meta
				name='description'
				content={i18n.t('description', { title: i18n.t('title') })}
			/>
			<Favicon />
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
