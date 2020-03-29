import React, { useState, useEffect } from "react";
import { StyleSheet, Button, AsyncStorage, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import OptionButton from "../components/OptionButton";
import { MonoText } from "../components/StyledText";
import { FontAwesome } from '@expo/vector-icons';

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
                                <View
                                    key={job.id}                            
                                >
                                    <OptionButton 
                                        icon={job.icon}
                                        label={job.name}
                                    />
                                    <View style={styles.actions}>
                                        <FontAwesome.Button 
                                            name="info-circle" 
                                            backgroundColor="#3b5998"
                                            size={15}
                                            onPress={() => navigation.navigate("DetailJob", {
                                                job: job
                                            })}
                                        >
                                            Detail
                                        </FontAwesome.Button>
                                        <FontAwesome.Button 
                                            name="pencil" 
                                            backgroundColor="green"
                                            size={15}
                                        >
                                            Edit
                                        </FontAwesome.Button>
                                        <FontAwesome.Button 
                                            name="trash" 
                                            backgroundColor="red"
                                            size={15}
                                        >
                                            Delete
                                        </FontAwesome.Button>
                                    </View>
                                </View>
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
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
})