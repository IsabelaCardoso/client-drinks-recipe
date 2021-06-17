import { Route, Switch } from 'react-router-dom';
import DrinksProvider from './context/Provider';
import DetailsPage from './pages/DetailsPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div>
      <DrinksProvider>
        <Switch>
          <Route exact path="/" component={ HomePage }/>
          <Route path="/details/:id" component={ DetailsPage } />
        </Switch>
      </DrinksProvider>
    </div>
  );
}

export default App;
