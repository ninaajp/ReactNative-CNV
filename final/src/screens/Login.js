import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import FormLogin from '../components/FormLogin'

class Login extends Component {
  constructor(props){
    super(props)
  }
//chequear este console log y si sirve o sacarlo
  componentDidMount(){
    console.log(this.props)
  }
  render() {
    return (
      <View style={styles.container}>
        <FormLogin navigation={this.props.navigation} />
        <Text>
          ¿Aún no tienes una cuenta? 
          <TouchableOpacity
            onPress={()=> this.props.navigation.navigate('Register')}
          >Registrate aquí!</TouchableOpacity>
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center'
    }
})

export default Login