import React , {useState,useEffect} from 'react';
import { StyleSheet ,Text, View, Button, Image} from 'react-native';
import CustomButton from '../utils/CustomButton';
import { Camera } from 'expo-camera';


const MyCamera = () => {

    const [hasPermission, setHasPermission] = useState(null);
    const [camera, setCamera] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [image, setImage] = useState(null);

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

    const takePicture = async () => {
        if(camera){
            const data = await camera.takePictureAsync(null)
            setImage(data.uri)
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
            <Button title="Take Picture" onPress={() => takePicture()} />
            {image && <Image source={{uri: image}} style={{flex: 1}}/>}
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