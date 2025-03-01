import { ReactNode } from 'react';
import Config from '!config';

interface DrawerToggleProps {
	className?: string;
	children?: ReactNode;
	onPointerOver?: () => void;
	onPointerOut?: () => void;
}

const DrawerToggle = ({
	className = '',
	children,
	onPointerOver = () => {},
	onPointerOut = () => {},
}: DrawerToggleProps) => {
	return (
		<label
			htmlFor={Config.drawer}
			className={`${className} pointer-events-auto`.trim()}
			onPointerOver={onPointerOver}
			onPointerOut={onPointerOut}>
			{children}
		</label>
	);
};
export default DrawerToggle;
