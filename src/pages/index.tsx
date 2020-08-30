import React, { useEffect } from 'react'
import { useHistory } from 'umi'

export default () => {
  const history = useHistory()
  useEffect(() => {
    history.replace('/keys')
  }, [history])
  return <div />
}
