export interface AudioContextProps {
	ref: (name: string) => Howl | null;
	add: (name: string, src: string, volume?: number) => void;
	play: (name: string) => void;
	volume: (name: string, volume: number) => void;
}
