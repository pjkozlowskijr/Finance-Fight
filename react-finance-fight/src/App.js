import Box from '@mui/material/Box'
import { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import AlertPopUp from './components/AlertPopUp'
import Navbar from './components/Navbar'
import { AppContext } from './context/AppContext'
import Help from './views/Help'
import Home from './views/Home'
import Leaderboard from './views/Leaderboard'
import Login from './views/Login'
import Logout from './views/Logout'
import Profile from './views/Profile'
import Register from './views/Register'
import SearchAsset from './views/SearchAsset'
import ViewSingleAsset from './views/ViewSingleAsset'

function App() {

  return (
    <>
      <AlertPopUp/>
      <Navbar>
        <Box sx={{minHeight:'100%'}}>
          <Routes>
            <Route path='/help' element={<Help/>}/>
            <Route path='/' element={<Home/>}/>
            <Route path='/leaderboard' element={<Leaderboard/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/logout' element={<Logout/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/search' element={<SearchAsset/>}/>
            <Route path='/asset/:type/:symbol' element={<ViewSingleAsset/>}/>
          </Routes>
        </Box>
      </Navbar>
    </>
  );
}

export default App;