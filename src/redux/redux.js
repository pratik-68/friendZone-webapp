import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import Reducers from './reducers/rootReducer';

// const store = createStore(Reducer, applyMiddleware(thunk));

export default compose(applyMiddleware(thunk))(createStore)(
  Reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
