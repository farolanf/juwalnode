import React from 'react'
import { SnackbarProvider } from 'notistack'
import Notifier from '$con/notifier'

const wrapRootElement = element => (
  <SnackbarProvider>
    <>
      {element}
      <Notifier />
    </>
  </SnackbarProvider>
)

export default wrapRootElement