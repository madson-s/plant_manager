import React, { Fragment, useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import AuthContext from '../context/auth'

import Wellcome from '../pages/Wellcome'
import UserIdentification from '../pages/UserIdentification'
import Confirmation from '../pages/Confirmantion'
import PlantSave from '../pages/PlantSave'

import TabRoutes from './tab.routes'

import colors from '../styles/colors'

const Stack = createStackNavigator();

export default function StackRoutes() {
  const { user } = useContext(AuthContext)
  return(
    <Stack.Navigator
      headerMode="none"
      screenOptions={{
        cardStyle: {
          backgroundColor: colors.white,
        },
      }}
    >
      {user ? (
        <Fragment>
          <Stack.Screen 
            name="plantSelect" 
            component={TabRoutes} 
          />
          
          <Stack.Screen 
            name="plantSave" 
            component={PlantSave} 
          />

          <Stack.Screen 
            name="myPlants" 
            component={TabRoutes} 
          />

          <Stack.Screen 
            name="confirmation" 
            component={Confirmation} 
          />
        </Fragment>
      ) : (
        <Fragment> 
          <Stack.Screen 
            name="wellcome" 
            component={Wellcome} 
          />

          <Stack.Screen 
            name="userIdentification" 
            component={UserIdentification} 
          />
          
          <Stack.Screen 
            name="confirmation" 
            component={Confirmation} 
          />
        </Fragment>
      )}
    </Stack.Navigator>
  )
}