import React , {useState,useEffect} from 'react';
import { StyleSheet ,Text, View, Button, Image ,Alert} from 'react-native';
import CustomButton from '../utils/CustomButton';
import { Camera } from 'expo-camera';
import {useSelector, useDispatch} from 'react-redux'
import { setTasks } from '../redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyCamera = ({navigation, route}) => {

    const [hasPermission, setHasPermission] = useState(null);
    const [camera, setCamera] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const { tasks } = useSelector(state => state.taskReducer);
    const dispatch = useDispatch()

    //camera permissions
    useEffect(() => {
            (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
            })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const captureHandler = async () => {
        if(camera){
            const data = await camera.takePictureAsync(null)
            const path = data.uri
            updateTask(route.params.id, path)
        }
    }

    const updateTask = (id, path) => {
        const index = tasks.findIndex(task => task.ID === id);
        if (index > -1) {
            let newTasks = [...tasks];
            newTasks[index].Image = path;
            AsyncStorage.setItem('Tasks', JSON.stringify(newTasks))
                .then(() => {
                    dispatch(setTasks(newTasks));
                    Alert.alert('Success!', 'Task image is saved.');
                    navigation.goBack();
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <View style={{ flex: 1}}>
        <View style={styles.cameraContainer}>
                <Camera 
                    ref={ref => setCamera(ref)}
                    style={styles.fixedRatio} 
                    type={type}
                    ratio={'1:1'} />
        </View>
        <Button
                title="Flip Image"
                onPress={() => {
                    setType(
                        type === Camera.Constants.Type.back ? 
                        Camera.Constants.Type.front 
                        : Camera.Constants.Type.back
                    )
                }}>
            </Button>
            <Button title="Take Picture" onPress={() => captureHandler()} />
    </View>
    )
}

const styles = StyleSheet.create({
    cameraContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    fixedRatio:{
        flex: 1,
        aspectRatio: 1
    }
})

export default MyCamera