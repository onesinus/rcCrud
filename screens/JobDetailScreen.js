import React from "react";
import { Text, StyleSheet, View } from "react-native";

export default function JobDetail({ route }) {
    const { job } = route.params;
    return (
        <View style={styles.container}>
            <Text style={styles.name}>
                {job.name}
            </Text>
            <Text style={styles.detail}>
                {job.detail}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column'
    },
    name: {
        marginTop: 20,
        textAlign: 'center',
        fontSize: 24
    },
    detail: {
        marginTop: 20,
        fontSize: 18
    }
});