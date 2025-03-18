export interface AudioContextProps {
	refSound: (name: string) => Howl;
	addSound: (name: string, src: string) => void;
	playSound: (name: string) => void;
	playMusic: (name: string, loop?: boolean) => void;
	stopMusic: () => void;
}
