import React, { useState } from 'react';
import Splash from './pages/Splash';
import DogList from './pages/DogList';
import { interactableColors, pageStyle } from './lib/styles';
import { logout } from './api/authAPI';
import Button from './components/atomic/Button';

function App() {
  const [authenticated, setAuthenticated] = useState(false)

  const handleLogout = () => {
    logout()
    setAuthenticated(false)
  }

  return (
    <div className={pageStyle}>
      {authenticated ?
        <>
          <DogList />
          <div className='fixed bottom-4 right-8 z-10'>
            <Button
              onclick={handleLogout}
              additionalStyling={interactableColors.warning}
            >
              LOGOUT
            </Button>
          </div>
        </>
        :
        <Splash
          setAuthenticated={setAuthenticated}
        />
      }

    </div>
  );
}

export default App;
