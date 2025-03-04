import { ReactNode } from 'react';
import Config from '!config';

interface DrawerToggleProps {
	className?: string;
	children?: ReactNode;
	onOver?: () => void;
	onOut?: () => void;
}

const DrawerToggle = ({
	className = '',
	children,
	onOver = () => {},
	onOut = () => {},
}: DrawerToggleProps) => {
	return (
		<label
			htmlFor={Config.drawer}
			className={`${className} pointer-events-auto`.trim()}
			onPointerOver={onOver}
			onPointerOut={onOut}>
			{children}
		</label>
	);
};
export default DrawerToggle;
