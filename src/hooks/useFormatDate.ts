import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import Config from '@config';

const useFormatDate = () => {
	const { i18n } = useTranslation();

	const init = (date?: Date | string): Date => {
		return date ? new Date(date) : new Date();
	};

	const format = useCallback(
		(date?: Date | string, opts?: Intl.DateTimeFormatOptions): string => {
			try {
				return init(date).toLocaleDateString(i18n.language, opts);
			} catch (error) {
				console.error(error);

				return init(date).toLocaleDateString(
					Config.locale.allowed.default,
					opts
				);
			}
		},
		[i18n.language]
	);

	const date = (date?: Date | string): string => {
		return format(date, {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
		});
	};

	const textDate = (date?: Date | string): string => {
		return format(date, {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
	};

	const textDateShort = (date?: Date | string): string => {
		return format(date, {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		});
	};

	const datetime = (date?: Date | string): string => {
		return format(date, {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
		}).replace(', ', ' ');
	};

	const textDatetime = (date?: Date | string): string => {
		return format(date, {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
		}).replace(', ', ' ');
	};

	const textDatetimeShort = (date?: Date | string): string => {
		return format(date, {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
		}).replace(', ', ' ');
	};

	return {
		format,
		date,
		textDate,
		textDateShort,
		datetime,
		textDatetime,
		textDatetimeShort,
	};
};
export default useFormatDate;
