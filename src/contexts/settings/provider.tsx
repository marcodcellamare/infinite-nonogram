import {
	ReactNode,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { SettingsContext } from './context';

import {
	cleanUser,
	cleanSeed,
	generateUser,
	storageName,
	generateSeed,
} from '!/utils/misc';
import { v4 as uuidv4 } from 'uuid';
import useGeoLocation from 'react-ipgeolocation';
import useBreakpoints from '!/hooks/useBreakpoints';

import Config from '!config';

import { DifficultyTypes } from '!/types/settings';
import { TimeoutType } from '!/types/timer';

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
	const geoLocation = useGeoLocation();
	const { currentBreakpoint } = useBreakpoints();

	const [isRefreshing, setIsRefreshing] = useState(false);
	const [isGlobalError, setIsGlobalError] = useState(false);
	const [user, setUser] = useState<string | null>(null);
	const [country, setCountry] = useState<string | null>(null);
	const [seed, setSeed] = useState(cleanSeed(uuidv4()));
	const [difficulty, setDifficulty] = useState<DifficultyTypes>('medium');
	const [rows, setRows] = useState(5);
	const [cols, setCols] = useState(5);
	const [isAuto, setIsAuto] = useState(true);
	const [showIntersections, setShowIntersections] = useState(true);
	const [showEffects, setShowEffects] = useState(true);
	const [isLeaderboardOn, setIsLeaderboardOn] = useState(true);
	const [isMusicOn, setIsMusicOn] = useState(true);
	const [isDrawerShown, setIsDrawerShown] = useState(true);

	const storage = useRef({
		user:
			(localStorage.getItem(storageName('user')) || '').trim()?.length > 0
				? localStorage.getItem(storageName('user'))
				: null,
		isAuto: localStorage.getItem(storageName('isAuto')) !== 'false',
		showIntersections:
			localStorage.getItem(storageName('showIntersections')) !== 'false',
		showEffects:
			localStorage.getItem(storageName('showEffects')) !== 'false',
		isLeaderboardOn:
			localStorage.getItem(storageName('isLeaderboardOn')) !== 'false',
		isMusicOn: localStorage.getItem(storageName('isMusicOn')) !== 'false',
	});

	const isRefreshingTimeoutRef = useRef<TimeoutType>(null);
	const isGlobalErrorTimeoutRef = useRef<TimeoutType>(null);

	const gatedSetIsGlobalError = useCallback((error: boolean) => {
		setIsGlobalError(
			Config.game.grid.block.disabledByError > 0 ? error : false
		);
	}, []);

	const gatedSetUser = useCallback((user: string | null = null) => {
		if (user === null) user = generateUser();

		setUser(cleanUser(user));
	}, []);

	const gatedSetSeed = useCallback((seed?: string) => {
		if (seed === undefined) seed = generateSeed();

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

	const memoizedSetIsAuto = useCallback(setIsAuto, [setIsAuto]);
	const memoizedSetShowIntersections = useCallback(setShowIntersections, [
		setShowIntersections,
	]);
	const memoizedSetShowEffects = useCallback(setShowEffects, [
		setShowEffects,
	]);
	const memoizedSetIsLeaderboardOn = useCallback(setIsLeaderboardOn, [
		setIsLeaderboardOn,
	]);
	const memoizedSetIsMusicOn = useCallback(setIsMusicOn, [setIsMusicOn]);
	const memoizedSetIsDrawerShown = useCallback(setIsDrawerShown, [
		setIsDrawerShown,
	]);

	const probability = useMemo((): number => {
		return (
			Config.game.difficulty.list[difficulty] ??
			Config.game.difficulty.list[
				Config.game.difficulty.default as DifficultyTypes
			]
		);
	}, [difficulty]);

	const cleanupIsRefreshing = () => {
		if (isRefreshingTimeoutRef.current !== null) {
			clearTimeout(isRefreshingTimeoutRef.current);
			isRefreshingTimeoutRef.current = null;
		}
	};

	const cleanupIsGlobalError = () => {
		if (isGlobalErrorTimeoutRef.current !== null) {
			clearTimeout(isGlobalErrorTimeoutRef.current);
			isGlobalErrorTimeoutRef.current = null;
		}
	};

	useEffect(() => {
		const user = localStorage.getItem(storageName('user'));

		gatedSetUser(user ?? undefined);
	}, [gatedSetUser]);

	useEffect(() => {
		cleanupIsRefreshing();

		setIsRefreshing(true);
		isRefreshingTimeoutRef.current = setTimeout(
			() => setIsRefreshing(false),
			500
		);
		return () => cleanupIsRefreshing();
	}, [seed, difficulty, rows, cols]);

	useEffect(() => {
		if (Config.game.grid.block.disabledByError === 0) return;

		cleanupIsGlobalError();

		if (isGlobalError) {
			isGlobalErrorTimeoutRef.current = setTimeout(
				() => setIsGlobalError(false),
				Config.game.grid.block.disabledByError
			);
		}
		return () => cleanupIsGlobalError();
	}, [isGlobalError, isRefreshing]);

	useEffect(() => {
		if (user !== null) localStorage.setItem(storageName('user'), user);
	}, [user]);

	useEffect(
		() => localStorage.setItem(storageName('isAuto'), isAuto.toString()),
		[isAuto]
	);

	useEffect(
		() =>
			localStorage.setItem(
				storageName('showIntersections'),
				showIntersections.toString()
			),
		[showIntersections]
	);

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

	useEffect(
		() =>
			localStorage.setItem(
				storageName('isMusicOn'),
				isMusicOn.toString()
			),
		[isMusicOn]
	);

	useEffect(
		() =>
			localStorage.setItem(
				storageName('isLeaderboardOn'),
				isLeaderboardOn.toString()
			),
		[isLeaderboardOn]
	);

	useEffect(
		() =>
			setCountry(
				!geoLocation.isLoading && !geoLocation.error
					? geoLocation.country
					: null
			),
		[geoLocation]
	);

	useEffect(() => {
		gatedSetUser(storage.current.user);
		memoizedSetIsAuto(storage.current.isAuto);
		memoizedSetShowIntersections(storage.current.showIntersections);
		memoizedSetShowEffects(storage.current.showEffects);
		memoizedSetIsLeaderboardOn(storage.current.isLeaderboardOn);
		memoizedSetIsMusicOn(storage.current.isMusicOn);
	}, [
		gatedSetUser,
		memoizedSetIsAuto,
		memoizedSetShowIntersections,
		memoizedSetShowEffects,
		memoizedSetIsLeaderboardOn,
		memoizedSetIsMusicOn,
	]);

	useEffect(() => {
		if (['xs', 'sm'].includes(currentBreakpoint)) {
			memoizedSetIsAuto(false);
			memoizedSetShowIntersections(false);
		}
	}, [currentBreakpoint, memoizedSetIsAuto, memoizedSetShowIntersections]);

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
				isLeaderboardOn,
				isMusicOn,
				isDrawerShown,

				setIsGlobalError: gatedSetIsGlobalError,
				setUser: gatedSetUser,
				setSeed: gatedSetSeed,
				setDifficulty: gatedSetDifficulty,
				setRows: gatedSetRows,
				setCols: gatedSetCols,
				setIsAuto: memoizedSetIsAuto,
				setShowIntersections: memoizedSetShowIntersections,
				setShowEffects: memoizedSetShowEffects,
				setIsLeaderboardOn: memoizedSetIsLeaderboardOn,
				setIsMusicOn: memoizedSetIsMusicOn,
				setIsDrawerShown: memoizedSetIsDrawerShown,
			}}>
			{children}
		</SettingsContext.Provider>
	);
};
