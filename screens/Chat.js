import React, { useLayoutEffect, useState, useCallback } from "react";

import { GiftedChat } from "react-native-gifted-chat";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { auth, db } from "../firebase";
import { MaterialIcons } from "@expo/vector-icons";
import { Avatar } from "react-native-elements/dist/avatar/Avatar";

const Chat = ({ navigation }) => {
  const [messages, setMessages] = useState([]);

  useLayoutEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            _id: doc.data()._id,
            createdAt: doc.data().createdAt.toDate(),
            text: doc.data().text,
            user: doc.data().user,
          }))
        )
      );
    return unsubscribe;
  });

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user } = messages[0];

    db.collection("chats").add({
      _id,
      createdAt,
      text,
      user,
    });
  }, []);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={signOut} style={{ margin: 10 }}>
          <MaterialIcons name="logout" size={24} color="black" />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <View style={{ margin: 10 }}>
          <Avatar
            rounded
            source={{
              uri: auth?.currentUser?.photoURL,
            }}
          />
        </View>
      ),
    });
  });

  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        // Sign-out successful.
        navigation.replace("Login");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={true}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: auth?.currentUser?.email,
        name: auth?.currentUser?.displayName,
        avatar: auth?.currentUser?.photoURL,
      }}
    />
  );
};

export default Chat;

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
});
