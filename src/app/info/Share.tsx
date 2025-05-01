import { PointerEvent } from 'react';
import { useTranslation } from 'react-i18next';
import useClipboard from '!/hooks/useClipboard';
import { useAudio } from '!/contexts/audio';
import classNames from 'classnames';

import { CheckIcon, CopyIcon } from 'lucide-react';

const Share = () => {
	const { i18n } = useTranslation();
	const { copied, copyToClipboard } = useClipboard();
	const { play: playSound } = useAudio();

	return (
		<button
			type='button'
			className={classNames([
				'btn flex-1',
				!copied ? 'btn-outline btn-primary' : 'btn-accent',
			])}
			onPointerEnter={() => playSound('grid-block-over')}
			onPointerDown={(e: PointerEvent) => {
				e.nativeEvent.stopImmediatePropagation();
				playSound('grid-block-correct');
				copyToClipboard(window.location.href);
			}}>
			{!copied ? (
				<CopyIcon className='text-svg-inline' />
			) : (
				<CheckIcon className='text-svg-inline' />
			)}{' '}
			{i18n.t(!copied ? 'clipboard.copyUrl' : 'clipboard.copied')}
		</button>
	);
};
export default Share;
