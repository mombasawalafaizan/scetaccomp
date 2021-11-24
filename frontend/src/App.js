import './App.css';
import Home from './Home';
import Profile from './Profile';
import Azure from './Azure';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
	return (
		<div className='App'>
			<Router>
				<div className='content'>
					<Switch>
						<Route exact path='/'>
							<Home />
						</Route>
						<Route path='/check'>
							<Profile />
						</Route>
						<Route path='/uploadToAzure'>
							<Azure />
						</Route>
					</Switch>
				</div>
			</Router>
		</div>
	);
}

export default App;
