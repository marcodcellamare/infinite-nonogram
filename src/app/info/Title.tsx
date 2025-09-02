import { InfinityIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import pkg from '@package';

interface TitleProps {
	size?: 'md' | 'lg';
}

const Title = ({ size = 'md' }: TitleProps) => {
	const { t } = useTranslation();

	return (
		<h1
			className={classNames([
				'block font-black text-primary align-middle',
				size === 'md'
					? 'text-2xl max-w-[200px] leading-[0.9em]'
					: 'text-4xl max-w-[250px] leading-[0.85em]',
			])}>
			<InfinityIcon className='inline-block md:block w-[1em] h-[1em] scale-250 origin-[80%_50%] md:origin-center mr-5' />
			<span className='relative inline-block'>
				{t('title')}
				<span className='absolute top-0 left-0 -translate-1/2 badge badge-xs badge-accent'>
					v{pkg.version}
				</span>
			</span>
		</h1>
	);
};
export default Title;
