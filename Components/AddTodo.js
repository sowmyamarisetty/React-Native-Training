import React, { useState, useEffect } from "react";
import {
    SafeAreaView,
    TextInput,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    AsyncStorage
} from "react-native";

import DatePicker from 'react-native-date-picker'
import { insertNewTodo, queryAllTodosStatusFalse,queryAllTodosStatusTrue } from "./Schema/Index";




const AddTodo = ({ navigation, route }) => {


    const [todoContent, onChangeTodoContent] = useState('');

    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    // const [currentDate, setCurrentDate] = useState('');
    const [status,setStatus] = useState('Working')
    const[category,setCategory] = useState('false')
    const { useremail } = route.params


    // useEffect(() => {
    //     var day = new Date(date).getDate(); //Current Date
    //     var month = new Date(date).getMonth() + 1; //Current Month
    //     var year = new Date(date).getFullYear(); //Current Year
    //     setCurrentDate(
    //         day + '/' + month + '/' + year

    //     );
    // }, [date]);

    const handleStatus = ()=>{
        if(status==='Working'){
            setStatus('Home');
        }
        else{
            setStatus('Working');
        }
    }

    const handleSubmitTodo = async () => {

        if (todoContent.length === 0) {
                alert('Todo Content is Empty')
            }
        else{
            console.log("Submitting todos");
            insertNewTodo({
                body:todoContent,
                expiry: date.toString(),
                category:status,
                status: category,
                user:useremail,
            }).then(resp=>{
                console.log(resp);
                queryAllTodosStatusFalse(useremail).then(resp=>console.log(resp));
                navigation.navigate('TodoList',{useremail})
            }).catch(err=>{
                console.log("Error",err)
            })
        }
        
        // if (todoContent.length === 0) {
        //     alert('Todo Content is Empty')
        // }
        // else {
        //     console.log("submitting todo");
        //     try {
        //         const details = {
        //             body: todoContent,
        //             deadline: currentDate,
        //             status: status
        //         }
        //         const temp = await AsyncStorage.getItem(useremail)
        //         var userData;
        //         if (temp != null) {
        //             userData = JSON.parse(temp);
        //         } else {
        //             userData = []
        //         }
        //         userData.push(details);

        //         await AsyncStorage.setItem(
        //             useremail, JSON.stringify(userData)
        //         );

        //         console.log(await AsyncStorage.getItem(useremail))

        //     } catch (error) {
        //         console.log(error);
        //     }
        //     navigation.navigate('TodoList', { useremail })
        // }
    }
    const back = () => {
        console.log("back");
    }

    return (

        <ScrollView style={styles.mainContainer}>
            <KeyboardAvoidingView style={styles.bodyContainer}>

                <View style={styles.bodyView}>
                    <Text style={styles.bodyViewTitleText}>
                        Todo App
                    </Text>
                </View>

                <SafeAreaView style={styles.Container}>
                    <View style={styles.formContainer}>

                        <View style={styles.inputContainer}>
                            <TextInput
                                multiline
                                maxNumberOfLines={4}
                                onChangeText={onChangeTodoContent}
                                value={todoContent}
                                style={styles.input}
                                maxLength={180}
                                placeholder="Your Todo Body"
                            />
                        </View>

                        <View styles={styles.buttonView}>

                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => setOpen(true)}
                            >
                                <Text style={styles.buttonText}>Set Expiry Date</Text>

                            </TouchableOpacity>


                            <DatePicker
                                modal
                                // mode="date"
                                open={open}
                                date={date}
                                minimumDate={new Date()}
                                onConfirm={(date) => {
                                    setOpen(false)
                                    setDate(date)
                                }}
                                onCancel={() => {
                                    setOpen(false)
                                }}
                            />

                            <TouchableOpacity
                                style={styles.button}
                                 onPress={handleStatus}
                                >
                                <Text style={styles.buttonText}>Category: {status}</Text>
                                </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.buttonView}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                handleSubmitTodo();

                            }}
                        >
                            <Text style={styles.buttonText}>Save</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                navigation.navigate('TodoList', { useremail })
                            }}
                        >
                            <Text style={styles.buttonText}>Go Back</Text>
                        </TouchableOpacity>
                    </View>




                </SafeAreaView>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
        backgroundColor: "#2246a9",
    },
    bodyContainer: {
        flex: 1,
        alignItems: "center",
        display: "flex",
        flexDirection: "column",

        width: "100%",
    },
    bodyView: {
        alignItems: "center",
        height: 80,
        width: "100%",
    },
    bodyViewTitleText: {
        fontFamily: "Cochin",
        fontSize: 30,
        fontWeight: "800",
        color: "#fff",
    },
    Container: {
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        flex: 1,
        width: "100%",
    },
    formContainer: {
        backgroundColor: "#ffffff",
        marginTop: 40,
        borderRadius: 30,
        borderColor: "#000000",
        width: "100%",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly"
    },
    inputContainer: {
        alignContent: "center",
        width: "100%",
    },
    input: {
        height: 90,
        margin: 12,
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "grey",

    },
    buttonView: {
        marginTop: 60,
        alignItems: "center",
        display: "flex",
        width: "100%",
    },
    button: {
        alignItems: "center",
        backgroundColor: "#98447e",
        padding: 10,
        width: 200,
        display: "flex",
        borderRadius: 20,
        margin: 20,
    },
    buttonText: {
        color: "#ffffff",
        fontSize: 15,
        fontWeight: "600",
    },
});

export default AddTodo;