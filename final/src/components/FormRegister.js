import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../firebase/config'

class FormRegister extends Component {
    constructor(props){
        super(props)
        this.state = {
            name:'',
            mail: '',
            password: '',
            minibio:'', 
            fotoPerfil: '',
            cargando: '' //tenemos que hacer el loader 
        }
    }//si el usuario no hizo logout al recargar la aplicación deberá aparecer un activity indicator o leyenda "cargando…" 
    //mientras la aplicación chequea que el usuario "esté en sesión". Terminado el chequeo se verá la pantalla de login 
    //o la página principal según corresponda. 
    registrarUsuario(name, email, password){
        auth.createUserWithEmailAndPassword(email, password)
        .then(user => db.collection('users').add({
                owner: this.state.mail,
                createdAt: Date.now(),
                name: this.state.name,
                minibio: this.state.minibio,
                fotoPerfil: this.state.fotoPerfil
            })
        )
        .then((resp) => {this.setState({
            name: '', 
            mail: '', 
            password: '',
            minibio: '',
            fotoPerfil: '',
        })})
        .catch( err => console.log(err))
    }

    render() {
        if (this.state.cargando) {
            return (
              <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="white" />
                <Text style={styles.title}>Cargando...</Text>
              </View>
            );
          }
        return (
        <View>
            <Text>Registrate en nuestra app</Text>
            <View>
                <TextInput
                    style = {styles.input}
                    placeholder = 'Inserta tu nombre'
                    keyboardType = 'default'
                    value = {this.state.name}
                    onChangeText = { (text) => this.setState({name: text}) }
                />

                <TextInput
                    style = {styles.input}
                    placeholder = 'Inserta tu email'
                    keyboardType = 'email-address'
                    value = {this.state.mail}
                    onChangeText = { (text) => this.setState({mail: text}) }
                />
                <TextInput
                    style = {styles.input}
                    placeholder='Crea tu minibio'
                    value={this.state.minibio}
                    onChangeText={(text) => this.setState({minibio:text})}
                />
                <TextInput
                    style = {styles.input}
                    placeholder = 'Inserta tu password'
                    keyboardType = 'default'
                    value = {this.state.password}
                    secureTextEntry={true}
                    onChangeText = { (text) => this.setState({password: text}) }
                />

                <TextInput
                    style = {styles.input}
                    placeholder = 'Inserta la URL de tu foto de perfil'
                    keyboardType = 'default'
                    value = {this.state.fotoPerfil}
                    onChangeText = { (text) => this.setState({fotoPerfil: text}) }
                />

                <Text
                    style={styles.textLink}
                >
                    ¿Tienes una cuenta?
                    <TouchableOpacity
                        onPress={()=> this.props.navigation.navigate('Login')}
                    >
                        Logueate aquí!
                    </TouchableOpacity>
                </Text>


                <TouchableOpacity 
                onPress={()=> this.registrarUsuario(this.state.name, this.state.mail, this.state.password)}                
                style={styles.btn}>
                    <Text style={styles.textBtn}>Registrame ahora!</Text>
                </TouchableOpacity>

            </View>

        </View>
        )
    }
}

const styles = StyleSheet.create({
    input:{
        borderWidth: 1,
        borderColor: '#FAE0E4',
        marginBottom: 24
    },
    btn:{
        backgroundColor:'#ffe0e9',
        padding:16,
        borderRadius: 10,
        alignItems: 'center'
    },
    textBtn:{
        color:'white'
    },
    textLink:{
        marginBottom: 30
    }
})

export default FormRegister