import { Pressable } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

type Props = {
  children?: React.ReactNode;
  onPress?: () => void;
  style?: object;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function PulsateButton({
  children,
  onPress,
  style = {},
}: Props) {
  const scale = useSharedValue(1);

  const onPressIn = () => {
    scale.value = 0.95;
  };

  const onPressOut = () => {
    scale.value = 1;
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(scale.value) }],
    };
  });

  return (
    <AnimatedPressable
      style={[style, animatedStyle]}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      {children}
    </AnimatedPressable>
  );
}
