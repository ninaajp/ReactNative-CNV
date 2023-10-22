import { Text, View } from 'react-native'
import React, { Component } from 'react'

class Profile extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    console.log(this.props)
  }

  logout(){
    auth.signOut()
    this.props.navigation.navigate('Register')
  }
  
  render() {
    return (
      <View>
        <Text>El email del usuario es:</Text>
        <Text>{auth.currentUser.email}</Text>
        <View>
          <TouchableOpacity
          style={styles.signoutBtn}
          onPress={()=> this.logout()}
          >
            <Text>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  signoutBtn:{
    backgroundColor:'red',
    padding: 16
  }
})

export default Profile