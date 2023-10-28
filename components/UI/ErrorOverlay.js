
import { Text, StyleSheet, View, Button } from "react-native";
import { GlobalStyles } from "../../constants/styles";


function ErrorOverLay({message,OnConfirm}){
    return(<View style={styles.container}>
      <Text style={[styles.text,styles.title]}>An Error occuured!</Text>
      <Text style={styles.text}>{message}</Text>
      <Button title="Okay" onPress={OnConfirm}></Button>
    </View>)
} 

export default  ErrorOverLay
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        padding:24,
        backgroundColor:GlobalStyles.colors.primary500
    },
    text:{
        color:'white',
        textAlign:'center',
        marginBottom:8
    },
    title:{
        fontSize:20,
        fontWeight:'bold'
    }
})