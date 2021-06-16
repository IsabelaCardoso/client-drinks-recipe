import { Route, Switch } from 'react-router-dom';
import DetailsPage from './pages/DetailsPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ HomePage }/>
        <Route path="/details" component={ DetailsPage } />
      </Switch>
    </div>
  );
}

export default App;
