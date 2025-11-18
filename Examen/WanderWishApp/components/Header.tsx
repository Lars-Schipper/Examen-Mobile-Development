import { StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";


const Header = () => {
    return (
        <>
            <ThemedView style={styles.titleContainer}>
                <ThemedText style={styles.titleText}>Wanderers.nl</ThemedText>
            </ThemedView>
        </>
    )
}

const styles = StyleSheet.create({
    titleContainer: {
    alignItems: 'center',
    paddingBottom: 15,
    marginBottom: 20
  },
  titleText: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 20,
  },
})

export default Header;