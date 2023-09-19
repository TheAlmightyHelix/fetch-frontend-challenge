import React from 'react';
import LandingPage from './pages/LandingPage';
import DogList from './pages/DogList';
import { pageStyle } from './lib/styles';
import { useAuth } from './hooks/useAuth';
import LogoutButton from './components/LogoutButton';

function App() {
  const { AuthContext, authenticated, authenticate, handleLogout } = useAuth()

  return (
    <AuthContext.Provider value={{
      authenticated: authenticated,
      authenticate: authenticate,
      handleLogout: handleLogout
    }}>
      <div className={pageStyle}>
        {authenticated ?
          <>
            <LogoutButton />
            <DogList />
          </>
          :
          <LandingPage />
        }
      </div>
    </AuthContext.Provider>
  );
}

export default App;
