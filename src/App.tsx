import React, { FC } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AirplanesProvider } from './store';
import { Page } from './components/page';
import { Routes } from './routes';

export const App: FC = () => {
  return (
    <AirplanesProvider>
      <Router>
        <Page>
          <Routes />
        </Page>
      </Router>
    </AirplanesProvider>
  );
};
