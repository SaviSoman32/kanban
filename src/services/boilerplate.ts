import { createStore } from 'redux';
import { reducer } from '../store/base';
import { ProjectData } from '../store/types';
import { actions } from '../store';

export const createBoilerplateState = (): ProjectData => {
  const store = createStore(reducer);
  store.dispatch(actions.createStatus({ title: 'Todo' }));
  store.dispatch(actions.createStatus({ title: 'In Progress' }));
  store.dispatch(actions.createStatus({ title: 'Completed' }));
  return store.getState();
}
