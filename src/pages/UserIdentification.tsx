import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Text,
  View,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Button from '../components/Button';

import fonts from '../styles/fonts';
import colors from '../styles/colors';

export default function UserIdentification() {
  const [isFocused, setIsFocused] = useState(false);
  const [name, setName] = useState<string>();

  const navigation = useNavigation();

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(!!name);
  }

  function handleInputChange(value: string) {
    setName(value);
  }

  async function handleSubmit() {
    if (!name) {
      return Alert.alert('Me diz como chamar você 😢');
    }

    try {
      await AsyncStorage.setItem('@plantManager:user', name);
      navigation.navigate('confirmation', {
        icon: 'smile',
        title: 'Prontinho',
        subtitle:
          'Agora vamos começar a cuidar das suas plantinhas com muito cuidado.',
        buttonText: 'Começar',
        nextScreen: 'plantSelect',
      });
    } catch {
      Alert.alert('Não foi possível salvar o seu nome 😢');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <View style={styles.form}>
              <View style={styles.header}>
                <Text style={styles.emoji}>{name ? '😄' : '😀'}</Text>

                <Text style={styles.title}>
                  Como podemos {'\n'}
                  chamar você?
                </Text>
              </View>

              <TextInput
                style={[styles.input, isFocused && {borderColor: colors.green}]}
                placeholder={'Digite um nome'}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                onChangeText={handleInputChange}
              />

              <View style={styles.footer}>
                <Button title="Confirmar" onPress={handleSubmit} />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    width: '100%',
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 52,
  },
  header: {
    alignItems: 'center',
  },
  emoji: {
    fontSize: 44,
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
  input: {
    borderBottomWidth: 1,
    borderColor: colors.heading,
    width: '100%',
    fontSize: 18,
    marginTop: 50,
    padding: 10,
    textAlign: 'center',
  },
  footer: {
    width: '100%',
    marginTop: 40,
    paddingHorizontal: 20,
  },
});
