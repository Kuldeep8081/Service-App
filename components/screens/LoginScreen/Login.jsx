//rnf
import {
    View,
     Text,
     Image,
     StyleSheet,
     TouchableOpacity
    } from 'react-native'
 
 import * as WebBrowser from "expo-web-browser";
 import React from 'react'
 import Colors from './../../../Utills/Colors'
 import {useWarmUpBrowser} from './../../../hooks/warmUpbrowser'
 import { useOAuth } from "@clerk/clerk-expo";
 
 WebBrowser.maybeCompleteAuthSession();
 
 export default function Login(){
   useWarmUpBrowser();
   const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
   const onPress = React.useCallback(async () => {
     try {
       const { createdSessionId, signIn, signUp, setActive } =
         await startOAuthFlow();
 
       if (createdSessionId) {
         setActive({ session: createdSessionId });
       } else {
         // Use signIn or signUp for next steps such as MFA
       }
     } catch (err) {
       console.error("OAuth error", err);
     }
   }, []);
   return (
     <View style={styles.container}>
       <Image source={require('./../../../assets/Login.png')}
           style={styles.loginImage}
       />
 
       <View style={styles.subContainer}>
         <Text style={{fontSize:22,color:Colors.WHITE,textAlign:'center'}}>
             Let's Find <Text style={{fontWeight:'bold'}}>Professional Cleaning and repair</Text> Services
         </Text>
 
          <Text style={{fontSize:17,color:Colors.WHITE,textAlign:'center',marginTop:20}}>
          Best App to find services near you which deliver you a professional services
          </Text>
 
          <TouchableOpacity style={styles.button} onPress={onPress}>
           <Text style={{
             textAlign:'center',
             fontSize:17,
             color:Colors.PRIMARY,
 
             }}>Let's Get Started</Text>
          </TouchableOpacity>
       </View>
     </View>
   )
 }
 //rns
 const styles = StyleSheet.create({
     container:{
          height:'100%',
          width:'100%',
          alignItems:'center'
     },
     loginImage:{
         marginTop:40,
         height:'70%',
         width:230,
 
     },
     subContainer:{
         width:'100%',
         backgroundColor:Colors.PRIMARY,
         height:'40%',
         marginTop:-100,
         borderTopLeftRadius:30,
         borderTopRightRadius:30,
         padding:10
         
     },
     button:{
         padding:15,
         backgroundColor:Colors.WHITE,
         marginTop:40,
         borderRadius:30
     }
 })
 