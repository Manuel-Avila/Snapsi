import PulsateButton from "@/components/ui/PulsateButton";
import { COLORS } from "@/constants/theme";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { useImagePicker } from "@/hooks/useImagePicker";
import { usePost } from "@/hooks/usePost";
import Ionicons from "@expo/vector-icons/Ionicons";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Image } from "expo-image";
import { Link, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  Gesture,
  GestureDetector,
  ScrollView,
  TextInput,
} from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { useMutation, useQueryClient } from "react-query";
import { createPostSchema } from "@/validators/postValidator";

const SCALE_ON_PRESS = 0.7;

export default function Create() {
  const { createPost } = usePost();
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<"front" | "back">("back");
  const [flashMode, setFlashMode] = useState<"off" | "on" | "auto">("off");
  const [takenPhoto, setTakenPhoto] = useState(null);
  const [takingPhoto, setTakingPhoto] = useState(false);
  const [caption, setCaption] = useState("");
  const [zoom, setZoom] = useState(0);
  const savedZoom = useRef(0);
  const cameraRef = useRef(null);
  const { pickImage } = useImagePicker();
  const router = useRouter();
  const { submitForm, isSubmitting } = useFormSubmit();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: createPost,
    onSuccess: (data) => {
      queryClient.invalidateQueries("posts");
      queryClient.invalidateQueries("myProfile");
      router.replace("/(tabs)/home");
      clearFields();
    },
    onError: () => {
      Toast.show({
        type: "error",
        text1: "Error creating post",
        text2: "Please try again later. ",
      });
    },
  });

  const handleShare = () => {
    Keyboard.dismiss();

    const formData = {
      imageUri: takenPhoto?.uri,
      caption: caption.trim(),
    };

    submitForm(formData, createPostSchema, mutate);
  };

  const changeCameraOrientation = () => {
    setFacing((prev) => (prev === "back" ? "front" : "back"));
  };

  const cycleFlashMode = () => {
    if (flashMode === "off") {
      setFlashMode("on");
    } else if (flashMode === "on") {
      setFlashMode("auto");
    } else {
      setFlashMode("off");
    }
  };

  const takePhoto = async () => {
    if (cameraRef.current) {
      setTakingPhoto(true);
      const photo = await cameraRef.current.takePictureAsync();
      setTakenPhoto(photo);
      setTakingPhoto(false);
    }
  };

  const handleChangeImage = () => {
    setTakenPhoto(null);
  };

  const handleSelectImage = async () => {
    const result = await pickImage();

    if (result.status === "success") {
      setTakenPhoto({ uri: result.uri });
    }
  };

  const clearFields = () => {
    setTakenPhoto(null);
    setCaption("");
    setZoom(0);
    savedZoom.current = 0;
  };

  useEffect(() => {
    (async () => {
      if (!permission?.granted) {
        await requestPermission();
      }
    })();
  }, []);

  const pinchGesture = Gesture.Pinch()
    .onUpdate((event) => {
      const scale = event.scale;
      const newZoom = savedZoom.current + (scale - 1) * 1;
      const clampedZoom = Math.max(0, Math.min(newZoom, 1));
      setZoom(clampedZoom);
    })
    .onEnd(() => {
      savedZoom.current = zoom;
    })
    .runOnJS(true);

  if (!permission?.granted) {
    return (
      <>
        <GoBackButton />
        <Pressable
          style={waitingPermissionsStyles.container}
          onPress={requestPermission}
        >
          <Ionicons
            name="camera-outline"
            style={waitingPermissionsStyles.icon}
          />
          <Text style={waitingPermissionsStyles.text}>
            Waiting for permissions, press again to retry...
          </Text>
        </Pressable>
      </>
    );
  }

  if (takenPhoto) {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.flexGrow}
          keyboardShouldPersistTaps="handled"
        >
          <GoBackButton />
          <Text style={styles.title}>New Post</Text>
          <View style={styles.postImageContainer}>
            <Image
              style={styles.postImage}
              source={{ uri: takenPhoto.uri }}
              contentFit="cover"
            />
            <PulsateButton
              onPress={handleChangeImage}
              style={styles.changeButton}
            >
              <Ionicons name="image-outline" style={styles.changeImageText} />
              <Text style={styles.changeImageText}>Change</Text>
            </PulsateButton>
          </View>
          <TextInput
            style={styles.captionInput}
            placeholder="Add a caption..."
            placeholderTextColor={COLORS.gray}
            maxLength={500}
            multiline
            value={caption}
            onChangeText={setCaption}
          />
          <PulsateButton
            onPress={handleShare}
            disabled={isSubmitting || isLoading}
            style={styles.shareButton}
          >
            <Text style={styles.shareButtonText}>Share</Text>
          </PulsateButton>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  return (
    <View style={styles.container}>
      <GoBackButton />
      <PulsateButton
        onPress={cycleFlashMode}
        scaleOnPress={SCALE_ON_PRESS}
        style={cameraStyles.flashButton}
      >
        {flashMode === "off" && (
          <Ionicons name="flash-off-sharp" style={styles.icon} />
        )}
        {flashMode === "on" && (
          <Ionicons name="flash-outline" style={styles.icon} />
        )}
        {flashMode === "auto" && (
          <View>
            <Ionicons name="flash-outline" style={styles.icon} />
            <Text style={cameraStyles.autoFlashText}>A</Text>
          </View>
        )}
      </PulsateButton>
      <GestureDetector gesture={pinchGesture}>
        <CameraView
          style={cameraStyles.cameraView}
          ref={cameraRef}
          facing={facing}
          flash={flashMode}
          zoom={zoom}
          animateShutter={false}
          mirror={true}
          ratio="16:9"
        />
      </GestureDetector>

      <View style={cameraStyles.actionsContainer}>
        <View style={cameraStyles.buttonContainer}>
          <PulsateButton
            onPress={handleSelectImage}
            scaleOnPress={SCALE_ON_PRESS}
          >
            <Ionicons name="image-outline" style={styles.icon} />
          </PulsateButton>
          <PulsateButton
            onPress={takePhoto}
            scaleOnPress={0.8}
            disabled={takingPhoto}
          >
            <View style={cameraStyles.captureButtonCircle} />
          </PulsateButton>
          <PulsateButton
            onPress={changeCameraOrientation}
            scaleOnPress={SCALE_ON_PRESS}
          >
            <Ionicons name="camera-reverse-outline" style={styles.icon} />
          </PulsateButton>
        </View>
      </View>
    </View>
  );
}

