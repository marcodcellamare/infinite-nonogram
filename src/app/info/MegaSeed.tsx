import { useSettings } from '!/contexts/settings/hook';

const MegaSeed = () => {
	const { seed } = useSettings();

	return (
		<div className='absolute top-0 bottom-0 left-0 right-0 pointer-events-none overflow-hidden'>
			<p className='absolute top-1/2 left-1/2 -translate-1/2 w-[115%] text-[25vw] sm:text-[20vw] md:text-[25vw] font-black italic leading-[0.8em] tracking-tighter text-base-300/30 break-all text-center -rotate-1 blur-md'>
				{seed}
			</p>
		</div>
	);
};
export default MegaSeed;
