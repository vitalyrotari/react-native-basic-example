import React, {memo} from 'react';
import Animated, {interpolateNode, multiply} from 'react-native-reanimated';
import {View, StyleSheet} from 'react-native';
import {Svg, Circle, Defs, LinearGradient, Stop} from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent<typeof Circle, any>(Circle);

interface CircularPogressProps {
  percentage: Animated.Value<number>;
  pathColor?: string;
  pathStrokeWidth?: number;
  pathOffset?: number;
  trailColor?: string;
  trailStrokeWidth?: number;
  trailStrokeLinecap?: 'butt' | 'round' | 'square';
  size?: number;
  useGradient?: boolean;
  fromColor?: string;
  toColor?: string;
  children?: React.ReactNode;
}

const CircleProgress = memo((props: CircularPogressProps) => {
  const {
    percentage,
    pathColor = '#eaeaea',
    pathStrokeWidth = 10,
    pathOffset = 0,
    trailColor = '#43cdcf',
    trailStrokeWidth = 10,
    trailStrokeLinecap = 'round',
    size = 100,
    useGradient = false,
    fromColor = '#f7cd46',
    toColor = '#ef9837',
    children,
  } = props;

  const radius = (size - trailStrokeWidth) / 2;
  const circum = radius * 2 * Math.PI;
  const pathRadius = (size - (pathStrokeWidth + pathOffset * 2)) / 2;

  const α = interpolateNode(percentage, {
    inputRange: [0, 1],
    outputRange: [0, Math.PI * 2],
  });

  const offset = multiply(α, radius);

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        {useGradient ? (
          <Defs>
            <LinearGradient id="grad" x1="0" y1="0" x2="100%" y2="0">
              <Stop offset="0" stopColor={fromColor} />
              <Stop offset="1" stopColor={toColor} />
            </LinearGradient>
          </Defs>
        ) : null}
        <Circle
          stroke={pathColor}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={pathRadius}
          strokeWidth={pathStrokeWidth}
        />
        <AnimatedCircle
          stroke={useGradient ? 'url(#grad)' : trailColor}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeLinecap={trailStrokeLinecap}
          transform={`rotate(-90, ${size / 2}, ${size / 2})`}
          strokeWidth={trailStrokeWidth}
          strokeDasharray={`${circum} ${circum}`}
          strokeDashoffset={offset}
        />
        {children ? (
          <View style={[styles.wrapper, {width: size, height: size}]}>
            {children}
          </View>
        ) : null}
      </Svg>
    </View>
  );
});

export default CircleProgress;

const styles = StyleSheet.create({
  container: {},
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
  },
});
