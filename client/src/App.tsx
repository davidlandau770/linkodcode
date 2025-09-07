import { Route, Routes } from 'react-router'
import './App.css'
import Layout from './comps/application-layout/Layout'
import Posts from './pages/Posts'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Posts />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
