import {
	ReactNode,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { SettingsContext } from './context';

import { cleanUser, cleanSeed, generateUser, storageName } from '!/utils/misc';
import { v4 as uuidv4 } from 'uuid';
import useGeoLocation from 'react-ipgeolocation';
import Config from '!config';

import { DifficultyTypes } from '!/types/settings';

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
	const geoLocation = useGeoLocation();

	const [isRefreshing, setIsRefreshing] = useState(false);
	const [isGlobalError, setIsGlobalError] = useState(false);
	const [user, setUser] = useState('');
	const [country, setCountry] = useState<string | null>(null);
	const [seed, setSeed] = useState(cleanSeed(uuidv4()));
	const [difficulty, setDifficulty] = useState<DifficultyTypes>('medium');
	const [rows, setRows] = useState(5);
	const [cols, setCols] = useState(5);
	const [isAuto, setIsAuto] = useState(true);
	const [showIntersections, setShowIntersections] = useState(true);
	const [showEffects, setShowEffects] = useState(true);
	const [isMusicOn, setIsMusicOn] = useState(true);

	const storage = useRef({
		user: localStorage.getItem(storageName('user')) ?? '',
		isAuto: localStorage.getItem(storageName('isAuto')) !== 'false',
		showIntersections:
			localStorage.getItem(storageName('showIntersections')) !== 'false',
		showEffects:
			localStorage.getItem(storageName('showEffects')) !== 'false',
		isMusicOn: localStorage.getItem(storageName('isMusicOn')) !== 'false',
	});

	const isRefreshingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
		null
	);
	const isGlobalErrorTimeoutRef = useRef<ReturnType<
		typeof setTimeout
	> | null>(null);

	const gatedSetIsGlobalError = useCallback((error: boolean) => {
		setIsGlobalError(
			Config.game.grid.block.disabledByError > 0 ? error : false
		);
	}, []);

	const gatedSetUser = useCallback((user?: string) => {
		if (user === undefined) user = generateUser();

		setUser(cleanUser(user));
	}, []);

	const gatedSetSeed = useCallback((seed?: string) => {
		if (seed === undefined) seed = uuidv4();

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

	const gatedSetIsAuto = useCallback((auto: boolean) => {
		setIsAuto(auto);
	}, []);

	const gatedSetShowIntersections = useCallback((intersections: boolean) => {
		setShowIntersections(intersections);
	}, []);

	const gatedSetShowEffects = useCallback((effects: boolean) => {
		setShowEffects(effects);
	}, []);

	const gatedSetIsMusicOn = useCallback((music: boolean) => {
		setIsMusicOn(music);
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

	useEffect(() => {
		if (isRefreshingTimeoutRef.current !== null)
			clearTimeout(isRefreshingTimeoutRef.current);

		setIsRefreshing(true);
		isRefreshingTimeoutRef.current = setTimeout(
			() => setIsRefreshing(false),
			300
		);

		return () => {
			if (isRefreshingTimeoutRef.current !== null)
				clearTimeout(isRefreshingTimeoutRef.current);
		};
	}, [seed, difficulty, rows, cols]);

	useEffect(() => {
		if (Config.game.grid.block.disabledByError === 0) return;

		if (isGlobalErrorTimeoutRef.current !== null)
			clearTimeout(isGlobalErrorTimeoutRef.current);

		if (isGlobalError) {
			isGlobalErrorTimeoutRef.current = setTimeout(
				() => setIsGlobalError(false),
				Config.game.grid.block.disabledByError
			);
		}
		return () => {
			if (isGlobalErrorTimeoutRef.current !== null)
				clearTimeout(isGlobalErrorTimeoutRef.current);
		};
	}, [isGlobalError, isRefreshing]);

	useEffect(() => {
		localStorage.setItem(storageName('user'), user);
	}, [user]);

	useEffect(() => {
		localStorage.setItem(storageName('isAuto'), isAuto.toString());
	}, [isAuto]);

	useEffect(() => {
		localStorage.setItem(
			storageName('showIntersections'),
			showIntersections.toString()
		);
	}, [showIntersections]);

	useEffect(() => {
		localStorage.setItem(
			storageName('showEffects'),
			showEffects.toString()
		);
		if (!showEffects) {
			document.body.classList.add('effects-off');
		} else {
			document.body.classList.remove('effects-off');
		}
	}, [showEffects]);

	useEffect(() => {
		localStorage.setItem(storageName('isMusicOn'), isMusicOn.toString());
	}, [isMusicOn]);

	useEffect(() => {
		if (!geoLocation.isLoading) {
			setCountry(!geoLocation.error ? geoLocation.country : null);
		} else {
			setCountry(null);
		}
	}, [geoLocation]);

	useEffect(() => {
		gatedSetUser(storage.current.user);
		gatedSetIsAuto(storage.current.isAuto);
		gatedSetShowIntersections(storage.current.showIntersections);
		gatedSetShowEffects(storage.current.showEffects);
		gatedSetIsMusicOn(storage.current.isMusicOn);
	}, [
		gatedSetUser,
		gatedSetIsAuto,
		gatedSetShowIntersections,
		gatedSetShowEffects,
		gatedSetIsMusicOn,
	]);

	useEffect(() => {
		document.documentElement.style.setProperty(
			'--grid-block-size',
			`${Config.game.grid.block.size}rem`
		);
		document.documentElement.style.setProperty(
			'--grid-hint-group-padding',
			`${Config.game.grid.hint.groupPadding}rem`
		);
		document.documentElement.style.setProperty(
			'--grid-hint-padding',
			`${Config.game.grid.hint.padding}rem`
		);
	}, []);

	return (
		<SettingsContext.Provider
			value={{
				isRefreshing,
				isGlobalError,
				user,
				country,
				seed,
				difficulty,
				probability,
				rows,
				cols,
				isAuto,
				showIntersections,
				showEffects,
				isMusicOn,

				setIsGlobalError: gatedSetIsGlobalError,
				setUser: gatedSetUser,
				setSeed: gatedSetSeed,
				setDifficulty: gatedSetDifficulty,
				setRows: gatedSetRows,
				setCols: gatedSetCols,
				setIsAuto: gatedSetIsAuto,
				setShowIntersections: gatedSetShowIntersections,
				setShowEffects: gatedSetShowEffects,
				setIsMusicOn: gatedSetIsMusicOn,
			}}>
			{children}
		</SettingsContext.Provider>
	);
};
