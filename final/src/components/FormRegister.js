import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { auth } from '../firebase/config'

class FormRegister extends Component {
    constructor(props){
        super(props)
        this.state = {
            username:'',
            mail: '',
            password: '',
            err: '',
            bio: '',
            error: {
                email: '',
                pass: ''
            }
        }
    }

    registrarUsuario(email, password, username, bio){

        if (this.state.mail.length == 0) {
            this.setState({ error: { mail: 'Ingresar mail' } })
            return
        }
        else if (this.state.password.length == 0) {
            this.setState({ error: { password: 'Ingresar contrase;a' } })
            return
        }
        else if (this.state.username.length == 0) {
            this.setState({ error: { username: 'Ingresar nombre de usuario' } })
            return
        }
        this.setState({ error: { mail: '', password: '', username: '' } })

        auth.createUserWithEmailAndPassword(email, password)
        //chequear si dentro de los parentesis va email o mail
            .then((user) => {
                db.collection('users').add({
                    mail: email,
                    username: username,
                    bio: bio,

                })
                    .then((user) => {
                        this.setState({
                            mail: "",
                            password: "",
                            username: "",
                            bio: "",
                        });
                        this.props.navigation.navigate("TabNavigation");
                    })
            }
            )
            .catch(err => this.setState({ err: err.message }))
            //chequear esta linea, sino: .catch((e)=> console.log(e))
    }

    render() {
        console.log(this.props.navigation)
        //chequear bien que muestra el console.log

        return (
        <View>
            <Text style={styles.title}> Registrate </Text>
            <View>
                <TextInput
                    style = {styles.input}
                    placeholder = 'Nombre de usuario'
                    keyboardType = 'default'
                    value = {this.state.username}
                    onChangeText = { (text) => this.setState({username: text}) }
                />
                    <Text>
                        {this.state.error.username && 'Ingrese su nombre de usuario'}
                    </Text>

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
                    keyboardType = 'default'
                    value = {this.state.password}
                    secureTextEntry={true}
                    onChangeText = { (text) => this.setState({password: text}) }
                />
                    <Text>
                        {this.state.error.password && 'Ingrese su contraseña'}
                    </Text>
                <TextInput
                    style={style.buscar}
                    placeholder='Biografia'
                    keyboardType="default"
                    value={this.state.bio}
                    onChangeText={bio => this.setState({ bio: bio })}
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
                onPress={()=> this.registrarUsuario(this.state.name, this.state.mail, this.state.password, this.state.bio,)}                
                style={styles.btn}>
                    <Text style={styles.textBtn}>Registrame ahora!!</Text>
                </TouchableOpacity>

            </View>
            <Text>{this.state.err}</Text>
            // no se si va ahi o dentro de view
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
    textLink:{
        marginBottom:24
    },
})

export default FormRegister