import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import useClipboard from '!/hooks/useClipboard';
import classNames from 'classnames';

import { CheckIcon, CopyIcon } from 'lucide-react';

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
			className={classNames([
				'btn flex-1',
				!copied ? 'btn-outline btn-primary' : 'btn-accent',
			])}
			onClick={handleClick}>
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
