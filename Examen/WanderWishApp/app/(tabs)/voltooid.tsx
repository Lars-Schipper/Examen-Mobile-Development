import Header from "@/components/Header";
import { ThemedText } from "@/components/ThemedText";
import { View, StyleSheet, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Checkbox from "expo-checkbox";
import { Link } from "expo-router";
import { useState, useEffect } from "react";

import * as Location from 'expo-location';
import * as Haptics from 'expo-haptics'

export default function voltooid() {

    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [plaats, setPlaats] = useState('Nieuwegein');

    useEffect(() => {
        async function getCurrentLocation() {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        }
        getCurrentLocation();

    }, []);

    return (
        <>
            <SafeAreaView>
                <Header></Header>

                <View style={styles.header}>
                    <ThemedText style={styles.headertext}>Bestemming voltooien?</ThemedText>
                </View>

                <View style={styles.BestemmingsContainer}>
                    <ThemedText>Bestemmings naam:</ThemedText>
                    <ThemedText style={styles.bestemming}>--Placeholder--</ThemedText>
                </View>

                <View style={styles.ExtraContainer}>
                    <ThemedText>extra informatie:</ThemedText>
                    <ThemedText style={styles.info}>--Placeholder--</ThemedText>
                </View>


                <View style={styles.showLocation}>
                    <Checkbox></Checkbox>
                    <ThemedText>Huidige locatie Toevoegen</ThemedText>
                </View>

                <View style={styles.huidigeLocatie}>
                    <ThemedText>LAT: {location?.coords.latitude}</ThemedText>
                    <ThemedText>LONG: {location?.coords.longitude}</ThemedText>
                    <ThemedText>Locatie: {plaats}</ThemedText>
                </View>

                <View style={styles.fixToText}>
                    <View style={styles.buttonContainer}>

                        <Link
                            href={{
                                pathname: '/(tabs)'
                            }} asChild>
                            <Button
                                color='red'
                                title="Annuleren"
                                onPress={() => alert('Bestemming voltooien geannuleerd')}
                            />
                        </Link>


                    </View>
                    <View style={styles.buttonContainer}>
                        <Button
                            color='green'
                            title="Opslaan"
                            onPress={() => {
                                alert('--Placeholder--' + ' voltooid');
                                Haptics.notificationAsync(
                                    Haptics.NotificationFeedbackType.Warning
                                )
                            }
                            }
                        />
                    </View>
                </View>
            </SafeAreaView>
        </>
    )
}



const styles = StyleSheet.create({
    headertext: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    header: {
        alignItems: 'center',
        marginBottom: 20
    },
    BestemmingsContainer: {
        marginStart: 25,
    },
    bestemming: {
        marginTop: 5,
        fontSize: 20,
    },
    ExtraContainer: {
        marginStart: 25,
        marginTop: 50,
    },
    info: {
        fontSize: 20
    },
    showLocation: {
        flexDirection: 'row',
        marginTop: 50,
        marginStart: 20,
        gap: 15
    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 50,
        gap: 40,
    },
    buttonContainer: {
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 20,
    },
    huidigeLocatie: {
        marginStart: 40,
    }

}) 