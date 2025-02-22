import { Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Main from '!/app/layout/Main';
import Game from '!/app/pages/Game';
import Config from '!config';

const Router = () => {
	const { i18n } = useTranslation();

	return (
		<Routes>
			<Route element={<Main />}>
				<Route
					path='/:language/game/:cols/:rows/:difficulty/:seed'
					index
					element={<Game />}
				/>
				<Route
					path='/:language/about'
					element={<div>About</div>}
				/>
				<Route
					path='*'
					element={
						<Navigate
							to={`/${i18n.language}/${Config.pages.default}`}
							replace
						/>
					}
				/>
			</Route>
		</Routes>
	);
};
export default Router;
