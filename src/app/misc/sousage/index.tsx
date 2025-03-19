import {
	Children,
	cloneElement,
	isValidElement,
	ReactNode,
	useMemo,
} from 'react';
import classNames from 'classnames';

interface SousageProps {
	className?: string;
	children?: ReactNode;
}

const Sousage = ({ className, children }: SousageProps) => {
	const wrappedChildren = useMemo(() => {
		if (!children) return null;

		return Children.map(children, (child, index) =>
			isValidElement<{ isFirst?: boolean }>(child)
				? cloneElement(child, { isFirst: index === 0 })
				: child
		);
	}, [children]);

	return (
		<div
			className={classNames([
				'btn gap-0 items-stretch h-auto p-0',
				className,
			])}>
			{wrappedChildren}
		</div>
	);
};
export default Sousage;
