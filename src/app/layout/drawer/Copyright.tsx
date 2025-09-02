import { Trans, useTranslation } from 'react-i18next';
import { openExternalLink } from '@/utils/misc';

const Copyright = () => {
	const { t } = useTranslation();

	return (
		<div className='text-xs text-primary'>
			<Trans
				i18nKey='footer.copyright'
				values={{
					year: new Date().getFullYear(),
					author: t('footer.author'),
				}}
				components={{
					buttonAuthor: (
						<button
							type='button'
							className='link hover:text-accent font-bold'
							aria-label={t('footer.website')}
							onClick={() =>
								openExternalLink(t('footer.website'))
							}
						/>
					),
					buttonGitHub: (
						<button
							type='button'
							className='link hover:text-accent font-bold'
							aria-label={t('footer.github')}
							onClick={() => openExternalLink(t('footer.github'))}
						/>
					),
					buttonRepo: (
						<button
							type='button'
							className='link hover:text-accent font-bold'
							aria-label={t('footer.repository')}
							onClick={() =>
								openExternalLink(t('footer.repository'))
							}
						/>
					),
				}}
			/>
		</div>
	);
};
export default Copyright;
