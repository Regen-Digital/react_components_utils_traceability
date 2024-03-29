import React from 'react';
import { Box } from '@mui/material';
import { Typography } from '@mui/material';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import DoneIcon from '@mui/icons-material/Done';
import { Status } from '../../models';

/**
 *
 * MessageText component is used to display a message and icon with status and text
 */

type PropsWithChildren = {
  status?: Status;
  text: string;
};

export default function MessageText({ status, text }: PropsWithChildren) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {status === Status.error && (
        <>
          <CancelOutlinedIcon color='error' sx={{ marginRight: '10px' }} />
        </>
      )}
      {status === Status.success && (
        <>
          <DoneIcon color='success' sx={{ marginRight: '10px' }} />
        </>
      )}
      <Typography sx={{ marginBottom: '50px' }}>{text}</Typography>
    </Box>
  );
}
