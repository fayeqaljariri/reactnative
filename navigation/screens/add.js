import React, { useState } from "react";
import axios from "axios";

import {  TextInput, View, Button } from "react-native";

export default function Add() {
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [breed, setbreed] = useState("");
  const [message, setMessage] = useState("");

  const createNewCat = async (e) => {
    try {
      const cat = {
        name,
        description,
        breed,
      };
      console.log(cat);
      const result = await axios.post("http://localhost:5000/Cats", cat);
      if (result.data.success) {
        setMessage("The CAT has been added");
      }
    } catch (error) {
      if (!error.response.data.success) {
        setMessage(error.response.data.message);
      }
    }
  };

  return (
    <View style={{ padding: 10 }}>
      <TextInput
        style={{ height: 40, borderWidth: 2, margin: 10, padding: 4 }}
        placeholder="Cat name"
        onChangeText={(newText) => setname(newText)}
      />
      <TextInput
        style={{ height: 40, borderWidth: 2, margin: 10, padding: 4 }}
        placeholder="description for cat"
        onChangeText={(newText) => setdescription(newText)}
      />
      <TextInput
        style={{ height: 40, borderWidth: 2, margin: 10, padding: 4 }}
        placeholder="breed for cat"
        onChangeText={(newText) => setbreed(newText)}
      />
      <Button  title="add" onPress={() => createNewCat()} />
    </View>
  );
}
