import { useState } from 'react';
import './App.css'
import ConfigRoutes from './pages/configRoutes'
import { AuthContext } from './context/authContext';

function App() {
  const [user, setUser] = useState<{ username: string; permission: string } | null>(null);

  return (
    <>
      <AuthContext.Provider value={{ user, setUser }}>
        <ConfigRoutes />
      </AuthContext.Provider>
    </>
  )
}

export default App
