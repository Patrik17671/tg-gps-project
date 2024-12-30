import {FC, Suspense, lazy} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserProvider from './components/UserContext';
import { CssBaseline, CircularProgress  } from '@mui/material';

const LoginForm = lazy(() => import('./components/LoginForm'));
const UserDetail = lazy(() => import('./components/UserDetail'));


const App: FC = () => {
	return (
		<UserProvider>
			<CssBaseline />
			<Router>
				<Suspense
					fallback={
						<div style={{ display: 'flex', justifyContent: 'center', marginTop: '20%' }}>
							<CircularProgress />
						</div>
					}
				>
					<Switch>
						<Route path="/" exact component={LoginForm} />
						<Route path="/user-detail" component={UserDetail} />
					</Switch>
				</Suspense>
			</Router>
		</UserProvider>
	);
};

export default App;
