import { useEngine } from '!/contexts/engine';
import { Grid2X2, Square, SquareDashed } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Item from './Item';

const Status = ({ className = '' }: { className?: string }) => {
	const { i18n } = useTranslation();
	const {
		total,
		totalAvailable,
		totalInteractions,
		totalFound,
		totalErrors,
	} = useEngine();

	return (
		<div className={`flex flex-wrap gap-1 ${className}`.trim()}>
			<Item
				total={totalAvailable - totalFound}
				extraTotal={total - totalInteractions}
				icon={<Grid2X2 />}
				color='btn-primary'>
				<strong>{i18n.t('status.available')}</strong>/
				{i18n.t('status.total')}
			</Item>
			<Item
				total={totalFound}
				icon={<Square />}
				color='btn-accent'>
				{i18n.t('status.found')}
			</Item>
			<Item
				total={totalErrors}
				icon={<SquareDashed />}
				color='btn-error'>
				{i18n.t('status.errors')}
			</Item>
		</div>
	);
};
export default Status;
