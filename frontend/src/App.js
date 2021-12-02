import OrganizedEventEntry from './forms/OrganizedEventEntry';
import EventAttendedByStaff from './forms/EventAttendedByStaff';
import Innovation from './forms/Innovation';
import StudentExcellence from './forms/StudentExcellence';
import Conference from './forms/Conference';
import Login from './references/Login';
import Home from './references/Home';
import ResearchForm from './references/ResearchForm';
import { Route, Switch } from 'react-router';

function App() {
	return (
		<>
			<Switch>
				<Route exact path='/' component={Home} />
				<Route exact path='/login' component={Login} />
				<Route exact path='/research' component={ResearchForm} />
				<Route
					exact
					path='/organizedEventEntry'
					component={OrganizedEventEntry}
				/>
				<Route
					exact
					path='/EventAttendedByStaff'
					component={EventAttendedByStaff}
				/>
				<Route exact path='/Innovation' component={Innovation} />
				<Route exact path='/StudentExcellence' component={StudentExcellence} />
				<Route exact path='/Conference' component={Conference} />
				<Route exact path='/login/error'>
					<div>Login error</div>
				</Route>
			</Switch>
		</>
	);
}

export default App;
