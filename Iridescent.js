import React from 'react';
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
const GRADIENT_WIDTH = height * 3;
const GRADIENT_HEIGHT = height * 3;
const GRADIENT_OFFSET_X = (GRADIENT_WIDTH - width) / 2;
const GRADIENT_OFFSET_Y = (GRADIENT_HEIGHT - height) / 2;
const MAX_X_VAL = GRADIENT_WIDTH / 2;
const MAX_Y_VAL = GRADIENT_HEIGHT / 2;

import { Accelerometer } from 'react-native-sensors';

export default class Iridescent extends React.Component {
  x = new Animated.Value(0);
  y = new Animated.Value(0);

  componentDidMount() {
    this.gyroscopeObservable = new Accelerometer({
      updateInterval: 50,
    });

    this.gyroscopeObservable.subscribe(({ x, y, z }) => {
      Animated.timing(this.x, {
        toValue: x,
        duration: 100,
        useNativeDriver: true,
      }).start();

      Animated.timing(this.y, {
        toValue: y,
        duration: 100,
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
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              overflow: 'hidden',
              height: 240,
              width: width - 32,
              backgroundColor: '#4D4D50',
              borderRadius: 24,
            }}
          >
            <Animated.View
              style={{
                opacity: this.y.interpolate({
                  inputRange: [-0.7, -0.4, 0, 0.4, 0.7],
                  outputRange: [0, 1, 1, 1, 0],
                  extrapolate: 'clamp',
                }),
              }}
            >
              <Animated.View
                style={[
                  styles.gradientContainer,
                  {
                    opacity: this.x.interpolate({
                      inputRange: [-0.8, -0.6, 0, 0.6, 0.8],
                      outputRange: [0, 1, 1, 1, 0],
                      extrapolate: 'clamp',
                    }),
                    transform: [
                      {
                        translateX: this.x.interpolate({
                          inputRange: [-1, 0, 1],
                          outputRange: [-MAX_X_VAL, 0, MAX_X_VAL],
                          extrapolate: 'clamp',
                        }),
                      },
                      {
                        translateY: this.y.interpolate({
                          inputRange: [-1, 0, 1],
                          outputRange: [MAX_Y_VAL, 0, -MAX_Y_VAL],
                          extrapolate: 'clamp',
                        }),
                      },
                    ],
                  },
                ]}
              >
                {this.props.background}
              </Animated.View>
            </Animated.View>
            {this.props.children}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  gradientContainer: {
    position: 'absolute',
    top: -GRADIENT_OFFSET_Y,
    left: -GRADIENT_OFFSET_X,
    width: GRADIENT_WIDTH,
    height: GRADIENT_HEIGHT,
  },
});
