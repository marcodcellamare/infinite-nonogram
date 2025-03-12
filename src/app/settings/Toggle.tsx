import { cloneElement, ReactElement, useEffect } from 'react';

interface ToggleProps {
	label: string;
	icon?: ReactElement<{ className?: string }>;
	iconOff?: ReactElement<{ className?: string }>;
	checked: boolean;
	disabled?: boolean;
	onChange: (checked: boolean) => void;
}

const Toggle = ({
	label,
	icon,
	iconOff,
	checked,
	disabled = false,
	onChange,
}: ToggleProps) => {
	const iconProps = {
		className: 'lucide-text text-lg mx-1',
	};

	useEffect(() => {
		if (disabled) onChange(false);
	}, [disabled, onChange]);

	return (
		<label
			className={`flex gap-2 items-center text-xs font-bold ${
				!disabled ? 'cursor-pointer' : 'cursor-not-allowed'
			} ${checked ? 'text-secondary' : 'text-base-content/50'}`}>
			<input
				type='checkbox'
				className='toggle toggle-sm toggle-secondary'
				checked={checked}
				disabled={disabled}
				onChange={(e) => {
					if (!disabled) onChange(e.target.checked);
				}}
			/>
			<span className={disabled ? 'opacity-50' : ''}>
				{icon ? (
					<>
						{icon && iconOff
							? checked
								? cloneElement(icon, iconProps)
								: cloneElement(iconOff, iconProps)
							: cloneElement(icon, iconProps)}{' '}
					</>
				) : null}
				{label}
			</span>
		</label>
	);
};
export default Toggle;
