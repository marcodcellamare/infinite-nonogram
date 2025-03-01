import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import Config from '!config';

const useFormatNumber = () => {
	const { i18n } = useTranslation();

	const init = useCallback(
		(opts?: Intl.NumberFormatOptions): Intl.NumberFormat => {
			try {
				return new Intl.NumberFormat(i18n.language, opts);
			} catch (error) {
				console.error(error);

				return new Intl.NumberFormat(
					Config.locale.allowed.default,
					opts
				);
			}
		},
		[i18n.language]
	);

	const number = (number?: number, maxDigits?: number): string => {
		return init({
			style: 'decimal',
			minimumFractionDigits: 0,
			maximumFractionDigits: maxDigits ?? 0,
		}).format(number ?? 0);
	};

	const percentage = (number?: number, maxDigits?: number): string => {
		return init({
			style: 'percent',
			minimumFractionDigits: 0,
			maximumFractionDigits: maxDigits ?? 0,
		}).format(number ?? 0);
	};

	return { number, percentage };
};
export default useFormatNumber;
