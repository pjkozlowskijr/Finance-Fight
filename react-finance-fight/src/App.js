import Navbar from './components/Navbar'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import apiUser from './api/apiUser'
import { CancelToken } from 'apisauce'
import LoginForm from './forms/LoginForm'
import ProfileForm from './forms/ProfileForm'
import { useContext } from 'react'
import { AppContext } from './context/AppContext'
import AlertPopUp from './components/AlertPopUp'
import SearchForm from './forms/SearchForm'
import apiAsset from './api/apiAsset'
import SingleAsset from './components/SingleAsset'
import SearchAsset from './components/SearchAsset'
import ProfileStack from './components/ProfileStack'
import { Routes } from 'react-router-dom'
import UserLeaderboard from './components/UserLeaderboard'

// const ghost = {
//   avatar: 'test',
//   display_name: 'test',
//   email: 'test4',
//   first_name: 'pat',
//   last_name: 'koz',
//   password: 'test'
// }

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
        {/* <Routes> */}
        {/* <UserLeaderboard/> */}
        {/* <LoginForm/> */}
        {/* <ProfileForm/> */}
        {/* <ProfileStack/> */}
        {/* <Button onClick={handleAPITest} variant='contained'>Test API</Button> */}
        <br/>
        <SearchAsset/>
        {/* </Routes> */}
        </Box>
      </Navbar>
    </>
  );
}

export default App;
