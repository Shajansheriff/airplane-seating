import { Route, Switch } from 'react-router';
import React from 'react';
import { CreateSeatingChartPage, SeatingChartPage } from '../pages';

export const Routes = () => {
  return (
    <Switch>
      <Route path="/result">
        <SeatingChartPage />
      </Route>
      <Route path="/" exact>
        <CreateSeatingChartPage />
      </Route>
    </Switch>
  );
};
