import { StyleSheet,Text, View, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { auth } from '../firebase/config'

class Profile extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    db.collection('users').onSnapshot((docs)=>{
      // console.log(docs)
      let arrDocs = []
      docs.forEach((doc) => {
        arrDocs.push({
          id:doc.id,
          data: doc.data()
        })
      })

      this.setState({
        usuarios : arrDocs
      }, () => console.log(this.state.usuarios))

    })
  }

  logout(){
    auth.signOut()
    this.props.navigation.navigate('Register')
  }
  
  render() {
    return (
      <View>
        <Text>El email del usuario es:</Text>
        <Text>{auth.currentUser.mail}</Text>
        {/* <View> */}
          <FlatList
            data={this.state.usuarios}
            keyExtractor={(item)=> item.id.toString() }
            renderItem={ ( {item} ) => <View>
              <Text>{item.data.name}</Text>
              <Text>{item.data.minibio}</Text>
              </View>
               }
        />
   
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