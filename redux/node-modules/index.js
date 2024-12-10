export const createStore = (reducer, initialState) => {
    let state = initialState;
    const callbacks = [];

    const getState = () => state;

    const dispatch = action => {
        state = reducer(state, action);
        callbacks.forEach(foo => foo());
    }

    const subscribe = callback => {
        callbacks.push(callback);
        return () => callbacks.filter(cb => cb !== callback);
    }

    return{
        getState:getState,
        subscribe:subscribe,
        dispatch:dispatch
    }
}