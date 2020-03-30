import React, { useState, useEffect } from "react";
import { StyleSheet, Button, AsyncStorage, Text, View, TextInput } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import OptionButton from "../components/OptionButton";
import { MonoText } from "../components/StyledText";
import { FontAwesome } from '@expo/vector-icons';
import { ConfirmDialog } from 'react-native-simple-dialogs';

export default function JobScreen({ navigation }) {
    const [jobs, setJobs] = useState([]);
    const [constJobs, setConstJobs] = useState([]);

    const [dataDeleted, setdataDeleted] = useState(undefined);

    const fetchJobs = () => {
        AsyncStorage.getItem('jobs', (error, result) => {
            if (result) {
                setJobs(JSON.parse(result));
                setConstJobs(JSON.parse(result));
            }
        });
    }

    const deleteJob = (idJob) => {
        AsyncStorage.getItem('jobs', (error, result) => {
            if (result) {
                let jobs = JSON.parse(result);
                jobs.some((job, idxJob) => {
                    if (job.id === idJob) {
                        jobs.splice(idxJob,1);
                        AsyncStorage.setItem('jobs', JSON.stringify(jobs));
                        return true; // return true to .some()
                    }
                    return false;
                });
                alert(`${dataDeleted.name} has been deleted`);
                setdataDeleted(undefined);
                fetchJobs();
            }
        });
    }

    const findJob = (searchValue) => {
        let tempJobs = constJobs.filter(constJob => {
            return constJob.name.toLowerCase().includes(searchValue.toLowerCase());
        });
        setJobs(tempJobs);
    }

    useEffect(() => {
        fetchJobs();
    }, []);

    return (
        <>
            <TextInput
                style={styles.input}
                placeholder="Find Job"
                onChangeText={text => findJob(text)}
            />
            <Button 
                title="Add Job"
                color="#841584"
                accessibilityLabel="Add Job Data"
                onPress={() => {
                    navigation.navigate('FormJob')
                }}
            />
            {
                dataDeleted &&
                <ConfirmDialog
                    title="Confirm Delete Job"
                    onTouchOutside={() => setdataDeleted(undefined)} 
                    positiveButton={{
                        title: "YES",
                        onPress: () => deleteJob(dataDeleted.id)
                    }}
                    negativeButton={{
                        title: "NO",
                        onPress: () => setdataDeleted(undefined)
                    }}
                >
                    <View>
                        <Text>Are you sure you want to Delete #'{dataDeleted.name}'?</Text>
                    </View>
                </ConfirmDialog>
            }
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
                                                job
                                            })}
                                        >
                                            Detail
                                        </FontAwesome.Button>
                                        <FontAwesome.Button 
                                            name="pencil" 
                                            backgroundColor="green"
                                            size={15}
                                            onPress={() => navigation.navigate("FormJob", {
                                                job
                                            })}
                                        >
                                            Edit
                                        </FontAwesome.Button>
                                        <FontAwesome.Button 
                                            name="trash" 
                                            backgroundColor="red"
                                            size={15}
                                            onPress={() => setdataDeleted(job)}
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
    },
    input: {
        height: 28,
        borderColor: 'gray',
        borderWidth: 1,
        paddingVertical: 20
    },
})