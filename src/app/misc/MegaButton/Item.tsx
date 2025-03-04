import { ReactNode } from 'react';

interface ItemProps {
	first?: boolean;
	isOver: boolean;
	children: ReactNode;
}

const Item = ({ first = true, isOver, children }: ItemProps) => {
	return (
		<div
			className={`flex flex-col justify-center items-center pointer-events-none min-w-[75px] px-2 py-0.5${
				!first ? ' border-l-1 border-black/10' : ''
			}${isOver ? ' hover' : ''}`}>
			{children}
		</div>
	);
};
export default Item;
