import { useTranslation } from 'react-i18next';

const Timer = () => {
	const { i18n } = useTranslation();

	return (
		<span className='countdown font-mono text-2xl text-accent'>
			<span style={{ '--value': 10 } as React.CSSProperties}>10</span>:
			<span style={{ '--value': 24 } as React.CSSProperties}>24</span>:
			<span style={{ '--value': 59 } as React.CSSProperties}>59</span>
		</span>
	);
};
export default Timer;
