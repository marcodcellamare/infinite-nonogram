import { rgb, oklch } from 'culori';

import { RGB } from '!/types/settings';

const clamp = (value: number): number => {
	return Math.round(Math.max(0, Math.min(255, value)));
};

export const isOkLCH = (color: string): boolean => {
	return /^oklch\(([\d.]+)%?\s+([\d.]+)\s+([\d.]+)\)$/.test(color);
};

export const isRgb = (color: string): boolean => {
	return /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/.test(color);
};

export const isHex = (color: string): boolean => {
	return /^#[0-9A-Fa-f]{3,6}$/.test(color);
};

export const colorToRgb = (color: string): RGB => {
	let r = 0;
	let g = 0;
	let b = 0;

	if (isOkLCH(color)) {
		const match = color.match(
			/^oklch\(([\d.]+)%?\s+([\d.]+)\s+([\d.]+)\)$/
		);
		if (match && match[1] && match[2] && match[3]) {
			let l = parseFloat(match[1]); // Lightness
			const c = parseFloat(match[2]); // Chroma
			const h = parseFloat(match[3]); // Hue

			// Convert lightness to fraction if it's a percentage
			if (color.includes('%')) {
				l = l / 100;
			}

			const oklchColor = oklch({ mode: 'oklch', l, c, h });
			const rgbColor = rgb(oklchColor);

			if (rgbColor) {
				r = rgbColor.r * 255;
				g = rgbColor.g * 255;
				b = rgbColor.b * 255;
			}
		} else {
			console.error('Invalid OKLCH format:', color);
		}
	} else if (isRgb(color)) {
		const matches = color.match(
			/^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/
		);
		if (matches) {
			r = Number(matches[1]);
			g = Number(matches[2]);
			b = Number(matches[3]);
		}
	} else if (isHex(color)) {
		const rgbColor = rgb(color);

		if (rgbColor) {
			r = rgbColor.r * 255;
			g = rgbColor.g * 255;
			b = rgbColor.b * 255;
		}
	}
	return [clamp(r), clamp(g), clamp(b)];
};
