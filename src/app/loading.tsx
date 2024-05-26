'use client'

import React from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import { Backdrop } from '@mui/material'

const Loading = () => {
  return (
    <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={true}>
      <CircularProgress />
    </Backdrop>
  )
}

export default Loading
