import { Trans, useTranslation } from 'react-i18next';
import { openExternalLink } from '!/utils/misc';

import { SiGithub } from 'react-icons/si';

const Copyright = () => {
	const { i18n } = useTranslation();

	return (
		<footer className='flex flex-col md:flex-row gap-2 md:gap-5 bg-base-200 text-xs text-primary px-5 md:px-10 py-1.5'>
			<div className='flex-1'>
				<Trans
					i18nKey='footer.copyright'
					values={{
						year: new Date().getFullYear(),
						author: i18n.t('footer.author'),
					}}
					components={{
						strong: <strong />,
						button: (
							<button
								type='button'
								className='link hover:text-accent font-bold'
								onClick={() =>
									openExternalLink(i18n.t('footer.github'))
								}
							/>
						),
					}}
				/>
			</div>
			<div className='text-md'>
				<div className='flex flex-nowrap gap-0.5'>
					<button
						type='button'
						className='link hover:text-accent decoration-0'
						onClick={() =>
							openExternalLink(i18n.t('footer.repository'))
						}>
						<SiGithub className='text-svg-inline' />
					</button>
				</div>
			</div>
		</footer>
	);
};
export default Copyright;
