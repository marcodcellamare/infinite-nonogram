import Avatar from '!/app/info/Avatar';

interface PlayerAvatarProps {
	rank: number;
	name: string;
	country?: string | null;
}

const PlayerAvatar = ({ rank, name, country = null }: PlayerAvatarProps) =>
	rank < 10 ? (
		<div
			className={`justify-self-center ${
				rank === 0
					? 'w-[2.8rem] md:w-[3.5rem]'
					: 'w-[2.1rem] md:w-[2.8rem]'
			}`}>
			<Avatar
				name={name}
				country={country}
				className='w-full'
			/>
		</div>
	) : null;
export default PlayerAvatar;
