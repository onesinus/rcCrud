import React, { useState, useEffect } from "react";
import { TextInput, StyleSheet, View, Button, Dimensions, Text, AsyncStorage } from "react-native";
import { MonoText } from '../components/StyledText';
import { TouchableOpacity } from "react-native-gesture-handler";

export default function FormJob({ navigation, route }){
    const params = route.params;
    const job = params ? params.job : undefined;

    const [name, setName]       = useState("");
    const [detail, setDetail]   = useState("");

    useEffect(() => {
        if (job) {
            setName(job.name);
            setDetail(job.detail);
        }
    }, [job]);   

    const onSave = () => {
        if (!name) {
            alert("Job name is required");
        }else if(!detail) {
            alert("Detail is required");
        }else{
            AsyncStorage.getItem('jobs', (error, result) => {
                if (!error) {
                    let currentJobs = JSON.parse(result);
                    currentJobs = currentJobs && currentJobs.length > 0 ? currentJobs : [];
                    if (!job) {                            
                        currentJobs.push({
                            id: currentJobs.length+1,
                            icon: 'md-school',
                            name,
                            detail
                        });
                    } else if(job) { // this is handle edit data;
                        currentJobs.some((objJob, idxJob) => {
                            if (objJob.id === job.id) {
                                currentJobs[idxJob]['name']     = name;
                                currentJobs[idxJob]['detail']   = detail;                                        
                            }
                            return false;
                        });
                    }
                    AsyncStorage.setItem('jobs', JSON.stringify(currentJobs));
                }
                navigation.replace('Root');
            });
        }
    }

    return (
        <View style={styles.container}>
            <MonoText style={styles.title}>Job Name</MonoText>
            <TextInput 
                style={styles.input}
                editable
                onChangeText={text => setName(text)}
                defaultValue={name}
            />
            <MonoText style={styles.title}>Job Detail</MonoText>
            <TextInput 
                style={[styles.input, styles.textarea]}
                editable
                multiline={true}
                onChangeText={text => setDetail(text)}
                value={detail}
            />
            <TouchableOpacity 
                style={[styles.button, styles.blue]}
                onPress={onSave}
            >
                <Text style={styles.textButton}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={[styles.button, styles.red]}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.textButton}>Cancel</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    blue: {
        backgroundColor: "blue"
    },
    red: {
        backgroundColor: "red"
    },
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
        paddingVertical: 20,
    },
    title: {
        fontSize: 18,
        paddingVertical: 20,
        textAlign: 'center'
    },
    input: {
        height: 28,
        borderColor: 'gray',
        borderBottomWidth: 1,
        paddingVertical: 20,
        marginLeft: 50,
        marginRight: 50
    },
    textarea: {
        height: 100,
        justifyContent: 'flex-start'
    },
    button: {
        alignItems: "center",
        padding: 10,
        marginLeft: 50,
        marginRight: 50,
        marginTop: 10
    },
    textButton: {
        color: 'white'
    }
});