import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSettings } from '!/contexts/settings/hook';

import { Check, RefreshCcw } from 'lucide-react';

const Seed = () => {
	const inputRef = useRef<HTMLInputElement>(null);
	const { i18n } = useTranslation();
	const { seed, setSeed } = useSettings();
	const [value, setValue] = useState('');
	const [spin, setSpin] = useState(false);

	const handleSubmit = useCallback(
		(e: FormEvent) => {
			setSeed(value);

			e.preventDefault();
			inputRef.current?.blur();
		},
		[value, setSeed]
	);

	useEffect(() => {
		setValue(seed);
	}, [seed]);

	return (
		<form
			className='flex flex-row md:flex-col xl:flex-row gap-1'
			onSubmit={handleSubmit}>
			<label className='input input-primary w-full'>
				<strong className='text-primary'>{i18n.t('seed')}</strong>
				<input
					ref={inputRef}
					type='text'
					value={value}
					onChange={(e) => setValue(e.target.value)}
					onFocus={() => setValue('')}
					onBlur={(e) => {
						if (e.target.value.trim().length === 0) {
							setValue(seed);
						}
					}}
				/>
				<button
					type='button'
					className={`cursor-pointer transition-[color] duration-400 ${
						!spin
							? 'text-primary hover:text-primary/50'
							: 'text-accent'
					}`}
					onClick={() => {
						setSeed();
						setSpin(true);
					}}
					onTransitionEnd={() => {
						setSpin(false);
					}}>
					<RefreshCcw
						className={`w-full pointer-events-none duration-500 ${
							!spin
								? 'transition-none rotate-0'
								: 'transition-[rotate] -rotate-360'
						}`}
					/>
				</button>
			</label>
			<button
				type='submit'
				className='btn btn-primary'
				disabled={value.length === 0 || value === seed}>
				<Check className='w-full' />
			</button>
		</form>
	);
};
export default Seed;
