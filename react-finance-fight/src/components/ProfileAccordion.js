import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useGetUserAssets from '../hooks/useGetUserAssets'
import ProfileForm from '../forms/ProfileForm';

export default function ProfileAccordion() {
    const userAssets = useGetUserAssets()
    console.log(userAssets)

  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>User Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Holdings</Typography>
        </AccordionSummary>
        <AccordionDetails>
            {userAssets?.assets?.assets.map((asset) => (
              <Typography>
                {asset.name}

              </Typography>
            ))}
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>Edit User Profile</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <ProfileForm/>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
