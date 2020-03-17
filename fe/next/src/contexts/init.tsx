import React, { FunctionComponent } from "react";

export type ProviderProps = {
  value: any;
};

export type InitState = {
  segment: {};
};

const initialState: InitState = {
  segment: {},
};

const StateContext = React.createContext(initialState);
const DispatchContext = React.createContext({});

const reducer = state => {
  return state;
};

const Provider: FunctionComponent<ProviderProps> = props => {
  const [state, dispatch] = React.useReducer(reducer, props.value);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>{props.children}</DispatchContext.Provider>
    </StateContext.Provider>
  );
};

export { Provider, StateContext, DispatchContext };