function GoBackButton() {
  return (
    <Link href="/(tabs)/home" style={styles.arrowBackContainer} asChild>
      <PulsateButton scaleOnPress={SCALE_ON_PRESS}>
        <Ionicons name="arrow-back-outline" style={styles.icon} />
      </PulsateButton>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  arrowBackContainer: {
    position: "absolute",
    top: 30,
    left: 20,
    zIndex: 1,
  },
  icon: {
    color: COLORS.text,
    fontSize: 32,
  },
  title: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 30,
  },
  postImageContainer: {
    margin: 5,
  },
  postImage: {
    width: "100%",
    aspectRatio: 1,
  },
  captionInput: {
    color: COLORS.text,
    fontSize: 16,
    marginVertical: 10,
    marginHorizontal: 20,
    flex: 1,
    textAlignVertical: "top",
  },
  shareButton: {
    margin: 20,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
  },
  shareButtonText: {
    color: COLORS.text,
    fontSize: 18,
    textAlign: "center",
  },
  changeButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  changeImageText: {
    color: COLORS.text,
    fontSize: 14,
  },
  flexGrow: {
    flexGrow: 1,
  },
});

const cameraStyles = StyleSheet.create({
  cameraView: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  actionsContainer: {
    position: "absolute",
    bottom: 60,
    alignItems: "center",
    width: "100%",
    backgroundColor: "transparent",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "70%",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
  },
  captureButtonCircle: {
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 50,
    width: 70,
    height: 70,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  autoFlashText: {
    color: COLORS.text,
    position: "absolute",
    top: -7,
    right: -7,
  },
  flashButton: {
    position: "absolute",
    top: 30,
    right: 20,
    zIndex: 1,
  },
});

const waitingPermissionsStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },

  icon: {
    fontSize: 80,
    color: COLORS.gray,
    marginBottom: 10,
  },
  text: {
    fontSize: 15,
    color: COLORS.gray,
    textAlign: "center",
    paddingHorizontal: 80,
  },
});
