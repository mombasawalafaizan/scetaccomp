import { useLocation } from 'react-router-dom';

const Home = () => {
	//   fetch('/profile')
	//     .then((response) => response.json())
	//     .then((response) => console.log(response));
	let query = new URLSearchParams(useLocation().search);
	let jwt_token = query.get('jwt');
	if (jwt_token) {
		console.log(jwt_token);
	}
	return (
		<>
			<div>HI</div>
			<a href='http://localhost:1337/auth/google'>
				<button>Login</button>
			</a>
		</>
	);
};

export default Home;
