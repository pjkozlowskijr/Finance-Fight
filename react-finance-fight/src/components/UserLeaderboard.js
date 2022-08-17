import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useContext, useState } from 'react';
import { changeColor, currencyFormat, formatChange } from '../helpers';
import useGetAllUsers from '../hooks/useGetAllUsers';
import { AppContext } from '../context/AppContext';

export default function UserLeaderboard() {
  useGetAllUsers();
  const {users, setUsers} = useContext(AppContext);
  const [order, setOrder] = useState('DSC');
  const sorting = (col) => {
    if (order === 'ASC'){
      if (col === 'display_name'){
        const sorted = [...users].sort(
          (a,b) => a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
        );
        setUsers(sorted)
      }else if (col === 'dollar_change'){
        const sorted = [...users].sort(
          (a,b) => a.asset_value - a.asset_costs > b.asset_value - b.asset_costs ? 1 : -1
        );
        setUsers(sorted)
      }else if (col === 'percent_change'){
        const sorted = [...users].sort(
          (a,b) => (a.asset_value - a.asset_costs)/a.asset_costs > (b.asset_value - b.asset_costs)/b.asset_costs ? 1 : -1
        );
        setUsers(sorted)
      }else{
        const sorted = [...users].sort(
          (a,b) => a[col] > b[col] ? 1 : -1
        );
        setUsers(sorted)
      }
      setOrder('DSC')
    }
    if (order === 'DSC'){
      if (col === 'display_name'){
        const sorted = [...users].sort(
          (a,b) => a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
        );
        setUsers(sorted)
      }else if (col === 'dollar_change'){
        const sorted = [...users].sort(
          (a,b) => a.asset_value - a.asset_costs < b.asset_value - b.asset_costs ? 1 : -1
        );
        setUsers(sorted)
      }else if (col === 'percent_change'){
        const sorted = [...users].sort(
          (a,b) => (a.asset_value - a.asset_costs)/a.asset_costs < (b.asset_value - b.asset_costs)/b.asset_costs ? 1 : -1
        );
        setUsers(sorted)
      }else{
        const sorted = [...users].sort(
          (a,b) => a[col] < b[col] ? 1 : -1
        );
        setUsers(sorted)
      }
      setOrder('ASC')
    }
  };

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
            <th className="text-center" scope="col">Rank</th>
            <th className="text-center" scope="col" onClick={()=>sorting('display_name')}>User</th>
            <th className="text-center" scope="col" onClick={()=>sorting('total_value')}>Net Worth</th>
            <th className="text-center" scope="col" onClick={()=>sorting('bank')}>Bank Funds</th>
            <th className="text-center" scope="col" onClick={()=>sorting('asset_costs')}>Asset Costs</th>
            <th className="text-center" scope="col" onClick={()=>sorting('asset_value')}>Current Value</th>
            <th className="text-center" scope="col" onClick={()=>sorting('dollar_change')}>$ Change</th>
            <th className="text-center" scope="col" onClick={()=>sorting('percent_change')}>% Change</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, index) => (
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
