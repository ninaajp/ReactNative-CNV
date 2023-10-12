import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { auth } from '../firebase/config'

class FormLogin extends Component {
    constructor(props){
        super(props)
        this.state = {
            mail:'',
            password: '',
            error: {
                email:'',
                password:''
              }
        }
    }

    loguearUsuario(email, password){

        if(this.state.email.length == 0){
            this.setState({error: {mail: 'Ingresar mail', password: ''}})
          } else if(this.state.pass.length == 0){
            this.setState({error: {mail: '', password: 'Ingresar contraseña'}})
        }

          this.setState({error:{mail:'', password:''}})

        auth.signInWithEmailAndPassword(email, password)
        .then((user)=> {
            this.props.navigation.navigate('TabNavigation')
        })
        .catch(err => this.setState({ err: err.message }))
    }
    //buscar y explicar bien la linea de error, si no la ense;an no ponerla y poner esta: .catch((e)=> console.log(e))


  render() {
    return (
      <View>
        <Text style={styles.title}>Logueate e ingresa</Text>
            <View>
                <TextInput
                    style = {styles.input}
                    placeholder = 'Email'
                    keyboardType = 'email-address'
                    value = {this.state.mail}
                    onChangeText = { (text) => this.setState({mail: text}) }
                />
                <Text>
                    {this.state.error.email && 'Ingrese su mail'}
                </Text>
                <TextInput
                    style = {styles.input}
                    placeholder = 'Contraseña'
                    keyboardType = 'email-address'
                    value = {this.state.password}
                    onChangeText = { (text) => this.setState({password: text}) }
                />
                <Text style={style.descripcion}>
                    {this.state.error.pass && 'Ingrese su contraseña'}
                </Text>

                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => this.loguearUsuario(this.state.mail, this.state.password)}
                >
                <Text style={styles.textBtn}>Iniciar sesión</Text>
                </TouchableOpacity>
            </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    title:{
        fontSize: 20,
        borderColor: "black",
        textAlign: 'center',
        fontWeight:"bold",
        width: 380,
        marginTop: 10,
        marginLeft:5,
        height:30,
        backgroundColor:"#00c2cb",
        color:"white"
    },
    input:{
        fontSize: 13,
        borderColor: 'black',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 5,
        margin: 10,  
        backgroundColor: "white",
        width: 360,
        padding:5
    },
    btn:{
        fontSize: 18,
        borderColor: 'blue',
        borderEndWidth: 1,
        borderStyle: 'solid',
        borderRadius: 5,
        marginVertical: 8,
        marginHorizontal: 16
    },
    textBtn:{
        fontSize: 15,
        borderColor: 'black',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 5,
        marginTop: 10,
        marginLeft: 40,
        backgroundColor: "#EEEFEF",
        width: 150
    },

})

export default FormLogin