import React , { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'

import AuthContext from '../context/auth'

import StackRoutes from './stack.routes'

export default function Routes() {
  
  const { loading } = useContext(AuthContext)
  
  if(loading)
    return null

  return(
    <NavigationContainer>
      <StackRoutes />
    </NavigationContainer>
  )
}