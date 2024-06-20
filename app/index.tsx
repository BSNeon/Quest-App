import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Button, Alert, PermissionsAndroid } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Index() {

  const [permissionGranted, setPermissionGranted] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    checkPermission();
  }, []);

  const checkPermission = async () => {
    try {
      const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
      if (granted) {
        setPermissionGranted(true);
        navigation.navigate("loading");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const requestPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: "File Access Permission",
          message: "Neon needs access to your files to get started.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setPermissionGranted(true);
        navigation.navigate("loading");
      } else {
        Alert.alert("Permission Denied", "You need to grant permission to access the files.");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Neon! 🎉</Text>
      <Text style={styles.subtitle}>
        In order to get started, we need access to your local files. If you
        didn't accept the file access prompt, you can do so by going to your
        settings and enabling the permission. If you've done that, please
        restart the app.
      </Text>
      <Button title="Grant Permission" onPress={requestPermission} color="#6200EE" />
      {!permissionGranted && (
        <Text style={styles.warning}>
          You need to grant file access permission to continue.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212", // Dark background color
    padding: 20,
  },
  title: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#ffffff", // White text color
    textAlign: "center",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: "#cccccc", // Light grey text color
    textAlign: "center",
    marginBottom: 20,
  },
  warning: {
    fontSize: 16,
    color: "#FF0000", // Red text color for warning
    textAlign: "center",
    marginTop: 20,
  },
});
