import { useState } from 'react';
import Wrapper from './Wrapper';

import Config from '!config';

const Drawer = () => {
	const [show, setShow] = useState(true);

	return (
		<>
			<Wrapper show={show} />
			<input
				id={Config.drawer}
				type='checkbox'
				className='drawer-toggle'
				hidden
				checked={show}
				onChange={(e) => setShow(e.target.checked)}
			/>
		</>
	);
};
export default Drawer;
