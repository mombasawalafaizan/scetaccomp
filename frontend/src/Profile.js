import { useEffect } from 'react';

const Profile = () => {
	useEffect(() => {
		fetch('/profile', { credentials: 'same-origin' })
			.then((res) => res.json())
			.then((resp) => console.log(resp));
		console.log('hit');
	}, []);
	return <div>Hi</div>;
};

export default Profile;
