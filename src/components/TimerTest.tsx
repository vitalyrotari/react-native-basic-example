import React, {memo, useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import CircleTimer from './CircleTimer';

const TimerTest = memo(() => {
  const [ticks, setTicks] = useState(0);

  useEffect(() => {
    let val = 0;

    const intervalId = BackgroundTimer.setInterval(() => {
      setTicks((val = val + 1));
    }, 1000);

    return () => {
      BackgroundTimer.clearInterval(intervalId);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text>{ticks} ticks</Text>

      <View style={styles.progress}>
        <CircleTimer duration={60} />
      </View>
    </View>
  );
});

export default TimerTest;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 52,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  progress: {
    marginTop: 16,
  },
});
