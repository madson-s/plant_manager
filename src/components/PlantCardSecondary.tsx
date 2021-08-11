import React from 'react'
import { Text, View, StyleSheet, Animated } from 'react-native'
import { RectButton, RectButtonProps, Swipeable } from 'react-native-gesture-handler'
import Feather from 'react-native-vector-icons/Feather'
import { SvgFromUri } from 'react-native-svg'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface PlantCardProps extends RectButtonProps{
  data: {
    name: string;
    photo: string;
    hour: string; 
  },
  handleRemove: () => void;
}

export default function PlantCardSecondary({ data, handleRemove, ...rest }: PlantCardProps) {
  return(
    <Swipeable
      overshootRight={false}
      renderRightActions={() => (
        <Animated.View>
          <View>
            <RectButton
              style={styles.buttonRemove}
              onPress={handleRemove}
            >
              <Feather
                name='trash'
                color={colors.white}
                size={32}
              >

              </Feather>
            </RectButton>
          </View>
        </Animated.View>
      )}
    >
      <RectButton 
        style={styles.container}
        {...rest}
      >
        
        <SvgFromUri 
          uri={data.photo} 
          width={50} 
          height={50}
        />
        
        <Text style={styles.text}>
          {data.name}
        </Text>

        <View style={styles.details}>
        
          <Text style={styles.timeLabel}>
            Regue às
          </Text>

          <Text style={styles.time}>
            {data.hour}
          </Text>

        </View>
        
      </RectButton>
    </Swipeable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingVertical: 25,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.shape,
    marginVertical: 5,
  },
  text: {
    flex: 1,
    marginLeft: 10,
    fontFamily: fonts.heading,
    fontSize: 17,
    color: colors.heading,
  },
  details: {
    alignItems: 'flex-end',
  },
  timeLabel: {
    fontSize: 16,
    fontFamily: fonts.text,
    color: colors.body_light,
  },
  time: {
    marginTop: 5,
    fontSize: 16,
    fontFamily: fonts.heading,
    color: colors.body_dark,
  },
  buttonRemove: {
    width: 100,
    height: 85,
    backgroundColor: colors.red,
    marginTop: 15,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    right: 40,
    paddingLeft: 15,
  },
})