import { Children, cloneElement, isValidElement, ReactNode } from 'react';

interface ItemProps {
	isOver: boolean;
	children: ReactNode;
}

const Icon = ({ isOver, children }: ItemProps) => {
	const defaultClassName = 'lucide-text';

	return (
		<div
			className={`indicator-item bg-accent text-white p-1.5 aspect-square rounded-full flex items-center justify-center pointer-events-none${
				isOver ? ' hover' : ''
			}`}>
			{Children.map(children, (child) =>
				isValidElement<{ className?: string }>(child)
					? cloneElement(child, {
							className: `${defaultClassName} ${
								child.props.className ?? ''
							}`.trim(),
					  })
					: child
			)}
		</div>
	);
};
export default Icon;
