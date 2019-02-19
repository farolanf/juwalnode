import React from 'react'

export const DumpProps = props => <pre>{JSON.stringify(props, null, 2)}</pre>