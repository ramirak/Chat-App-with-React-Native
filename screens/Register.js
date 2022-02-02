import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Input } from "react-native-elements";
import { auth } from "../firebase";
const Register = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");

  const registerFB = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        user
          .updateProfile({
            displayName: name,
            photoURL: image
              ? image
              : "https://www.shareicon.net/data/512x512/2015/10/03/650430_users_512x512.png",
          })
          .then(() => {
            // Profile updated!
            // ...
          })
          .catch((error) => {});

        navigation.popToTop();
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;

        alert(errorMessage);
        // ..
      });
  };

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
          placeholder="Name"
          label="Name"
          leftIcon={{ type: "material", name: "badge" }}
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Input
          placeholder="Password"
          label="Password"
          leftIcon={{ type: "material", name: "lock" }}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        <Input
          placeholder="Enter your avatar link"
          label="Profile Picture"
          leftIcon={{ type: "material", name: "face" }}
          value={image}
          onChangeText={(text) => setImage(text)}
        />
        <TouchableOpacity style={styles.button} onPress={registerFB}>
          <Text style={styles.text}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;

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
