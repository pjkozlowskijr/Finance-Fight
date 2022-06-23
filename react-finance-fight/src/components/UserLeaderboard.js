import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { changeColor, currencyFormat, formatChange } from '../helpers';
import useGetAllUsers from '../hooks/useGetAllUsers';

export default function UserLeaderboard() {
  const users = useGetAllUsers();

  if (!users){
    return(
        <Box sx={{width:'100%', height:'100%', display:'flex', justifyContent:'center', alignItems:'center'}}>
            <CircularProgress/>
        </Box>
    )
  };

  return (
    <Paper sx={{width:'90%', m:'auto', p:2, mt:'-64px'}}>
      <Typography sx={{fontWeight:'bold', color:'black', mb:3, textAlign:'center'}} variant='h3'>User Leaderboard</Typography>
      <table style={{width:'100%'}} className='table table-striped'>
        <thead>
          <tr className='leader-head'>
            <th class="text-center" scope="col">Rank</th>
            <th class="text-center" scope="col">User</th>
            <th class="text-center" scope="col">Net Worth</th>
            <th class="text-center" scope="col">Bank Funds</th>
            <th class="text-center" scope="col">Asset Costs</th>
            <th class="text-center" scope="col">Current Value</th>
            <th class="text-center" scope="col">$ Change</th>
            <th class="text-center" scope="col">% Change</th>
          </tr>
        </thead>
        <tbody>
          {users?.users?.map((user, index) => (
            <tr key={user?.display_name} className='leader-data'>
              <td>{index + 1}</td>
              <td>{user?.display_name}</td>
              <td>{currencyFormat(user?.total_value)}</td>
              <td>{currencyFormat(user?.bank)}</td>
              <td>{currencyFormat(user?.asset_costs)}</td>
              <td>{currencyFormat(user?.asset_value)}</td>
              <td style={{color:changeColor(formatChange(user?.asset_value - user?.asset_costs))}}>
                {formatChange(user?.asset_value - user?.asset_costs)}
              </td>
              <td style={{color:changeColor(formatChange((user?.asset_value - user?.asset_costs)/user?.asset_costs*100))}}>
                {formatChange((user?.asset_value - user?.asset_costs)/user?.asset_costs*100)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Paper>
  )
}
