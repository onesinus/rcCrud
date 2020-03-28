import React, { useState, useEffect } from "react";
import { StyleSheet, Button, AsyncStorage, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import OptionButton from "../components/OptionButton";
import { MonoText } from "../components/StyledText";

export default function JobScreen({ navigation }) {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('jobs', (error, result) => {
            if (result) {
                setJobs(JSON.parse(result));
            }
        });
    }, []);

    return (
        <>
            <Button 
                title="Add Job"
                color="#841584"
                accessibilityLabel="Add Job Data"
                onPress={() => {
                    navigation.navigate('FormJob')
                }}
            />
            {
                jobs.length > 0 &&
                <ScrollView style={styles.container}>
                    {
                        jobs.map(job => {
                            return (
                                <OptionButton 
                                    key={job.id}
                                    icon={job.icon}
                                    label={job.name}
                                />
                            )
                        })
                    }
                </ScrollView>
            }
            {
                jobs.length <= 0 &&
                <MonoText style={styles.center}>
                    <Text>No Jobs avaiable...</Text>
                </MonoText>
            }
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa'
    },
    center: {
        textAlign: 'center',
        marginTop: 10
    }
})