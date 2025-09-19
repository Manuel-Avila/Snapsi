import React from "react";
import { Button, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export default function SignUp() {
  // 1. Crea un valor compartido (shared value) para la posición.
  const offsetX = useSharedValue(0);

  // 2. Define el estilo animado que depende del valor compartido.
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: withSpring(offsetX.value) }],
  }));

  // 3. Función para cambiar el valor y disparar la animación.
  const moveBox = () => {
    offsetX.value = Math.random() * 250; // Le damos un valor aleatorio para moverlo
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, animatedStyles]} />
      <View style={styles.buttonContainer}>
        <Button onPress={moveBox} title="Mover la caja" />
      </View>
    </View>
  );
}

// --- Estilos ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: "dodgerblue",
    borderRadius: 20,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 50,
  },
});
