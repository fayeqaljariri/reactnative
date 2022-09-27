import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  
} from "react-native";
import React, { useEffect, useState } from "react";

import axios from "axios";

export default function Home() {
  const [cats, setcats] = useState("");
  const [catid, setcatid] = useState("");
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [breed, setbreed] = useState("");
  const [updateBox, setUpdateBox] = useState(false);
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);

  //===============================================================
  const getAllCats = async () => {
    try {
      const res = await axios.get("http://localhost:5000/Cats");
      if (res.data.success) {
        setcats(res.data.results);
        setMessage("");
        setShow(true);
      } else throw Error;
    } catch (error) {
      if (!error.response.data.success) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Get Data, please try again");
    }
  };
  //===============================================================

  const handleUpdateClick = (cat) => {
    setUpdateBox(!updateBox);
    setcatid(cat.id);
    setname(cat.name);
    setdescription(cat.description);
    if (updateBox) updateCat(cat.id);
  };
  //===============================================================
  const updateCat = async (id) => {
    try {
      await axios.put(`http://localhost:5000/cats/${id}`, {
        name,
        description,
      });
      getAllCats();
    } catch (error) {
      console.log(error);
    }
  };

  //===================================================================
  const deleteCat = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/Cats/${id}`);
      getAllCats();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCats();
  });

  return (
    <>
      {show &&
        cats.map((cat, index) => (
          <View key={index} style={styles.container}>
            <View style={styles.text}>
              <Text>
                <Text style={styles.blodeText}> cat name: </Text>
                {cat.name}
              </Text>
              <Text>
                <Text style={styles.blodeText}> cat description: </Text>
                {cat.description}
              </Text>
              <Text>
                <Text style={styles.blodeText}> cat breed: </Text>
                {cat.breed}
              </Text>
            </View>
            <>
              {updateBox && catid === cat.id && (
                <View>
                  <TextInput
                    style={{
                      height: 40,
                      borderWidth: 2,
                      margin: 10,
                      padding: 4,
                    }}
                    type="text"
                    defaultValue={cat.name}
                    placeholder="cat name here"
                    onChangeText={(newText) => setname(newText)}
                  />

                  <TextInput
                    style={{
                      height: 40,
                      borderWidth: 2,
                      margin: 10,
                      padding: 4,
                    }}
                    placeholder="cat description here"
                    defaultValue={cat.description}
                    onChangeText={(newText) => setdescription(newText)}
                  />
                </View>
              )}
              <View style={styles.button}>
                <Button title="X" onPress={() => deleteCat(cat.id)} />

                <Button title="update" onPress={() => handleUpdateClick(cat)} />
              </View>
            </>
          </View>
        ))}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    hight: 100,
    backgroundColor: "pink",
    borderRadius: 10,
    borderColor: "black",
    marginBottom: 11,
  },
  button: {
    flex: 1,
    marginLeft: "auto",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  text: {
    flex: 1,
    marginRight: "auto",
  },
  blodeText: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 15
  }

});
