import { useEffect, useState } from "react";
import {
  Dimensions,
  Pressable,
  Modal as RNModal,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type Props = {
  children: React.ReactNode;
  isVisible: boolean;
  onClose: () => void;
  backdropOpacity?: number;
  animationDuration?: number;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedView = Animated.createAnimatedComponent(View);
const screenHeight = Dimensions.get("window").height;

export function Modal({
  children,
  isVisible,
  onClose,
  backdropOpacity = 0.5,
  animationDuration = 200,
  style,
  contentContainerStyle,
}: Props) {
  const [isRendered, setIsRendered] = useState(false);
  const ANIMATION_DURATION = animationDuration;

  const opacity = Math.min(Math.max(backdropOpacity, 0), 1);

  const backdropValue = useSharedValue(0);
  const translateY = useSharedValue(screenHeight);

  const backdropStyle = useAnimatedStyle(() => {
    return {
      opacity: backdropValue.value,
    };
  });

  const contentStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  useEffect(() => {
    if (isVisible) {
      setIsRendered(true);
      backdropValue.value = withTiming(opacity, {
        duration: ANIMATION_DURATION,
      });
      translateY.value = withTiming(0, {
        duration: ANIMATION_DURATION,
      });
    } else {
      backdropValue.value = withTiming(
        0,
        {
          duration: ANIMATION_DURATION,
        },
        () => {
          runOnJS(handleClose)();
        }
      );
      translateY.value = withTiming(screenHeight, {
        duration: ANIMATION_DURATION,
      });
    }
  }, [isVisible]);

  const handleClose = () => {
    setIsRendered(false);
  };

  return (
    <RNModal
      animationType="none"
      transparent={true}
      visible={isRendered}
      onRequestClose={onClose}
    >
      <View style={[{ flex: 1 }, style]}>
        <AnimatedPressable
          style={[
            {
              ...StyleSheet.absoluteFillObject,
              backgroundColor: "black",
            },
            backdropStyle,
          ]}
          onPress={onClose}
        />
        <AnimatedView style={[contentContainerStyle, contentStyle]}>
          {children}
        </AnimatedView>
      </View>
    </RNModal>
  );
}
