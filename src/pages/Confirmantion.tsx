import React from 'react'
import { SafeAreaView, StyleSheet, Text, View, } from 'react-native'
import { useNavigation, useRoute, } from '@react-navigation/core'

import Button from '../components/Button'

import fonts from '../styles/fonts'
import colors from '../styles/colors'

interface Params {
  icon: 'smile' | 'hug';
  title: string;
  subtitle: string;
  buttonText: string;
  nextScreen: string;
}

const emojis = {
  smile: '😁',
  hug: '🤗',
}

export default function Confirmation() {

  const navigation = useNavigation()
  const route = useRoute()

  const {
    icon,
    title,
    subtitle,
    buttonText,
    nextScreen
  } = route.params as Params  

  function handleConfirmation() {
    navigation.navigate(nextScreen)
  }

  return(
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}> 
        
        <View style={styles.content}>
        
          <Text style={styles.emoji}>
            {emojis[icon]} 
          </Text>
        
          <Text style={styles.title}>
            {title}
          </Text>

          <Text style={styles.subtitle}>
            {subtitle}
          </Text>

        </View>

        <View style={styles.footer}>
          <Button 
            title={buttonText}
            onPress={handleConfirmation}
          />
        </View>

      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },  
  wrapper: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 70,
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 32,
    textAlign: 'center',
    color: colors.heading,
    marginTop: 38,
  },
  subtitle: {
    fontFamily: fonts.text,
    textAlign: 'center',
    fontSize: 18,
    paddingHorizontal: 20,
    color: colors.heading,
    marginTop: 16
  },
  footer: {
    width: '100%',
    marginTop: 40,
    paddingHorizontal: 52,
  },
})