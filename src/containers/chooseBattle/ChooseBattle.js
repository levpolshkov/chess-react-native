//@flow
import React from 'react';
import {
  ActivityIndicator,
  Slider,
  Text,
  StyleSheet,
  View,
  TouchableOpacity
} from 'react-native';

import Modal from 'react-native-modalbox';
import SegmentedControlTab from 'react-native-segmented-control-tab';

import { Button, Board } from '../../components';

const COLORS = ['white', 'random', 'black'];

const renderModal = ({
  selectedColorIndex,
  selectedTimeIndex,
  modalDisplayed,
  totalMinutes,
  incrementSeconds,
  aiLevel,
  playVsAI,
  create,
  setState
}: Object) => (
  <Modal isOpen={modalDisplayed} backdropOpacity={0.8} style={styles.modal}>
    <View style={styles.modalContent}>
      <Text style={styles.label}>Color</Text>
      <SegmentedControlTab
        values={COLORS}
        selectedIndex={selectedColorIndex}
        onTabPress={(index) => setState({ selectedColorIndex: index })}
      />
      <View style={styles.clockContainer}>
        <Text style={styles.label}>Clock</Text>
        <SegmentedControlTab
          values={['Unlimited', 'Real time']}
          selectedIndex={selectedTimeIndex}
          onTabPress={(index) => setState({ selectedTimeIndex: index })}
        />
        {selectedTimeIndex === 1 && (
          <View>
            <Text style={styles.label}>Minutes per side: {totalMinutes}</Text>
            <Slider
              style={styles.slider}
              minimumValue={1}
              maximumValue={150}
              step={1}
              onValueChange={(value) => setState({ totalMinutes: value })}
              value={totalMinutes}
            />
            <Text style={styles.label}>
              Increment in seconds: {incrementSeconds}
            </Text>
            <Slider
              minimumValue={0}
              maximumValue={180}
              step={1}
              onValueChange={(value) => setState({ incrementSeconds: value })}
              value={incrementSeconds}
            />
          </View>
        )}
      </View>
      {playVsAI && (
        <View>
          <Text style={styles.label}>A.I. level {aiLevel}</Text>
          <Slider
            minimumValue={1}
            maximumValue={8}
            step={1}
            onValueChange={(value) => setState({ aiLevel: value })}
            value={aiLevel}
          />
        </View>
      )}
      <Button style={styles.modalButton} text={'Create'} onPress={create} />
    </View>
  </Modal>
);

const HomeScreen = ({
  selectedColorIndex,
  selectedTimeIndex,
  modalDisplayed,
  totalMinutes,
  incrementSeconds,
  aiLevel,
  playVsAI,
  displayModal,
  puzzleColor,
  puzzleFen,
  puzzleData,
  navigate,
  ready,
  setState
}: Object) => (
  <View style={styles.container}>
    <View style={styles.puzzleContainer}>
      <Text style={styles.puzzleHeadline}>Puzzle of the day</Text>
      <TouchableOpacity onPress={() => navigate('Training', { puzzleData })}>
        <Board
          style={styles.board}
          size={200}
          color={puzzleColor}
          fen={puzzleFen}
          shouldSelectPiece={() => false}
        />
      </TouchableOpacity>
    </View>
    <Button
      style={styles.button}
      text={'Play with the machine'}
      onPress={() => displayModal(true)}
    />
    <Button
      style={styles.button}
      text={'Play with a friend'}
      onPress={() => displayModal(false)}
    />
    {renderModal({
      selectedColorIndex,
      selectedTimeIndex,
      modalDisplayed,
      totalMinutes,
      incrementSeconds,
      aiLevel,
      playVsAI,
      setState
    })}
    {ready && (
      <View style={styles.loadingContanier}>
        <ActivityIndicator animation size={'large'} color={'green'} />
      </View>
    )}
  </View>
);

HomeScreen.navigationOptions = ({ navigation }) => ({
  title: 'Home'
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 32
  },
  button: {
    marginTop: 16
  },
  modalButton: {
    marginTop: 16,
    backgroundColor: '#D85000'
  },
  modal: {
    padding: 16,
    backgroundColor: 'transparent'
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16
  },
  label: {
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 16,
    padding: 4
  },
  clockContainer: {
    backgroundColor: '#81a59a',
    padding: 16,
    marginTop: 16
  },
  board: {
    alignSelf: 'center'
  },
  puzzleContainer: {
    alignSelf: 'center'
  },
  puzzleHeadline: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    margin: 4
  },
  loadingContanier: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    paddingTop: 24,
    opacity: 0.4
  }
});

export default HomeScreen;