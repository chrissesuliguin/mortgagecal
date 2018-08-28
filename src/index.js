import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import App from './components/App';

const middleware = applyMiddleware(thunk);
const store = createStore(rootReducer,compose(middleware, window.devToolsExtension ? window.devToolsExtension() : f => f));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
