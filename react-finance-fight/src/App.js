import Navbar from './components/Navbar'
import Button from '@mui/material/Button'
import apiUser from './api/apiUser'
import { CancelToken } from 'apisauce'
import LoginForm from './forms/LoginForm'
import ProfileForm from './forms/ProfileForm'
import { useContext } from 'react'
import { AppContext } from './context/AppContext'
import AlertPopUp from './components/AlertPopUp'

const ghost = {
  // avatar: 'test',
  // display_name: 'test',
  // email: 'test4',
  first_name: 'pat',
  last_name: 'koz',
  // password: 'test'
}

const handleAPITest = async () => {
  const source = CancelToken.source();
  const responseObject = await apiUser.editUser('1noH_s1hjpXxHmc-GZ9fBRafuDuBInca5ftAGtarCxM', ghost, source.token)
  console.log(responseObject)
}

function App() {
  const {user} = useContext(AppContext)

  return (
    <>
      <AlertPopUp/>
      <Navbar>
        <Button onClick={handleAPITest} variant='contained'>Test API</Button>
        <br/>
        <LoginForm/>
        <ProfileForm user={user}/>
      </Navbar>
    </>
  );
}

export default App;
