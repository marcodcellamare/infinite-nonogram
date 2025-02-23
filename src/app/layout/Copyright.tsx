import { Trans, useTranslation } from 'react-i18next';

import { openExternalLink } from '!/utils/misc';

import {
	SiGithub,
	SiReact,
	SiTailwindcss,
	SiTypescript,
	SiVite,
} from 'react-icons/si';

const Copyright = () => {
	const { i18n } = useTranslation();

	return (
		<footer className='flex flex-col md:flex-row gap-1 md:gap-5 bg-base-200 text-base-content px-5 md:px-10 py-2'>
			<div className='flex-1 text-xs opacity-50'>
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
								className='link link-hover font-bold'
								rel='noopener noreferrer'
								onClick={() =>
									openExternalLink(i18n.t('footer.github'))
								}
							/>
						),
					}}
				/>
			</div>
			<div className='text-md'>
				<div className='flex flex-nowrap gap-2'>
					<button
						type='button'
						className='link decoration-0 hover:opacity-50'
						rel='noopener noreferrer'
						onClick={() =>
							openExternalLink(i18n.t('footer.repository'))
						}>
						<SiGithub />
					</button>
					<SiTypescript className='opacity-50' />
					<SiReact className='opacity-50' />
					<SiVite className='opacity-50' />
					<SiTailwindcss className='opacity-50' />
				</div>
			</div>
		</footer>
	);
};
export default Copyright;
