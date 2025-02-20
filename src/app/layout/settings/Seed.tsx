import { useCallback, useEffect, useRef, useState } from 'react';
import { Check, RefreshCcw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useEngine } from '@contexts/engine';

const Seed = () => {
	const ref = useRef<HTMLInputElement>(null);
	const { i18n } = useTranslation();
	const { seed, setSeed, cleanSeed } = useEngine();
	const [value, setValue] = useState('');

	const onSubmit = useCallback(
		(e: React.FormEvent) => {
			setSeed(value);

			e.preventDefault();
			ref.current?.blur();
		},
		[value, setSeed]
	);

	useEffect(() => {
		setValue(seed);
	}, [seed]);

	return (
		<form
			className='flex flex-row md:flex-col xl:flex-row gap-1'
			onSubmit={onSubmit}>
			<label className='input input-primary border-2 grow'>
				<strong className='text-primary'>{i18n.t('seed')}</strong>
				<input
					ref={ref}
					type='text'
					className='grow'
					value={value}
					onChange={(e) => setValue(cleanSeed(e.target.value))}
					onFocus={() => setValue('')}
					onBlur={(e) => {
						if (e.target.value.trim().length === 0) {
							setValue(seed);
						}
					}}
				/>
				<button className='cursor-pointer text-primary'>
					<RefreshCcw
						className='w-full'
						onClick={() => setValue('')}
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
