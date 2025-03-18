import { ReactNode } from 'react';
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
		className={`${className} pointer-events-auto`.trim()}
		title={title}
		onPointerOver={onOver}
		onPointerOut={onOut}
		onClick={onClick}>
		{children}
	</label>
);
export default Toggle;
