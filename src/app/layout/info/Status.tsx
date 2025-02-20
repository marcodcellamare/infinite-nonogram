import { useEngine } from '@contexts/engine';
import { useTranslation } from 'react-i18next';

const Status = () => {
	const { i18n } = useTranslation();
	const { total, rows, cols } = useEngine();

	return (
		<div className='grid grid-cols-3 gap-1 grow text-white text-xs text-center'>
			<div
				className={`bg-gray-500 rounded py-1 px-2 ${
					total._ === 0
						? 'opacity-30'
						: 'shadow-lg shadow-gray-500/50'
				}`}>
				<p>{i18n.t('status.total')}</p>
				<p className='font-bold'>{`${total._}/${rows * cols}`}</p>
			</div>
			<div
				className={`bg-accent rounded py-1 px-2 ${
					total.found === 0
						? 'opacity-30'
						: 'shadow-lg shadow-accent/50'
				}`}>
				<p>{i18n.t('status.found')}</p>
				<p className='font-bold'>{total.found}</p>
			</div>
			<div
				className={`bg-error rounded py-1 px-2 ${
					total.errors === 0
						? 'opacity-30'
						: 'shadow-lg shadow-error/50'
				}`}>
				<p>{i18n.t('status.errors')}</p>
				<p className='font-bold'>{total.errors}</p>
			</div>
		</div>
	);
};
export default Status;
