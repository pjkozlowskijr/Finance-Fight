import Navbar from './components/Navbar'
import Box from '@mui/material/Box'
import { useContext } from 'react'
import { AppContext } from './context/AppContext'
import AlertPopUp from './components/AlertPopUp'
import { Route, Routes } from 'react-router-dom'
import Home from './views/Home'
import Help from './views/Help'
import Leaderboard from './views/Leaderboard'
import Login from './views/Login'
import Logout from './views/Logout'
import Profile from './views/Profile'
import AssetLookup from './views/AssetLookup'

// const handleAPITest = async () => {
//   const source = CancelToken.source();
//   const responseObject = await apiAsset.getAssetInfo('stock', 'msft', source.token)
//   console.log(responseObject)
// }

function App() {
  const {user} = useContext(AppContext)

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
            <Route path='/register' element={<Profile/>}/>
            <Route path='/search' element={<AssetLookup/>}/>
          </Routes>
        </Box>
      </Navbar>
    </>
  );
}

export default App;


{/* <MarketOverview/>
<UserLeaderboard/>
<LoginForm/>
<ProfileForm/>
<ProfileStack/>
<Button onClick={handleAPITest} variant='contained'>Test API</Button>
<SearchAsset/> */}