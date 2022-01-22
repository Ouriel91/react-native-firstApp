import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, 
    FlatList, Alert,ScrollView } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import { setTasksID, setTasks } from '../redux/actions';
import GlobalStyle from '../utils/GlobalStyle';
import Checkbox from 'expo-checkbox';

const Done = ({navigation}) => {

    const {tasks} = useSelector(state => state.taskReducer)
    const dispatch = useDispatch()

    const deleteTask = (id) => {
        const filteredTasks = tasks.filter(task => task.ID !== id)
        AsyncStorage.setItem('Tasks', JSON.stringify(filteredTasks))
            .then(() => {
                dispatch(setTasks(filteredTasks))
                Alert.alert('Success!', 'Task removed successfully.');
            }) 
            .catch((err) => console.log(err))
    }

    const checkTask = (id, newValue) => {
        const index = tasks.findIndex(task => task.ID === id);
        if (index > -1) {
            let newTasks = [...tasks];
            newTasks[index].Done = newValue;
            AsyncStorage.setItem('Tasks', JSON.stringify(newTasks))
                .then(() => {
                    dispatch(setTasks(newTasks));
                    Alert.alert('Success!', 'Task state is changed.');
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <ScrollView>
            <View styles={styles.body}>
                <FlatList 
                    keyExtractor={(item, index) => index.toString()}
                    data={tasks.filter(task => task.Done === true)}
                    renderItem={({item}) => (
                        <TouchableOpacity
                            style={styles.item}
                            onPress={() => {
                                dispatch(setTasksID(item.ID));
                                navigation.navigate('Task')
                            }}
                            >
                            <View style={styles.item_row}>
                                <Checkbox 
                                    style={{margin: 30}}
                                    value={item.Done}
                                    onValueChange={newValue => checkTask(item.ID, newValue)}
                                />
                                <View style={styles.item_body}>
                                    <Text style={styles.title} numberOfLines={1}>
                                        {item.Title}
                                    </Text>
                                    <Text style={[styles.subtitle, GlobalStyle.CustomFont]} numberOfLines={1}>
                                        {item.Desc}
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    style={styles.delete}
                                    onPress={() => deleteTask(item.ID)}>
                                    <FontAwesome5 
                                        name={'trash'}
                                        size={25}
                                        color={'#ff3636'}/>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    )}
                />            
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1
    },
    item_row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    item_body: {
        flex: 1,
    },
    delete: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    item: {
        marginHorizontal: 10,
        marginVertical: 7,
        paddingHorizontal: 10,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        borderRadius: 10,
        elevation: 5,
    },
    title: {
        color: '#000000',
        fontSize: 30,
        margin: 5,
    },
    subtitle: {
        color: '#999999',
        fontSize: 20,
        margin: 5,
    }
})

export default Done