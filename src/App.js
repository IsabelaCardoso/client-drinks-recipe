import { Route, Switch } from 'react-router-dom';
import DrinksProvider from './context/Provider';
import DetailsPage from './pages/DetailsPage';
import FavoriteDrinksPage from './pages/FavoriteDrinksPage';
import HomePage from './pages/HomePage';
import './App.css'

function App() {
  return (
    <div>
      <DrinksProvider>
        <Switch>
          <Route exact path="/" component={ HomePage }/>
          <Route path="/details/:id" component={ DetailsPage } />
          <Route path="/favorite" component={ FavoriteDrinksPage } />
        </Switch>
      </DrinksProvider>
    </div>
  );
}

export default App;
