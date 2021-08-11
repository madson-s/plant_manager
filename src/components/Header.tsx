import React from 'react'
import { View, Text, Image, StyleSheet, } from 'react-native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'

import wateringImg from '../assets/images/waterdrop.png'
import colors from '../styles/colors' 
import fonts from '../styles/fonts'

interface headerProps {
  userName: string;
}

export default function Header({ userName }: headerProps) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Olá,</Text>
        <Text style={styles.userName}>{userName}</Text>
      </View>
      <Image source={wateringImg} style={styles.image}></Image>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: getStatusBarHeight(),
  },
  greeting: {
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.text,
  },
  userName: {
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 40,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  }
})