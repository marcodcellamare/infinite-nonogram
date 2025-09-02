import { Trans, useTranslation } from 'react-i18next';
import { openExternalLink } from '@/utils/misc';

const Copyright = () => {
	const { i18n } = useTranslation();

	return (
		<div className='text-xs text-primary'>
			<Trans
				i18nKey='footer.copyright'
				values={{
					year: new Date().getFullYear(),
					author: i18n.t('footer.author'),
				}}
				components={{
					buttonAuthor: (
						<button
							type='button'
							className='link hover:text-accent font-bold'
							onClick={() =>
								openExternalLink(i18n.t('footer.website'))
							}
						/>
					),
					buttonGitHub: (
						<button
							type='button'
							className='link hover:text-accent font-bold'
							onClick={() =>
								openExternalLink(i18n.t('footer.github'))
							}
						/>
					),
					buttonRepo: (
						<button
							type='button'
							className='link hover:text-accent font-bold'
							onClick={() =>
								openExternalLink(i18n.t('footer.repository'))
							}
						/>
					),
				}}
			/>
		</div>
	);
};
export default Copyright;
