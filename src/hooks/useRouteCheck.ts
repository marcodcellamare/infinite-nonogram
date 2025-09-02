import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSettings } from '@/contexts/settings/hook';
import { useFirebase } from '@/contexts/firebase';

import Config from '@config';

import { DifficultyTypes } from '@/types/settings';

const useRouteCheck = () => {
	const { i18n } = useTranslation();
	const params = useParams();
	const navigate = useNavigate();
	const { logEvent } = useFirebase();
	const location = useLocation();
	const {
		rows,
		cols,
		difficulty,
		seed,
		setRows,
		setCols,
		setDifficulty,
		setSeed,
	} = useSettings();

	const isUpdatingRef = useRef(false);

	const pageId = useMemo(
		(): string => location.pathname.split('/')[2] ?? Config.pages.default,
		[location.pathname]
	);

	const defaultLanguage = useMemo(
		() =>
			typeof i18n.options.fallbackLng === 'string'
				? i18n.options.fallbackLng
				: Config.locale.allowed.default,
		[i18n.options.fallbackLng]
	);

	const checkLanguage = useMemo(() => {
		if (
			params.language &&
			defaultLanguage &&
			!Object.keys(i18n.options.resources ?? {}).includes(params.language)
		) {
			console.info(`"${params.language}": Language not allowed.`);
			return defaultLanguage;
		} else if (params.language && i18n.language !== params.language) {
			return i18n.language;
		}
		return Config.locale.allowed.default;
	}, [
		i18n.options.resources,
		i18n.language,
		params.language,
		defaultLanguage,
	]);

	const checkLines = useCallback(
		(line: number, paramLine: number): number => {
			if (!Number.isNaN(paramLine) && paramLine !== line) {
				return paramLine >= Config.game.grid.min &&
					paramLine <= Config.game.grid.max
					? paramLine
					: Config.game.grid.default;
			}
			return line;
		},
		[]
	);

	const checkDifficulty = useMemo((): DifficultyTypes => {
		if (
			!Object.keys(Config.game.difficulty.list).includes(
				params.difficulty as string
			)
		) {
			console.info(`"${params.difficulty}": Difficulty not allowed.`);
			return Config.game.difficulty.default as DifficultyTypes;
		} else if (params.difficulty !== difficulty) {
			return params.difficulty as DifficultyTypes;
		}
		return difficulty;
	}, [params.difficulty, difficulty]);

	const checkSeed = useMemo((): string => {
		return params.seed || seed;
	}, [params.seed, seed]);

	const checkUrl = useCallback(() => {
		if (isUpdatingRef.current) return;

		i18n.changeLanguage(checkLanguage);

		if (pageId === Config.pages.default) {
			const checkRows = checkLines(rows, Number(params.rows));
			const checkCols = checkLines(cols, Number(params.cols));

			if (rows !== checkRows) setRows(checkRows);
			if (cols !== checkCols) setCols(checkCols);
			if (difficulty !== checkDifficulty) setDifficulty(checkDifficulty);
			if (seed !== checkSeed) setSeed(checkSeed);
		}
	}, [
		i18n,
		pageId,
		checkLanguage,
		checkLines,
		checkDifficulty,
		checkSeed,
		params.rows,
		params.cols,
		rows,
		cols,
		difficulty,
		seed,
		setRows,
		setCols,
		setDifficulty,
		setSeed,
	]);

	const updateUrl = useCallback(() => {
		isUpdatingRef.current = true;

		if (pageId === Config.pages.default) {
			navigate(
				`/${i18n.language}/${pageId}/${cols}/${rows}/${difficulty}/${seed}`,
				{ replace: false }
			);
		} else {
			navigate(`/${i18n.language}/${pageId}`, { replace: true });
		}
	}, [navigate, pageId, i18n.language, cols, rows, difficulty, seed]);

	useEffect(() => {
		logEvent('page_view', {
			page_location: window.location.href,
			page_path: location.pathname,
			page_title: document.title,
		});
	}, [logEvent, location.pathname]);
	useEffect(checkUrl, [checkUrl]);
	useEffect(updateUrl, [updateUrl]);
};
export default useRouteCheck;
