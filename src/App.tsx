import React, { FC } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Page } from './components/page';
import { Routes } from './routes';

export const App: FC = () => {
  return (
    <Router>
      <Page>
        <Routes />
      </Page>
    </Router>
  );
};
