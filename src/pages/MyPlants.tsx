import React, { useEffect, useState, } from 'react'
import Realm from 'realm'
import { View, Image, Text, StyleSheet, FlatList, Alert, } from 'react-native'
import { formatDistance, } from 'date-fns'
import { pt, } from 'date-fns/locale'

import { removePlant, PlantProps, loadPlants as loadStoragedPlants } from '../libs/storage'
import { Plant } from '../schemas/PlantSchema'

import Header from '../components/Header'

import waterdrop from '../assets/images/waterdrop.png'

import colors from '../styles/colors'
import fonts from '../styles/fonts'
import PlantCardSecondary from '../components/PlantCardSecondary'
import { getRealm } from '../services/realm'

export default function MyPlants() {

  const [myPlants, setMyPlants ] = useState<PlantProps[]>([])
  const [loading, setLoading] = useState(true)
  const [nextWaterd, setNextWaterd] = useState<string>()

  useEffect(()=>{
    async function loadPlants() {

      // const storagedPlants = await loadStoragedPlants()
      
      // const nextTime = formatDistance(
      //   new Date(storagedPlants[0].timeNotification).getTime(),
      //   new Date().getTime(),
      //   { locale: pt },
      // )
      
      // setMyPlants(storagedPlants)
      // setNextWaterd(
      //   `Não esquece de regar a ${storagedPlants[0].name} à ${nextTime}`
      // )
      // setLoading(false)
      const realm = await Realm.open({
        schema: [Plant],
      })

      const plants = realm.objects('Plant')
      setMyPlants(plants)
    }

    loadPlants()
  }, [])

  function handleRemove(plant: PlantProps) {
    Alert.alert('Remover planta', `Deseja realmente remover a  ${plant.name}?`, [
      {
        text: 'Não 🙏',
        style: 'cancel',
      },
      {
        text: 'Sim 😢',
        onPress: async () => {
          try {
            const realm = await getRealm()
            realm.write(() => {
              
              realm.delete(plant)
            })
            // await removePlant(plant)
            setMyPlants(myPlants.filter(
              myPlant => myPlant._id !== plant._id 
            ))
          }
          catch {
            Alert.alert('Não foi possivel remover 😢')
          }
        }
      }
    ])
  }

  // if(loading)
  //   return <Load/>

  return(
    <View style={styles.container}>
      <Header userName='Madson'/>
      
      <View style={styles.spotlight}>
        <Image
          style={styles.spotlightImage}
          source={waterdrop}
        />
        <Text
          style={styles.spotlightText}
        >
          {nextWaterd}
        </Text>
      </View>

      <View style={styles.plants}>
        <Text style={styles.plantsText}>
          Próximas regadas
        </Text>

        <FlatList
          data={myPlants}
          keyExtractor={item => String(item._id)}
          contentContainerStyle={styles.plantsList}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <PlantCardSecondary data={item} handleRemove={() => handleRemove(item)}/>
          )}
        />
      </View>
    </View>
  )
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.background,
  },
  spotlight: {
    backgroundColor: colors.blue_light,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    marginTop: 20,
    borderRadius: 20,
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  spotlightImage: {
    width: 60,
    height: 60,
  },
  spotlightText: {
    flex: 1,
    marginLeft: 20,
    color: colors.blue,
    textAlign: 'justify',
  },
  plants: {
    flex: 1,
    width: '100%',
  },
  plantsText: {
    fontSize: 24,
    padding: 20,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginVertical: 20,
  },
  plantsList: {

  }
})