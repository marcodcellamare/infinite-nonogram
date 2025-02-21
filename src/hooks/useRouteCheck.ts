import { useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useEngine } from '@contexts/engine';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Config from '@config';
import { DifficultyTypes } from '@_types/engine';

const useRouteCheck = () => {
	const { i18n } = useTranslation();
	const params = useParams();
	const navigate = useNavigate();
	const location = useLocation();
	const { rows, cols, difficulty, seed } = useEngine();

	const defaultLanguage = useMemo(() => {
		return typeof i18n.options.fallbackLng === 'string'
			? i18n.options.fallbackLng
			: Config.locale.allowed.default;
	}, [i18n.options.fallbackLng]);

	const checkLanguage = useMemo(() => {
		if (
			params.language &&
			defaultLanguage &&
			!Object.keys(i18n.options.resources ?? {}).includes(params.language)
		) {
			console.warn(`"${params.language}": Language not allowed.`);
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

	const checkRows = useMemo((): number => {
		if (
			!Number.isNaN(Number(params.rows as string)) &&
			Number(params.rows as string) !== rows
		) {
			return Number(params.rows) >= Config.game.grid.min &&
				Number(params.rows) <= Config.game.grid.max
				? Number(params.rows)
				: Config.game.grid.default;
		}
		return rows;
	}, [params.rows, rows]);

	const checkCols = useMemo((): number => {
		if (
			!Number.isNaN(Number(params.cols as string)) &&
			Number(params.cols as string) !== cols
		) {
			return Number(params.cols) >= Config.game.grid.min &&
				Number(params.cols) <= Config.game.grid.max
				? Number(params.cols)
				: Config.game.grid.default;
		}
		return cols;
	}, [params.cols, cols]);

	const checkDifficulty = useMemo((): DifficultyTypes => {
		if (
			!Config.game.difficulty.list.includes(params.difficulty as string)
		) {
			console.warn(`"${params.difficulty}": Difficulty not allowed.`);
			return Config.game.difficulty.default as DifficultyTypes;
		} else if (params.difficulty !== difficulty) {
			return params.difficulty as DifficultyTypes;
		}
		return difficulty;
	}, [params.difficulty, difficulty]);

	const checkUrl = useCallback(() => {
		/*
		navigate(
			`/${checkLanguage}/${checkCols}/${checkRows}/${checkDifficulty}/${seed}`
		);
		*/
	}, [navigate, checkLanguage, checkCols, checkRows, checkDifficulty, seed]);

	const changeUrl = useCallback(() => {
		//navigate(`/game/${i18n.language}/${cols}/${rows}/${difficulty}/${seed}`);
	}, [navigate, i18n.language, cols, rows, difficulty, seed]);

	useEffect(() => {
		checkUrl();
	}, [location.pathname, checkUrl]);

	useEffect(() => {
		changeUrl();
	}, [changeUrl]);
};
export default useRouteCheck;
