import { Pressable } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

type Props = {
  children: React.ReactNode;
  onPress?: () => void;
  styles?: object;
};

export default function PulsateButton({
  children,
  onPress,
  styles = {},
}: Props) {
  const scale = useSharedValue(1);

  const onPressIn = () => {
    scale.value = 0.9;
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
    <Pressable onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut}>
      <Animated.View style={[styles, animatedStyle]}>{children}</Animated.View>
    </Pressable>
  );
}
