import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSettings } from '@/contexts/settings/hook';
import { useAudio } from '@/contexts/audio';
import classNames from 'classnames';

import { cleanSeed } from '@/utils/misc';
import { CheckIcon, RefreshCcwIcon } from 'lucide-react';

const Seed = () => {
	const inputRef = useRef<HTMLInputElement>(null);
	const { t } = useTranslation();
	const { seed, setSeed, isRefreshing, showEffects } = useSettings();
	const { play: playSound } = useAudio();

	const [value, setValue] = useState('');
	const [isSpinning, setIsSpinning] = useState(false);

	const handleSubmit = useCallback(
		(e: FormEvent) => {
			setSeed(value);

			e.preventDefault();
			inputRef.current?.blur();
		},
		[value, setSeed]
	);

	useEffect(() => setValue(seed), [seed]);

	return (
		<form
			className='flex flex-col sm:flex-row gap-1'
			onSubmit={handleSubmit}>
			<label
				className={classNames([
					'input input-primary w-full',
					{
						'!border-primary/50': isRefreshing || isSpinning,
					},
				])}>
				<strong className='text-accent'>{t('seed')}</strong>
				<input
					ref={inputRef}
					type='text'
					value={value}
					disabled={isRefreshing || isSpinning}
					onChange={(e) => {
						playSound('grid-block-over');
						setValue(cleanSeed(e.target.value));
					}}
					onFocus={() => setValue('')}
					onBlur={(e) => {
						if (e.target.value.trim().length === 0) {
							setValue(seed);
						}
					}}
				/>
				<button
					type='button'
					className={classNames([
						'cursor-pointer',
						!isSpinning
							? 'text-accent hover:text-accent/50'
							: 'text-secondary',
						{
							'transition-[color] duration-400': showEffects,
						},
					])}
					aria-label={t('refresh')}
					onPointerEnter={() => playSound('grid-block-over')}
					onClick={() => {
						if (!isRefreshing && !isSpinning) {
							setSeed();
							setIsSpinning(true);
						}
					}}
					disabled={isSpinning}>
					<RefreshCcwIcon
						className={classNames([
							'w-full pointer-events-none',
							{
								'duration-500': showEffects,
								'transition-[rotate] -rotate-360':
									showEffects && (isRefreshing || isSpinning),
								'transition-none rotate-0':
									!isRefreshing && !isSpinning,
							},
						])}
						onTransitionEnd={() => setIsSpinning(false)}
					/>
				</button>
			</label>
			<button
				type='submit'
				className='btn btn-primary'
				disabled={value.length === 0 || value === seed}
				aria-label={t('use-this-seed')}
				onPointerEnter={() => playSound('grid-block-over')}>
				<CheckIcon className='w-full' />
			</button>
		</form>
	);
};
export default Seed;
