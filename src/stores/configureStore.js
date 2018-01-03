import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const devtoolMiddleware = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const configureStore = () => {
  return createStore(
    reducers,
    compose(
      applyMiddleware(thunk),
      devtoolMiddleware
    ),
  );
}

export default configureStore;
