import { useEngine } from '!/contexts/engine';
import { useTranslation } from 'react-i18next';

const Status = () => {
	const { i18n } = useTranslation();
	const { totalAvailable, totalFound, totalErrors } = useEngine();

	return (
		<div className='grid grid-cols-3 gap-1 grow text-xs text-center'>
			<div
				className={`badge badge-primary${
					totalAvailable === 0 ? ' opacity-30' : ''
				} shadow-none w-full transition-opacity duration-500`}>
				{i18n.t('status.total')} <strong>{totalAvailable}</strong>
			</div>
			<div
				className={`badge badge-accent${
					totalFound === 0 ? ' opacity-30' : ''
				} shadow-none w-full transition-opacity duration-500`}>
				{i18n.t('status.found')} <strong>{totalFound}</strong>
			</div>
			<div
				className={`badge badge-error${
					totalErrors === 0 ? ' opacity-30' : ''
				} shadow-none w-full transition-opacity duration-500`}>
				{i18n.t('status.found')} <strong>{totalErrors}</strong>
			</div>
		</div>
	);
};
export default Status;
