import { Action, Reducer } from 'redux';

type Handlers<S> = {
  [key: string]: (state: S, action: any) => S;
};

const createReducer =
  <S>(initialState: S, handlers: Handlers<S>): Reducer<S> =>
  <A extends Action>(state: S = initialState, action: A) =>
    Object.prototype.hasOwnProperty.call(handlers, action.type)
      ? handlers[action.type](state, action)
      : state;

export default createReducer;
