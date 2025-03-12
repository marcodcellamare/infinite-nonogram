import useClipboard from '!/hooks/useClipboard';
import { CheckIcon, CopyIcon } from 'lucide-react';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

const Share = () => {
	const { i18n } = useTranslation();
	const { copied, copyToClipboard } = useClipboard();

	const handleClick = useCallback(
		() => copyToClipboard(window.location.href),
		[copyToClipboard]
	);

	return (
		<button
			type='button'
			className={`flex-1 btn ${
				!copied ? 'btn-outline btn-primary' : 'btn-accent'
			}`}
			onClick={handleClick}>
			{!copied ? (
				<CopyIcon className='lucide-text' />
			) : (
				<CheckIcon className='lucide-text' />
			)}{' '}
			{i18n.t(!copied ? 'clipboard.copyUrl' : 'clipboard.copied')}
		</button>
	);
};
export default Share;
