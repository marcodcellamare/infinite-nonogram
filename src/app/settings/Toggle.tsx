interface ToggleProps {
	label: string;
	checked: boolean;
	onChange: (checked: boolean) => void;
}

const Toggle = ({ label, checked, onChange }: ToggleProps) => {
	return (
		<label
			className={`hidden md:flex gap-2 items-center text-xs font-bold cursor-pointer ${
				checked ? 'text-secondary' : 'text-base-300'
			}`}>
			<input
				type='checkbox'
				className='toggle toggle-sm toggle-secondary'
				checked={checked}
				onChange={(e) => onChange(e.target.checked)}
			/>
			<span>{label}</span>
		</label>
	);
};
export default Toggle;
