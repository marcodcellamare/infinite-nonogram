import { ReactNode, useCallback, useEffect, useRef } from 'react';
import { useSettings } from '../settings';
import { AudioContext } from './context';
import { Howl, Howler } from 'howler';

export const AudioProvider: React.FC<{ children: ReactNode }> = ({
	children,
}: {
	children: ReactNode;
}) => {
	const { isMusicOn } = useSettings();

	const soundsRef = useRef<Record<string, Howl>>({});

	const ref = (name: string): Howl | null => {
		if (!soundsRef.current[name]) {
			console.warn(`The sound ${name} does not exist.`);
			return null;
		}
		return soundsRef.current[name];
	};
	const add = (name: string, src: string, volume: number = 1) => {
		if (!soundsRef.current[name])
			soundsRef.current[name] = new Howl({ src: [src], volume });
	};

	const play = useCallback(
		(name: string) => {
			const sound = ref(name);
			if (!sound || !isMusicOn) return;

			if (sound.state() === 'unloaded') {
				sound.load();

				sound.once('load', () => sound.play());
			} else if (sound.state() === 'loaded') {
				sound.play();
			}
		},
		[isMusicOn]
	);

	const volume = (name: string, volume: number) => {
		const sound = ref(name);
		if (!sound) return;

		sound.volume(Math.min(1, Math.max(0, volume)));
	};

	useEffect(() => {
		const sounds = soundsRef.current;

		return () => Object.values(sounds).forEach((sound) => sound.unload());
	}, []);

	useEffect(() => {
		const stopImmediatePropagation = (e: PointerEvent) =>
			e.stopImmediatePropagation();
		const unlock = (e: PointerEvent) => {
			stopImmediatePropagation(e);

			const ctx = Howler.ctx;

			if (ctx && ctx.state !== 'running') {
				ctx.resume().then(() =>
					console.info('🔓 The AudioContext has been unlocked.')
				);
			}
		};
		document.addEventListener('pointerdown', unlock, { once: true });
		document.addEventListener('pointerup', stopImmediatePropagation, {
			once: true,
		});

		return () => {
			document.removeEventListener('pointerdown', unlock);
			document.removeEventListener('pointerup', stopImmediatePropagation);
		};
	}, []);

	return (
		<AudioContext.Provider
			value={{
				ref,
				add,
				play,
				volume,
			}}>
			{children}
		</AudioContext.Provider>
	);
};
