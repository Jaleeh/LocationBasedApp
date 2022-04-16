import React from 'react';
import Navigator from './routes/HomeStack';
import AuthProvider from './app/providers/AuthProvider';

const App = () => {
  return (
    <AuthProvider>
      <Navigator />
    </AuthProvider>
  );
};

export default App;
