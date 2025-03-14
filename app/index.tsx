import { Text, View,Button, TouchableOpacity,StyleSheet} from "react-native";
import { RootState } from "../store/store";
import {useSelector,useDispatch} from 'react-redux'
import { decrement, increment } from "../store/counterReducer";
import { useOAuth } from '@clerk/clerk-expo';

export default function Index() {

  const {value} = useSelector((state: RootState)=> state.counter) 
  const dispatch = useDispatch()

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_facebook' });
  const { startOAuthFlow: startGoogleOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

  const handleFacebookLogin = async () => {
    try{
      const { createdSessionId, setActive } = await startOAuthFlow();
      console.log("---Facebook--->", createdSessionId)
      if(createdSessionId){
        setActive!({session:createdSessionId});
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleGoogleLogin = async () => {
    try{
      const { createdSessionId, setActive } = await startGoogleOAuthFlow();
      console.log("---Google--->", createdSessionId)
      if(createdSessionId){
        setActive!({session:createdSessionId});
      }
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <View className="flex-1 justify-center items-center">
      <>
      <Text>Welcome to Telugu Match Makers {value}</Text>
      <Button title="+" onPress={()=>dispatch(increment())}></Button>
      <Button title="-" onPress={()=>dispatch(decrement())}></Button>
      </>
      <TouchableOpacity style={styles.loginButton} onPress={() => handleFacebookLogin()}>
          <Text>Sign in with Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress={() => handleGoogleLogin()}>
          <Text>Sign in with Google</Text>
        </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  loginButton:{
    backgroundColor:'#FFF',
    padding:20,
    borderRadius:8,
    borderWidth:StyleSheet.hairlineWidth,
    borderColor:'#acacac',
    margin:10
  }
})

