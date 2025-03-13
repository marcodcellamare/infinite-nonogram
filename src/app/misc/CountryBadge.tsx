import useDisplayNames from '!/hooks/useDisplayNames';
import { useEffect, useState } from 'react';

interface CountryBadgeProps {
	country: string | null;
	className?: string;
}

const CountryBadge = ({ country, className }: CountryBadgeProps) => {
	const { isoToCountry } = useDisplayNames();

	const [countryName, setCountryName] = useState<string | null>(null);

	useEffect(() => {
		if (!country) return;

		setCountryName(isoToCountry(country));
	}, [isoToCountry, country]);

	return countryName ? (
		<span className={className}>{countryName}</span>
	) : null;
};
export default CountryBadge;
