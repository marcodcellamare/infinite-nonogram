import Config from '!config';

const loader = async ({ iso, ns }: { iso: string; ns: string }) => {
	let data = {};

	try {
		data = await import(`./${iso}/${ns}.json`);
	} catch (error) {
		console.error(error);
	}
	return data;
};

const resources = async () => {
	const locale: {
		[iso: string]: {
			[ns: string]: any;
		};
	} = {};

	const promises = Config.locale.allowed.list.map(async (iso: string) => {
		locale[iso] = {};

		await Promise.all(
			Config.locale.groups.list.map(async (ns: string) => {
				locale[iso][ns] = await loader({ iso, ns });
			})
		);
	});
	await Promise.all(promises);

	return locale;
};

export default resources;
