import { Route, Switch } from 'react-router';
import React, { FC } from 'react';
import { AirplaneDetailPage, AirplaneListPage } from '../pages';

export const Routes: FC = () => {
  return (
    <Switch>
      <Route path="/airplane/:airplaneId">
        <AirplaneDetailPage />
      </Route>
      <Route path="/" exact>
        <AirplaneListPage />
      </Route>
    </Switch>
  );
};
