import { COLORS } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

type Props = {
  label: string;
  value?: string;
  onSelect: (value: string) => void;
  options: string[];
};

const AnimatedText = Animated.createAnimatedComponent(Text);
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);

export default function DropdownInput({
  label,
  value,
  onSelect,
  options,
}: Props) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleOnSelectOption = (selectedValue: string) => {
    onSelect(selectedValue);
    setIsDropdownOpen(false);
  };

  const labelY = useSharedValue(27);
  const inputColor = useSharedValue(COLORS.gray);
  const labelFontSize = useSharedValue(16);
  const iconRotation = useSharedValue("0deg");

  const borderStyle = useAnimatedStyle(() => {
    return {
      borderColor: withTiming(inputColor.value, { duration: 250 }),
    };
  });

  const labelStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: withSpring(labelY.value, { stiffness: 1200 }) },
      ],
      fontSize: withSpring(labelFontSize.value, { stiffness: 1200 }),
      color: withTiming(inputColor.value, { duration: 250 }),
    };
  });

  const iconStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: withSpring(iconRotation.value, { stiffness: 1200 }) },
      ],
      color: withTiming(inputColor.value, { duration: 250 }),
    };
  });

  useEffect(() => {
    if (value && value.length > 0) {
      labelY.value = 2;
      labelFontSize.value = 12;
    } else {
      labelY.value = 27;
      labelFontSize.value = 16;
    }
  }, [value]);

  useEffect(() => {
    if (isDropdownOpen) {
      inputColor.value = COLORS.primary;
      iconRotation.value = "180deg";
    } else {
      inputColor.value = COLORS.gray;
      iconRotation.value = "0deg";
    }
  }, [isDropdownOpen]);

  return (
    <View style={styles.container}>
      <AnimatedPressable
        onPress={() => setIsDropdownOpen(!isDropdownOpen)}
        style={[styles.inputContainer, borderStyle]}
      >
        <View>
          <AnimatedText style={[styles.label, labelStyle]}>
            {label}
          </AnimatedText>
          <Text style={styles.text}>{value}</Text>
        </View>
        <AnimatedIcon name="chevron-down" style={[styles.icon, iconStyle]} />
      </AnimatedPressable>

      {isDropdownOpen && (
        <View style={styles.optionsContainer}>
          <FlatList
            data={options}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => handleOnSelectOption(item)}
                style={styles.optionItem}
              >
                <Text style={styles.optionText}>{item}</Text>
              </Pressable>
            )}
            keyExtractor={(item, index) => index.toString()}
            indicatorStyle="white"
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  inputContainer: {
    paddingBottom: 10,
    maxWidth: 500,
    height: 60,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    borderBottomWidth: 1,
  },
  label: {
    color: COLORS.gray,
    marginBottom: 10,
  },
  text: {
    color: COLORS.text,
    marginLeft: 5,
  },
  icon: {
    color: COLORS.gray,
    fontSize: 20,
  },
  optionsContainer: {
    maxHeight: 200,
    width: "100%",
    position: "absolute",
    top: 70,
    zIndex: 900,
    borderRadius: 8,
    backgroundColor: COLORS.dropdownInput,
  },
  optionItem: {
    padding: 15,
  },
  optionText: {
    color: COLORS.gray,
  },
});
