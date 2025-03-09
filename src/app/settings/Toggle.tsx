import { useEffect } from 'react';

interface ToggleProps {
	label: string;
	checked: boolean;
	disabled?: boolean;
	onChange: (checked: boolean) => void;
}

const Toggle = ({
	label,
	checked,
	disabled = false,
	onChange,
}: ToggleProps) => {
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
			<span className={disabled ? 'opacity-50' : ''}>{label}</span>
		</label>
	);
};
export default Toggle;
