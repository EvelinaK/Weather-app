import React, { Route, Switch } from 'react-router-dom';

import HomeView from './views/HomeView';
import SearchView from './views/SearchView';
import DetailView from './views/DetailView';
import ListView from './views/ListView';
import ButtonAppBar from './components/AppBar/AppBar';

export default function App() {
  return (
    <>
      <ButtonAppBar />
      <Switch>
        <Route exact path="/" component={HomeView} />
        <Route path="/search/:weatherId" component={DetailView} />
        <Route path="/search" component={SearchView}/>
        <Route path="/weatherList/:weatherId" component={DetailView} />
        <Route path="/weatherList" component={ListView} />
        <Route path="/:weatherId" component={DetailView} />
      </Switch>
    </>
  );
}
