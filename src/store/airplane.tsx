import { createContext, useContext } from 'react';
import * as React from 'react';
import { nanoid } from 'nanoid';
import { TwoDimensionalArray } from '../services/airplane/airplane';

export interface Airplane {
  id: string;
  name: string;
  map: string;
  totalSeats: number;
}

type Action = { type: 'add'; payload: Airplane } | { type: 'update' };
type Dispatch = (action: Action) => void;
type State = Airplane[];
type AirplanesProviderProps = { children: React.ReactNode };
type StateContext = { state: State; dispatch: Dispatch };
const AirplanesStateContext =
  React.createContext<StateContext | undefined>(undefined);
function airplaneReducer(state: State, action: Action) {
  switch (action.type) {
    case 'add': {
      return [...state, action.payload];
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

const AirplanesProvider = ({
  children,
}: AirplanesProviderProps): JSX.Element => {
  const [state, dispatch] = React.useReducer(airplaneReducer, [
    {
      id: nanoid(4),
      name: 'AirBus 216',
      map: '[[4,5], [4,5]]',
      totalSeats: 40,
    },
  ]);
  const value = { state, dispatch };
  return (
    <AirplanesStateContext.Provider value={value}>
      {children}
    </AirplanesStateContext.Provider>
  );
};
const useAirplaneStateContext = (): StateContext => {
  const context = React.useContext(AirplanesStateContext);
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider');
  }
  return context;
};

export const useAirplane = (airplaneId: string): Airplane | undefined => {
  const { state } = useAirplaneStateContext();
  return (state ?? []).find(({ id }) => id === airplaneId);
};

export { AirplanesProvider, useAirplaneStateContext };
