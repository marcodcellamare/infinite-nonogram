import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { SettingsContext } from './context';

import { cleanUser, cleanSeed, generateUser, storageName } from '!/utils/misc';
import { v4 as uuidv4 } from 'uuid';
import Config from '!config';

import { DifficultyTypes } from '!/types/settings';

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState('');
	const [seed, setSeed] = useState(cleanSeed(uuidv4()));
	const [difficulty, setDifficulty] = useState<DifficultyTypes>('medium');
	const [rows, setRows] = useState(5);
	const [cols, setCols] = useState(5);

	const gatedSetUser = useCallback((user?: string) => {
		if (!user) user = generateUser();

		user = cleanUser(user);

		setUser(user);
		localStorage.setItem(storageName('user'), user);
	}, []);

	const gatedSetSeed = useCallback((seed?: string) => {
		if (!seed) seed = uuidv4();

		setSeed(cleanSeed(seed));
	}, []);

	const gatedSetDifficulty = useCallback((difficulty: string = 'medium') => {
		if (!Object.keys(Config.game.difficulty.list).includes(difficulty))
			difficulty = Config.game.difficulty.default;

		setDifficulty(difficulty as DifficultyTypes);
	}, []);

	const gatedSetRows = useCallback((rows: number) => {
		setRows(
			rows >= Config.game.grid.min && rows <= Config.game.grid.max
				? rows
				: Config.game.grid.default
		);
	}, []);

	const gatedSetCols = useCallback((cols: number) => {
		setCols(
			cols >= Config.game.grid.min && cols <= Config.game.grid.max
				? cols
				: Config.game.grid.default
		);
	}, []);

	const probability = useMemo((): number => {
		return (
			Config.game.difficulty.list[difficulty] ??
			Config.game.difficulty.list[
				Config.game.difficulty.default as DifficultyTypes
			]
		);
	}, [difficulty]);

	useEffect(() => {
		const user = localStorage.getItem(storageName('user'));

		gatedSetUser(user ?? undefined);
	}, [gatedSetUser]);

	return (
		<SettingsContext.Provider
			value={{
				user,
				seed,
				difficulty,
				probability,
				rows,
				cols,

				setUser: gatedSetUser,
				setSeed: gatedSetSeed,
				setDifficulty: gatedSetDifficulty,
				setRows: gatedSetRows,
				setCols: gatedSetCols,
			}}>
			{children}
		</SettingsContext.Provider>
	);
};
