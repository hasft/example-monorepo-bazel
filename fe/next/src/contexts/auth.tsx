import * as React from 'react';

const initialState = {
    isLogin: false
}

const StateContext = React.createContext(initialState);
const DispatchContext = React.createContext({});

const reducer = (state, action) => {
    return state;
}

const Provider = ({children}) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    
    return (
        <StateContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>
                {children}
            </DispatchContext.Provider>
        </StateContext.Provider>
    )
}

export {Provider, StateContext, DispatchContext};
