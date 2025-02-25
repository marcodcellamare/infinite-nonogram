import { useEngine } from '!/contexts/engine';
import { useSettings } from '!/contexts/settings/hook';
import { useTranslation } from 'react-i18next';

const Status = () => {
	const { i18n } = useTranslation();
	const { totalAvailable, totalFound, totalErrors } = useEngine();
	const { rows, cols } = useSettings();

	return (
		<div className='grid grid-cols-3 gap-1 grow text-xs text-center'>
			<div className='indicator w-full'>
				<div
					className={`grow bg-primary text-white rounded py-1 px-2${
						totalAvailable === 0 ? ' opacity-30' : ''
					}`}>
					<p>{i18n.t('status.total')}</p>
					<p className='font-bold'>{totalAvailable}</p>
				</div>
				<span className='indicator-item badge badge-xs badge-base-content'>
					<strong>{rows * cols}</strong>
				</span>
			</div>
			<div
				className={`bg-accent text-base-content rounded py-1 px-2${
					totalFound === 0 ? ' opacity-30' : ''
				}`}>
				<p>{i18n.t('status.found')}</p>
				<p className='font-bold'>{totalFound}</p>
			</div>
			<div
				className={`bg-error text-base-content rounded py-1 px-2${
					totalErrors === 0 ? ' opacity-30' : ''
				}`}>
				<p>{i18n.t('status.errors')}</p>
				<p className='font-bold'>{totalErrors}</p>
			</div>
		</div>
	);
};
export default Status;
