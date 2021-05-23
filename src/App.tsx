import React, { FC } from 'react';
import { Page } from './components/page';
import { SeatingChartPage } from './pages';

export const App: FC = () => {
  return (
    <Page>
      <SeatingChartPage />
    </Page>
  );
};
