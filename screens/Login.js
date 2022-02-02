import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Input } from "react-native-elements";
import { auth } from "../firebase";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = () => {
    auth.signInWithEmailAndPassword(email, password).catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage);
    });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in, see docs for a list of available properties
        navigation.replace("Chat");
      } else {
        // User is signed out
        // ...
        navigation.canGoBack() && navigation.popToTop();
      }
    });
    return unsubscribe;
  }, []);

  return (
    <View>
      <View style={styles.container2}>
        <Image
          style={{ height: 70, width: 400 }}
          source={require("../assets/logo.png")}
        />
      </View>

      <View style={styles.container}>
        <Input
          placeholder="Email"
          label="Email"
          leftIcon={{ type: "material", name: "email" }}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          label="Password"
          leftIcon={{ type: "material", name: "lock" }}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={signIn}>
          <Text style={styles.text}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.text}>New user?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  button: {
    height: 40,
    width: 250,
    margin: 5,
    backgroundColor: "black",
    alignContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  text: {
    color: "white",
    fontSize: 16,
    margin: 5,
  },
  container: {
    alignItems: "center",
  },
  container2: {
    flex: 1,
    margin: 30,
    alignItems: "center",
    height: 40,
  },
});
