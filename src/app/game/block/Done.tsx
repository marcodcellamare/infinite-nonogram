import { useState } from 'react';
import MountTransition from '!/app/misc/MountTransition';
import classNames from 'classnames';

import '!/styles/components/game/block/Done.css';

interface DoneProps {
	mountIf: boolean;
	delay: number;
}

const Done = ({ mountIf, delay }: DoneProps) => {
	const [show, setShow] = useState(true);

	return (
		<MountTransition
			mountIf={mountIf && show}
			timeout={{
				delay,
				entering: 1000,
				exiting: 0,
			}}
			onDone={() => setShow(false)}>
			{() => (
				<div
					className={classNames([
						'game-grid-block-done',
						'absolute top-0 bottom-0 left-0 right-0 pointer-events-none',
						'bg-white/70 mix-blend-overlay',
					])}
				/>
			)}
		</MountTransition>
	);
};
export default Done;
