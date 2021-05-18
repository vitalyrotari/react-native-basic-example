import React, {memo, useState} from 'react';
import Animated from 'react-native-reanimated';
import {Text, StyleSheet} from 'react-native';
import {Clock, EasingNode, call, useCode} from 'react-native-reanimated';
import CircleProgress from './CircleProgress';
import {runTiming} from '../utils/animation';

interface CircleTimerProps {
  duration?: number;
}

interface CircleTextProps {
  percentage: Animated.Value<number>;
  duration: number;
}

const CircleText = memo(({percentage, duration}: CircleTextProps) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useCode(() => {
    let prevValue: number = 0;

    return call([percentage], (value) => {
      const nextValue = Math.round(duration * (value as unknown as number));
      if (nextValue !== prevValue) {
        setTimeLeft(duration - (prevValue = nextValue));
      }
    });
  }, [percentage, duration]);

  return (
    <Text
      accessibilityRole="timer"
      accessibilityLiveRegion="assertive"
      importantForAccessibility="yes"
      style={styles.text}>
      {timeLeft}
    </Text>
  );
});

const CircleTimer = memo((props: CircleTimerProps) => {
  const {duration = 10} = props;

  const clock = new Clock();
  const config = {
    duration: duration * 1000,
    toValue: 1,
    easing: EasingNode.linear,
  };

  const percentage = runTiming(clock, 0, config) as Animated.Value<number>;

  return (
    <CircleProgress
      percentage={percentage}
      pathColor={'#e5e5e5'}
      pathStrokeWidth={3}
      pathOffset={12}
      trailStrokeWidth={7}>
      <CircleText percentage={percentage} duration={duration} />
    </CircleProgress>
  );
});

export default CircleTimer;

const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontSize: 13,
    fontWeight: '700',
  },
});
