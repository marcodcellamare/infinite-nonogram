import { Infinity as InfinityIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import pkg from '!package';

const Title = () => {
	const { i18n } = useTranslation();

	return (
		<div className='prose my-5 md:my-10'>
			<h1 className='text-primary leading-[0.9em] align-middle'>
				<InfinityIcon className='inline-block md:block w-[1em] h-[1em] scale-250 origin-[80%_50%] md:origin-center mr-5' />
				<span className='relative inline-block'>
					{i18n.t('title')}
					<span className='absolute top-0 left-0 -translate-1/2 badge badge-xs badge-accent'>
						v{pkg.version}
					</span>
				</span>
			</h1>
		</div>
	);
};
export default Title;
