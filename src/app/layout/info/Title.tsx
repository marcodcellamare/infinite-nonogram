import { useTranslation } from 'react-i18next';

const Title = () => {
	const { i18n } = useTranslation();

	return (
		<div className='prose'>
			<h1>{i18n.t('title')}</h1>
		</div>
	);
};
export default Title;
