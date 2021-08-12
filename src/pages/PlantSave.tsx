import React, {useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {SvgFromUri} from 'react-native-svg';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {useNavigation, useRoute} from '@react-navigation/core';
import DateTimePicker, {Event} from '@react-native-community/datetimepicker';
import {format, isBefore} from 'date-fns';

import Button from '../components/Button';

import {PlantProps} from '../libs/storage';

import {getRealm} from '../services/realm';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import waterdrop from '../assets/images/waterdrop.png';

interface Parems {
  plant: PlantProps;
}

export default function PlantSave() {
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(Platform.OS === 'ios');

  const route = useRoute();
  const navigation = useNavigation();

  const {plant} = route.params as Parems;

  function handleTimeChange(event: Event, dateTime: Date | undefined) {
    if (Platform.OS === 'android') {
      setShowTimePicker(!showTimePicker);
    }

    if (dateTime && isBefore(dateTime, new Date())) {
      setSelectedTime(new Date());
      Alert.alert('Escolha uma hora no futuro ⏰');
    }

    if (dateTime) {
      setSelectedTime(dateTime);
    }
  }

  function handleOpenTimePickerAndroid() {
    setShowTimePicker(!showTimePicker);
  }

  async function handleSave() {
    try {
      // await savePlant({
      //   ...plant,
      //   timeNotification: selectedTime,
      // })
      const id = new Date().getTime();

      const realm = await getRealm();

      const data = {
        id,
        name: plant.name,
        about: plant.about,
        water_tips: plant.water_tips,
        photo: plant.photo,
        environments: plant.environments,
        frequencytime: plant.frequency.times,
        repeat_every: plant.frequency.repeat_every,
        timeNotification: selectedTime,
        hour: format(new Date(selectedTime), 'HH:mm'),
      };

      realm.write(() => {
        realm.create('Plant', data);
      });

      realm.close();

      navigation.navigate('confirmation', {
        icon: 'hug',
        title: 'Tudo certo',
        subtitle:
          'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha.',
        buttonText: 'Muito obrigado :D',
        nextScreen: 'myPlants',
      });
    } catch (err) {
      console.log(err);
      Alert.alert('Não foi possivel salvar 😢');
    }
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      <View style={styles.container}>
        <View style={styles.plantInfo}>
          <SvgFromUri uri={plant.photo} height={150} width={150} />

          <Text style={styles.plantName}>{plant.name}</Text>

          <Text style={styles.plantAbout}>{plant.about}</Text>
        </View>

        <View style={styles.controller}>
          <View style={styles.tipContainer}>
            <Image style={styles.tipImage} source={waterdrop} />

            <Text style={styles.tipText}>{plant.water_tips}</Text>
          </View>

          <Text style={styles.alterLabel}>
            Escolha o melhor horário para ser lembrado:
          </Text>

          {showTimePicker && (
            <DateTimePicker
              value={selectedTime}
              mode="time"
              display="spinner"
              onChange={handleTimeChange}
            />
          )}

          {Platform.OS === 'android' && (
            <TouchableOpacity
              style={styles.timePickerButton}
              onPress={handleOpenTimePickerAndroid}>
              <Text style={styles.timePickerText}>
                Mudar horário {'\n'}
                {format(selectedTime, 'HH:mm')}
              </Text>
            </TouchableOpacity>
          )}

          <Button title="Cadastrar planta" onPress={handleSave} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.shape,
  },
  plantInfo: {
    flex: 1,
    paddingHorizontal: 32,
    paddingVertical: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.shape,
  },
  plantName: {
    fontFamily: fonts.heading,
    fontSize: 24,
    color: colors.heading,
    marginTop: 15,
  },
  plantAbout: {
    textAlign: 'center',
    fontFamily: fonts.heading,
    color: colors.heading,
    fontSize: 17,
    marginTop: 10,
  },
  controller: {
    backgroundColor: colors.white,
    paddingTop: 20,
    paddingHorizontal: 32,
    paddingBottom: getBottomSpace() || 32,
  },
  tipContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.blue_light,
    padding: 20,
    borderRadius: 20,
    position: 'relative',
    bottom: 70,
  },
  tipImage: {
    width: 52,
    height: 52,
  },
  tipText: {
    flex: 1,
    marginLeft: 20,
    fontFamily: fonts.text,
    color: colors.blue,
    fontSize: 17,
    textAlign: 'justify',
  },
  alterLabel: {
    textAlign: 'center',
    fontFamily: fonts.complement,
    color: colors.heading,
    fontSize: 12,
    marginBottom: 5,
  },
  timePickerButton: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 40,
  },
  timePickerText: {
    color: colors.heading,
    fontSize: 24,
    fontFamily: fonts.text,
    textAlign: 'center',
  },
});
