import Navbar from './components/Navbar'
import Button from '@mui/material/Button'
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
import LeagueForm from './forms/LeagueForm'
import BrowseLeagues from './components/BrowseLeagues'
import ProfileAccordion from './components/ProfileAccordion'

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
        <LoginForm/>
        <ProfileAccordion/>
        {/* <Button onClick={handleAPITest} variant='contained'>Test API</Button> */}
        <br/>
        {/* <LoginForm/>
        <ProfileForm user={user}/> */}
        {/* <SearchAsset/> */}
      </Navbar>
    </>
  );
}

export default App;
