import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  LayoutAnimation,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');
const GRADIENT_WIDTH = width * 3;
const GRADIENT_HEIGHT = height * 3;
const GRADIENT_OFFSET_X = (GRADIENT_WIDTH - width) / 2;
const GRADIENT_OFFSET_Y = (GRADIENT_HEIGHT - height) / 2;

import { Accelerometer } from 'react-native-sensors';

export default class App extends React.Component {
  x = new Animated.Value(0);
  y = new Animated.Value(0);

  componentDidMount() {
    this.gyroscopeObservable = new Accelerometer({
      updateInterval: 25,
    });

    this.gyroscopeObservable.subscribe(({ x, y, z }) => {
      Animated.timing(this.x, {
        toValue: x,
        duration: 25,
        useNativeDriver: true,
      }).start();

      Animated.timing(this.y, {
        toValue: y,
        duration: 25,
        useNativeDriver: true,
      }).start();
    });
  }

  componentWillUnmount() {
    this.gyroscopeObservable.stop();
  }

  render() {
    return (
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.gradientContainer,
            {
              transform: [
                {
                  translateX: this.x.interpolate({
                    inputRange: [-1, 0, 1],
                    outputRange: [
                      -GRADIENT_OFFSET_X * 1.5,
                      0,
                      GRADIENT_OFFSET_X * 1.5,
                    ],
                    extrapolate: 'clamp',
                  }),
                },
                {
                  translateY: this.y.interpolate({
                    inputRange: [-1, 0, 1],
                    outputRange: [
                      GRADIENT_OFFSET_Y * 1.5,
                      0,
                      -GRADIENT_OFFSET_Y * 1.5,
                    ],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            },
          ]}
        >
          <LinearGradient
            colors={[
              '#405de6',
              '#5851db',
              '#833ab4',
              '#c13584',
              '#e1306c',
              '#fd1d1d',
              '#f56040',
            ]}
            start={{ x: 0.0, y: 0.25 }}
            end={{ x: 0.5, y: 1.0 }}
            style={styles.gradient}
          />
        </Animated.View>
        <Image
          style={[{ ...StyleSheet.absoluteFillObject }]}
          source={require('./dots.png')}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4D4D50',
  },
  gradientContainer: {
    position: 'absolute',
    top: -GRADIENT_OFFSET_Y,
    left: -GRADIENT_OFFSET_X,
    width: GRADIENT_WIDTH,
    height: GRADIENT_HEIGHT,
  },
  gradient: {
    width: GRADIENT_WIDTH,
    height: GRADIENT_HEIGHT,
  },
});
