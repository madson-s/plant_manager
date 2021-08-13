import React from 'react';
import {
  Modal,
  TouchableWithoutFeedback,
  View,
  Text,
  BackHandlerStatic,
} from 'react-native';

import Button from '../Button';

import {styles} from './styles';

interface Props {
  BackHandler: BackHandlerStatic;
  setModalVisible: Function;
  modalVisible: boolean;
}

export const ExitModal = ({
  BackHandler,
  setModalVisible,
  modalVisible,
}: Props) => {
  return (
    <Modal
      transparent={true}
      style={styles.container}
      animationType="slide"
      visible={modalVisible}>
      <TouchableWithoutFeedback
        onPress={() => {
          setModalVisible(false);
        }}>
        <View style={styles.background} />
      </TouchableWithoutFeedback>

      <View style={styles.cardContainer}>
        <Text style={styles.cardText}>Tem certeza que deseja sair do app?</Text>

        <View style={styles.cardButtonWrapp}>
          <View style={styles.cardButton}>
            <Button
              title="Ficar"
              onPress={() => {
                setModalVisible(false);
              }}
            />
          </View>

          <View style={styles.cardButton}>
            <Button
              title="Sair"
              onPress={() => {
                BackHandler.exitApp();
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};
