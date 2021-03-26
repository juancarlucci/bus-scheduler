import React from "react";
import { Switch, Route } from 'react-router-dom';

//Components
import Home from './components/MainView/pages/Home/Home';
import BusScheduler from './components/MainView/pages/BusScheduler/BusScheduler';

const Routes = () => {
    return (
        <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/bus' component={BusScheduler} />
        </Switch>
)


};

export default Routes;