import { COLORS } from "@/constants/theme";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  label: string;
  secureTextEntry?: boolean;
  style?: object;
  keyboardType?: TextInputProps["keyboardType"];
  maxLength?: number;
};

const AnimatedText = Animated.createAnimatedComponent(Text);
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export default function CustomTextInput({
  value,
  onChangeText,
  label,
  secureTextEntry,
  style,
  keyboardType,
  maxLength,
}: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const isActive = isFocused || (value && value.length > 0);

  const labelY = useSharedValue(27);
  const labelFontSize = useSharedValue(16);
  const inputColor = useSharedValue(COLORS.gray);

  const labelStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withSpring(labelY.value, { stiffness: 1200 }),
        },
      ],
      fontSize: withSpring(labelFontSize.value, { stiffness: 1200 }),
      color: withTiming(inputColor.value, { duration: 250 }),
    };
  });

  const borderStyle = useAnimatedStyle(() => {
    return {
      borderColor: withTiming(inputColor.value, { duration: 250 }),
    };
  });

  useEffect(() => {
    if (isActive) {
      labelY.value = 2;
      labelFontSize.value = 12;
    } else {
      labelY.value = 27;
      labelFontSize.value = 16;
    }
  }, [isActive]);

  useEffect(() => {
    if (isFocused) {
      inputColor.value = COLORS.primary;
    } else {
      inputColor.value = COLORS.gray;
    }
  }, [isFocused]);

  return (
    <View style={[styles.container, style]}>
      <AnimatedText style={[styles.label, labelStyle]}>{label}</AnimatedText>
      <AnimatedTextInput
        value={value}
        onChangeText={onChangeText}
        style={[styles.input, borderStyle]}
        placeholderTextColor={COLORS.gray}
        secureTextEntry={secureTextEntry}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        keyboardType={keyboardType}
        maxLength={maxLength}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    justifyContent: "flex-end",
  },
  input: {
    borderBottomWidth: 1,
    color: COLORS.text,
    maxWidth: 500,
  },
  label: {
    color: COLORS.gray,
  },
});
