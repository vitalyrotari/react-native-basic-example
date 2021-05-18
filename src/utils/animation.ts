import {
  Clock,
  Value,
  add,
  block,
  cond,
  clockRunning,
  debug,
  set,
  startClock,
  stopClock,
  timing,
} from 'react-native-reanimated';

export type TimingConfig = Parameters<typeof timing>[1];
export type Node = ReturnType<typeof add>;
export type Adaptable<T> = Node | T;

export function runTiming(clock: Clock, value: Adaptable<any>, config: TimingConfig) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      startClock(clock),
    ]),
    timing(clock, state, config),
    cond(state.finished, debug('stop clock', stopClock(clock))),
    state.position,
  ]);
}
