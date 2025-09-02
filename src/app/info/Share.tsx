import { useTranslation } from 'react-i18next';
import useClipboard from '@/hooks/useClipboard';
import { useAudio } from '@/contexts/audio';
import classNames from 'classnames';

import { CheckIcon, CopyIcon } from 'lucide-react';

const Share = () => {
	const { t } = useTranslation();
	const { copied, copyToClipboard } = useClipboard();
	const { play: playSound } = useAudio();

	return (
		<button
			type='button'
			className={classNames([
				'btn flex-1',
				!copied ? 'btn-outline btn-primary' : 'btn-accent',
			])}
			aria-label={t('clipboard.copyUrl')}
			onPointerEnter={() => playSound('grid-block-over')}
			onClick={() => {
				playSound('grid-block-correct');
				copyToClipboard(window.location.href);
			}}>
			{!copied ? (
				<CopyIcon className='text-svg' />
			) : (
				<CheckIcon className='text-svg' />
			)}{' '}
			{t(!copied ? 'clipboard.copyUrl' : 'clipboard.copied')}
		</button>
	);
};
export default Share;
