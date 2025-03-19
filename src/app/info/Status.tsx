import { useTranslation } from 'react-i18next';
import { useEngine } from '!/contexts/engine';
import useFormatNumber from '!/hooks/useFormatNumber';
import classNames from 'classnames';

import Sousage from '!/app/misc/sousage';
import SousageItem from '!/app/misc/sousage/Item';
import { Grid2X2Icon, SquareIcon, SquareDashedIcon } from 'lucide-react';
import { useSettings } from '!/contexts/settings';

const Status = () => {
	const { i18n } = useTranslation();
	const { number } = useFormatNumber();
	const { showEffects } = useSettings();
	const {
		total,
		totalAvailable,
		totalInteractions,
		totalFound,
		totalErrors,
	} = useEngine();

	return (
		<Sousage className='btn-outline btn-primary'>
			<SousageItem
				title={number(totalAvailable - totalFound)}
				subTitle={number(total - totalInteractions)}
				description={
					<>
						<strong>{i18n.t('status.available')}</strong>/
						{i18n.t('status.total')}
					</>
				}
				icon={<Grid2X2Icon />}
				className='text-primary'
			/>
			<SousageItem
				title={number(totalFound)}
				description={i18n.t('status.found')}
				icon={<SquareIcon />}
				className={classNames([
					'bg-accent/10',
					totalFound > 0 ? 'text-accent' : 'text-accent/20',
					{
						'transition-[color] duration-500': showEffects,
					},
				])}
			/>
			<SousageItem
				title={number(totalErrors)}
				description={i18n.t('status.errors')}
				icon={<SquareDashedIcon />}
				className={classNames([
					'bg-error/10',
					totalErrors > 0 ? 'text-error' : 'text-error/20',
					{
						'transition-[color] duration-500': showEffects,
					},
				])}
			/>
		</Sousage>

		/*
		<div className={classNames(['flex flex-wrap gap-1', className])}>
			<Item
				total={totalAvailable - totalFound}
				extraTotal={total - totalInteractions}
				icon={<Grid2X2Icon />}
				color='btn-primary'>
				<strong>{i18n.t('status.available')}</strong>/
				{i18n.t('status.total')}
			</Item>
			<Item
				total={totalFound}
				icon={<SquareIcon />}
				color='btn-accent'>
				{i18n.t('status.found')}
			</Item>
			<Item
				total={totalErrors}
				icon={<SquareDashedIcon />}
				color='btn-error'>
				{i18n.t('status.errors')}
			</Item>
		</div>
		*/
	);
};
export default Status;
