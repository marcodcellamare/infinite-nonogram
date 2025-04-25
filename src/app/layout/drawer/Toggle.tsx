import { ReactNode } from 'react';
import classNames from 'classnames';
import Config from '!config';

interface ToggleProps {
	className?: string;
	title?: string;
	children?: ReactNode;
	onOver?: () => void;
	onOut?: () => void;
	onClick?: () => void;
}

const Toggle = ({
	className = '',
	title,
	children,
	onOver = () => {},
	onOut = () => {},
	onClick = () => {},
}: ToggleProps) => (
	<label
		htmlFor={Config.drawer}
		className={classNames(['pointer-events-auto', className])}
		title={title}
		onPointerEnter={onOver}
		onPointerLeave={onOut}
		onClick={onClick}>
		{children}
	</label>
);
export default Toggle;
