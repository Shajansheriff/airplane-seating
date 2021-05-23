import { Route, Switch } from 'react-router';
import React from 'react';
import { CreateSeatingChartPage } from '../pages';

export const Routes = () => {
  return (
    <Switch>
      <Route path="/">
        <CreateSeatingChartPage />
      </Route>
    </Switch>
  );
};
