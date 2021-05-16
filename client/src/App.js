import './App.css';
import Auth from './components/auth/Auth';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Details from './components/landing/Details';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const currentUser = JSON.parse(localStorage.getItem('user'));

  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Auth} />
        {currentUser && <Route exact path='/details' component={Details} />}
      </Switch>
    </Router>
  );
}

export default App;
