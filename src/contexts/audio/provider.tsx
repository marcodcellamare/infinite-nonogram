import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { useSettings } from '../settings';
import { AudioContext } from './context';
import { Howl } from 'howler';

export const AudioProvider: React.FC<{ children: ReactNode }> = ({
	children,
}: {
	children: ReactNode;
}) => {
	const { isMusicOn } = useSettings();

	const [music, setMusic] = useState<Howl | null>(null);

	const soundsRef = useRef<Record<string, Howl>>({});

	const refSound = (name: string) => soundsRef.current[name];
	const addSound = (name: string, src: string) => {
		if (!soundsRef.current[name]) {
			soundsRef.current[name] = new Howl({ src: [src] });
		}
	};

	const playSound = useCallback(
		(name: string) => {
			if (isMusicOn) soundsRef.current[name]?.play();
		},
		[isMusicOn]
	);

	const playMusic = useCallback(
		(name?: string, loop: boolean = true) => {
			if (music) {
				if (!name) {
					if (isMusicOn) music.play();
				} else {
					music.stop();
				}
			}
			if (name && soundsRef.current[name]) {
				const newMusic = soundsRef.current[name];

				newMusic.loop(loop);
				if (isMusicOn) newMusic.play();

				setMusic(newMusic);
			}
		},
		[music, isMusicOn]
	);

	const stopMusic = useCallback(() => {
		if (music) {
			music.stop();
			setMusic(null);
		}
	}, [music]);

	useEffect(() => {
		if (isMusicOn) {
			playMusic();
		} else {
			stopMusic();
		}
	}, [isMusicOn, stopMusic, playMusic]);

	useEffect(() => {
		const sounds = soundsRef.current;

		return () => {
			Object.values(sounds).forEach((sound) => sound.unload());
			music?.unload();
		};
	}, [music]);

	return (
		<AudioContext.Provider
			value={{
				refSound,
				addSound,
				playSound,
				playMusic,
				stopMusic,
			}}>
			{children}
		</AudioContext.Provider>
	);
};
