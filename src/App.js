import { Route, Switch } from 'react-router-dom';
import DetailsPage from './pages/DetailsPage';
import FavoriteDrinksPage from './pages/FavoriteDrinksPage';
import HomePage from './pages/HomePage';
import './App.css'
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import EditPage from './pages/EditPage';

function App() {
  return (
    <div>
        <Switch>
          <Route exact path="/" component={ HomePage }/>
          <Route path="/login" component={ LoginPage } />
          <Route path="/register" component={ RegisterPage } />
          <Route path="/details/:id" component={ DetailsPage } />
          <Route path="/favorite" component={ FavoriteDrinksPage } />
          <Route path="/edit/:id" component={ EditPage } />
        </Switch>
    </div>
  );
}

export default App;
