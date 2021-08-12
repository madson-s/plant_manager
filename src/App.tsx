import React from 'react';
import {StatusBar} from 'react-native';

import Routes from './routes';
import {AuthProvider} from './context/auth';

function App() {
  return (
    <>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </>
  );
}

export default App;
