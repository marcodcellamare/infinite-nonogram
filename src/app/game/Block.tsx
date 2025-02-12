import { X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

import { MouseClick } from '@interfaces/mouse';

interface Block {
	row: number;
	col: number;
	//isFilled: boolean;
	isMouseDown: MouseClick;
}

const Block = ({ row, col, isMouseDown }: Block) => {
	const [isClicked, setIsClicked] = useState<'active' | 'locked' | false>(
		false
	);
	const [isError, setIsError] = useState<boolean | null>(null);

	const isFilled = useRef(Math.random() < 0.5);

	const onInteraction = useCallback(
		(e: React.MouseEvent) => {
			console.log('onInteraction', isClicked);

			if (isClicked === false) {
				switch (isMouseDown) {
					case 'left':
						setIsClicked('active');
						break;

					case 'right':
						setIsClicked('locked');
				}
			}
			e.preventDefault();
		},
		[isMouseDown, isClicked]
	);

	const color = useCallback((): string => {
		if (isClicked !== false) {
			return isFilled.current ? 'bg-primary' : 'bg-primary-content';
		}
		return 'bg-neutral-content';
	}, [isClicked]);

	useEffect(() => {
		setIsError(
			(isClicked === 'active' && !isFilled.current) ||
				(isClicked === 'locked' && isFilled.current)
		);
	}, [isClicked]);

	return row > 0 && col > 0 ? (
		<button
			type='button'
			className={`aspect-square relative cursor-pointer ${color()}${
				isError === true ? ' border-5 border-error' : ''
			}`}
			onMouseMove={onInteraction}
			//onMouseDown={onInteraction}

			onContextMenu={(e) => e.preventDefault()}>
			{isClicked !== false && !isFilled.current ? (
				<span className='absolute top-1/2 left-1/2 -translate-1/2 w-full h-full text-white'>
					<X className='w-full h-full' />
				</span>
			) : null}
		</button>
	) : (
		<div className='aspect-square relative bg-neutral text-neutral-content'>
			{row !== 0 || col !== 0 ? (
				<span
					className={`absolute p-2 text-xs overflow-hidden break-words max-w-full max-h-full${
						row === 0
							? ' bottom-0 left-1/2 -translate-x-1/2 text-center'
							: ''
					}${
						col === 0
							? ' top-1/2 right-0 -translate-y-1/2 text-right'
							: ''
					}`}>
					{col}.{row} asdfasdfsdfgsdfgsdfgz
				</span>
			) : null}
		</div>
	);
};
export default Block;
