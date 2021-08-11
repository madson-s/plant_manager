import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, FlatList, ActivityIndicator, } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/core'

import Header from '../components/Header'
import EnvironmentButton from '../components/EnvironmentButton'
import PlantCardPrimary from '../components/PlantCardPrimary'
import Load from '../components/Load'

import { PlantProps } from '../libs/storage'

import api from '../services/api'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface EnvironmentProps {
  key: string;
  title: string;
}

export default function PlantSelect() {
  
  const [environments, setEnvironments] = useState<EnvironmentProps[]>([])
  const [plants, setPlants] = useState<PlantProps[]>([])
  const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([])
  const [environmentSelected, setEnvironmentSelected] = useState('all')
  const [loading, setLoading] = useState(true)
  
  const [page, setPage] = useState(1)
  const [loadingMore, setLoadingMore] = useState(true)

  const [userName, setUserName] = useState('')

  const navigation = useNavigation()

  function handleEnvironmentSelected(environment: string) {
    
    setEnvironmentSelected(environment)
    
    if(environment === 'all')
      return setFilteredPlants(plants)
    
    const filtered = plants.filter(plant =>
      plant.environments.includes(environment)
    )

    setFilteredPlants(filtered)
  }

  function handlePlantSelect(plant: PlantProps) {
    navigation.navigate('plantSave', { plant })
  }

  async function fetchPlants() {
    const { data } = await api.get(`/plants`)
    
    if(!data)
      return setLoadingMore(true)
    
    if(page > 1) { 
      setPlants([...plants, ...data])
      setFilteredPlants([...filteredPlants, ...data])
    }
    else {
      setFilteredPlants(data)
      setPlants(data)
    }
    
    setLoading(false)
    setLoadingMore(false)
  }

  function handleFetchMore(distance: number) {
    if(distance < 1)
      return

    setLoadingMore(true)
    setPage(page + 1)
    fetchPlants()
  }

  useEffect(() => {
    async function getUserName() {
      const user = await AsyncStorage.getItem('@plantManager:user')
      setUserName(user || '')   
    }
    
    getUserName()
  }, [])

  useEffect(()=>{
    async function fetchEnvironments() {
      const { data } = await api.get('/plants_environments')
      setEnvironments([
        {
          key: 'all',
          title: 'Todos',
        },
        ...data
      ])
    }

    fetchEnvironments()
  }, [])

  useEffect(()=>{
    fetchPlants()
  }, [])

  // if(loading)
  //   return <Load/>
  
  return(
    <View style={styles.container}>

      <Header userName={userName}/>

      <Text style={styles.title}>
        Em qual ambiente
      </Text>

      <Text style={styles.subtitle}>
        você quer colocar sua planta?
      </Text>  

      <View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.environmentList}
          data={environments}
          keyExtractor={(item) => String(item.key)}
          ListFooterComponent={
            loadingMore ? <ActivityIndicator color={colors.green}/> : < ></>
          }
          renderItem={({ item }) => (
            <EnvironmentButton 
              title={item.title} 
              active={item.key === environmentSelected}
              onPress={() => handleEnvironmentSelected(item.key)}
            />            
          )}
        />
      </View>
      
      <View style={styles.plants}>
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={2}
          contentContainerStyle={styles.plantsContainer}
          data={filteredPlants}
          keyExtractor={(item) => String(item.id)}
          onEndReachedThreshold={0.1}
          onEndReached={({ distanceFromEnd }) => {
            //handleFetchMore(distanceFromEnd)
          }}
          renderItem={({ item }) => (
            <PlantCardPrimary 
              data={item} 
              onPress={() => handlePlantSelect(item)}
            />            
          )}
        />
      </View>
    </View>
  )  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  title: {
    marginHorizontal: 20,
    fontSize: 17,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 20,
    marginTop: 15,
  },
  subtitle: {
    marginHorizontal: 20,
    color: colors.heading,
    fontFamily: fonts.text,
    fontSize: 17,
    lineHeight: 20, 
  },
  environmentList: {
    height: 40,
    justifyContent: 'center',
    paddingBottom: 5,
    marginLeft: 20,
    paddingRight: 30,
    marginVertical: 32,
  },
  plants: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  plantsContainer: {
    
  },
})