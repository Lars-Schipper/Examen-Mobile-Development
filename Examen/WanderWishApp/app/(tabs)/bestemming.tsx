import Header from "@/components/Header";
import { StyleSheet, View, TextInput, Button, Keyboard } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import { useState, useEffect } from "react";
import { BucketListItem } from ".";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link } from "expo-router";


const TabTwoScreen = () => {

  const [bestemming, setbestemming] = useState('');
  const [extraInformatie, setExtraInformatie] = useState('');
  const [bucketlist, setBucketlist] = useState<BucketListItem[]>([]);

  useEffect(() => {
    const getBucketlist = async () => {
      try {
        const bucketList = await AsyncStorage.getItem('bucketlist');
        if (bucketList !== null) {
          setBucketlist(JSON.parse(bucketList))
        }
      } catch (error) {
        console.log(error)
      }
    }
    getBucketlist();
  }, [bucketlist]);

  const addBucketItem = async () => {
    try {
      const newBucketItem: BucketListItem = {
        id: Math.random(),
        bestemming: bestemming,
        extraInfo: extraInformatie,
        isdone: false,
      }
      bucketlist.push(newBucketItem);
      setBucketlist(bucketlist);
      await AsyncStorage.setItem('bucketlist', JSON.stringify(bucketlist))
      setbestemming('');
      setExtraInformatie('');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SafeAreaView>
      <Header></Header>

      <View style={styles.wishlist}>
        <ThemedText>Wens bestemming</ThemedText>
      </View>

      <View>
        <ThemedText>Bestemmings naam:</ThemedText>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setbestemming(text)}
        />

        <ThemedText>extra info:</ThemedText>
        <TextInput
          style={styles.input}
          onChangeText={(text) => {setExtraInformatie(text)}}
          multiline
          numberOfLines={4}
          maxLength={40}
        />

        <View style={styles.fixToText}>
          <View style={styles.buttonContainer}>

            <Link
              href={{
                pathname: '/(tabs)'
              }} asChild>
              <Button
                color='red'
                title="Annuleren"
                onPress={() => alert('Wensbestemming toevoegen geanuleerd')}
              />
            </Link>


          </View>
          <View style={styles.buttonContainer}>
            <Button
              color='green'
              title="Opslaan"
              onPress={() => {
                addBucketItem()
                alert(bestemming + ' toegevoegd');
                Keyboard.dismiss();
              }
              }
            />
          </View>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wishlist: {
    alignItems: 'center',
    paddingBottom: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: 'white',
    borderRadius: 20,
    color: 'white'
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    gap: 40,
  },
  buttonContainer: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 20,
  }

});

export default TabTwoScreen;