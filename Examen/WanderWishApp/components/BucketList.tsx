import { BucketListItem } from "@/app/(tabs)";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Checkbox } from "expo-checkbox";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { linkTo } from "expo-router/build/global-state/routing";

const BucketList = ({ item, deleteItem, isDone }: { item: BucketListItem, deleteItem: (id: number) => void, isDone: (is: number) => void }) => {

    return (
        <>
            <ThemedView style={styles.bucketlistItem}>
                <View style={styles.checkboxtext}>

                    <Checkbox value={item.isdone} onValueChange={() => { isDone(item.id); linkTo('/(tabs)/voltooid')}}></Checkbox>

                    <Link
                        href={{
                            pathname: '/(tabs)/bestemming',
                            params: { id: item.id }
                        }}
                    >
                        <ThemedText>{item.bestemming}</ThemedText>
                    </Link>

                </View>
                <View style={styles.deleteButton}>
                    <TouchableOpacity onPress={() => { deleteItem(item.id); alert('deleted Bucketlist item: ' + item.bestemming) }}>
                        <Ionicons name='close-circle-outline' size={26} color={'red'}></Ionicons>
                    </TouchableOpacity>
                </View>
            </ThemedView>
        </>
    )
}

export default BucketList;

const styles = StyleSheet.create({
    checkboxtext: {
        flex: 1,
        flexDirection: 'row',
        gap: 10,
        margin: 15,
    },
    bucketlistItem: {
        borderRadius: 20,
        marginBottom: 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    deleteButton: {
        marginEnd: 10,
        justifyContent: 'center'
    },
    link: {
        minHeight: 20,
        minWidth: 20,
    },
})