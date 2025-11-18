import { ThemedText } from "@/components/ThemedText"
import { SafeAreaView } from "react-native-safe-area-context"
import { StyleSheet, View, FlatList, TouchableOpacity, } from "react-native"
import BucketList from "@/components/BucketList"
import { Ionicons } from "@expo/vector-icons";
import Header from "@/components/Header";
import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link } from "expo-router";


export type BucketListItem = {
  id: number,
  bestemming: string,
  extraInfo: string,
  isdone: boolean
}

const HomeScreen = () => {

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


  const deleteBucketItem = async (id: number) => {
    try {
      const newBucketList = bucketlist.filter((item) => item.id !== id);
      await AsyncStorage.setItem('bucketlist', JSON.stringify(newBucketList));
      setBucketlist(newBucketList);
    } catch (error) {
      console.log(error);
    }
  }

  const isDone = async (id: number) => {
    try {
      const newBucketlist = bucketlist.map((item) => {
        if (item.id === id ) {
          item.isdone = !item.isdone;
        }
        return item;
      });
      await AsyncStorage.setItem('bucketlist', JSON.stringify(newBucketlist));
      setBucketlist(newBucketlist);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <SafeAreaView>

        <Header></Header>

        <View style={styles.wishlist}>
          <ThemedText>Wander Wishlist</ThemedText>
        </View>

        <FlatList
          data={[...bucketlist].reverse()}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <BucketList item={item} deleteItem={deleteBucketItem} isDone={isDone}></BucketList>
          )}
        />

        <View style={styles.addNewbutton}>
          <Link href={{
            pathname: '/(tabs)/bestemming',
          }} asChild >
            <TouchableOpacity>
              <Ionicons name='add-circle-outline' size={40} color={'green'}></Ionicons>
            </TouchableOpacity>

          </Link>
        </View>

      </SafeAreaView>
    </>
  )
};

const styles = StyleSheet.create({
  wishlist: {
    alignItems: 'center',
    paddingBottom: 10,
  },
  addNewbutton: {
    alignItems: 'flex-end'
  }
});

export default HomeScreen;