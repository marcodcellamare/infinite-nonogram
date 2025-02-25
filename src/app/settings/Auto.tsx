import { useTranslation } from 'react-i18next';
import { useInteraction } from '!/contexts/interaction';

const Auto = () => {
	const { i18n } = useTranslation();
	const { isAuto, setIsAuto } = useInteraction();

	return (
		<label
			className={`hidden md:flex gap-2 items-center text-xs font-bold cursor-pointer ${
				isAuto ? 'text-secondary' : 'text-base-300'
			}`}>
			<input
				type='checkbox'
				className='toggle toggle-sm toggle-secondary'
				checked={isAuto}
				onChange={(e) => setIsAuto(e.target.checked)}
			/>
			<span>{i18n.t('auto')}</span>
		</label>
	);
};
export default Auto;
