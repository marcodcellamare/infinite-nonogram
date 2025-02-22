import { useTranslation } from 'react-i18next';
import { useInteraction } from '!/contexts/interaction';

const Auto = () => {
	const { i18n } = useTranslation();
	const { isAuto, setIsAuto } = useInteraction();

	return (
		<label
			className={`hidden md:flex gap-2 items-center text-xs font-bold cursor-pointer ${
				isAuto ? 'text-primary' : 'text-base-content'
			}`}>
			<input
				type='checkbox'
				className='toggle toggle-sm toggle-primary'
				checked={isAuto}
				onChange={(e) => setIsAuto(e.target.checked)}
			/>
			<span>{i18n.t('auto')}</span>
		</label>
	);
};
export default Auto;
