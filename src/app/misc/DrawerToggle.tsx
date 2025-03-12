import { ReactNode } from 'react';
import Config from '!config';

interface DrawerToggleProps {
	className?: string;
	title?: string;
	children?: ReactNode;
	onOver?: () => void;
	onOut?: () => void;
	onClick?: () => void;
}

const DrawerToggle = ({
	className = '',
	title,
	children,
	onOver = () => {},
	onOut = () => {},
	onClick = () => {},
}: DrawerToggleProps) => (
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
export default DrawerToggle;
