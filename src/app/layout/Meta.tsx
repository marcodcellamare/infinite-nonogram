import { renderToStaticMarkup } from 'react-dom/server';
import { useTranslation } from 'react-i18next';
import { useEngine } from '@contexts/engine';
import colors from 'tailwindcss/colors';
import { Grid } from 'lucide-react';
import pkg from '@package';

const Meta = () => {
	const { i18n } = useTranslation();
	const { seed, rows, cols, difficulty } = useEngine();

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
					<Grid
						size={24}
						color={encodeURIComponent(colors.blue[500])}
					/>
				)}`}
			/>
		</>
	);
};
export default Meta;
