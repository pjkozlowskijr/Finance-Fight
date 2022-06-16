import Navbar from './components/Navbar'
import Button from '@mui/material/Button'
import apiUser from './api/apiUser'
import { CancelToken } from 'apisauce'

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
  return (
    <>
      <Navbar>
        <Button onClick={handleAPITest} variant='contained'>Test API</Button>
      </Navbar>
    </>
  );
}

export default App;
