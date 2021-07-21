import store from './store';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import Header from './components/Header';
import Main from './components/Main';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Header />
        <Main />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
