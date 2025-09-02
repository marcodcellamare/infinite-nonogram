import { useEffect, useState } from 'react';
import { cssVariable } from '@/utils/misc';

import { InfinityIcon } from 'lucide-react';

const Favicon = () => {
	const [href, setHref] = useState<string | null>(null);

	useEffect(() => {
		const generate = async () => {
			const { renderToStaticMarkup } = await import('react-dom/server');

			const svgString = renderToStaticMarkup(
				<InfinityIcon
					size={24}
					color={cssVariable('--color-primary')}
				/>
			);
			setHref(`data:image/svg+xml,${encodeURIComponent(svgString)}`);
		};
		generate();
	}, []);

	if (!href) return null;

	return (
		<link
			rel='icon'
			href={href}
		/>
	);
};

export default Favicon;
