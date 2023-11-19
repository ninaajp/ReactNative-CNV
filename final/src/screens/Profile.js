import { StyleSheet, Text, View, TouchableOpacity, FlatList, ScrollView, Image } from 'react-native'
import React, { Component } from 'react'
import { auth } from '../firebase/config'
import { db } from '../firebase/config'
import Post from '../components/Post'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: null,
      userPosts: []
    }
  }

  componentDidMount() {
    // fetch current user data by email
    db.collection('users').where("owner", "==", auth.currentUser.email).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        this.setState({
          currentUser: doc.data()
        })
      });
    })

    // fetch posts associated with current user
    db.collection('posts').orderBy('createdAt', 'desc').onSnapshot((querySnapshot) => {
      const userPosts = []
      querySnapshot.forEach((doc) => {
        if (doc.data().owner == auth.currentUser.email) {
          userPosts.push({
            id: doc.id,
            data: doc.data()
          })
        }
      });

      this.setState({
        userPosts: userPosts
      })
    })

  }

  onDelete(id) {
    db.collection('posts').doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
      this.setState({
        userPosts: this.state.userPosts.filter((item) => item.id != id)
      })
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  logout() {
    auth.signOut()
    this.props.navigation.navigate('Register')
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.profileContainer}>
          <Image source={{ uri: this.state.currentUser?.fotoPerfil || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" }} style={styles.avatar} />
          <Text>
            <Text style={{ fontWeight: 'bold' }}>Email:</Text> {this.state.currentUser?.owner}
          </Text>
          <Text>
            <Text style={{ fontWeight: 'bold' }}>Nombre:</Text> {this.state.currentUser?.name}
          </Text>
          {this.state.currentUser?.minibio ?
            <Text>
              <Text style={{ fontWeight: 'bold'}}>Minibio:</Text> {this.state.currentUser?.minibio} 
            </Text> : null
          }
          <Text>
          <Text style={{ fontWeight: 'bold'}}>Cantidad de posteos:</Text> {this.state.userPosts.length} 
          </Text>

          <View>
            <FlatList
              style={styles.posts}
              data={this.state.userPosts}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <Post navigation={this.props.navigation} data={item.data} id={item.id} canDelete={true} onDelete={(id) => this.onDelete(id)} />}
            />
          </View>

          <View>
            <TouchableOpacity
              style={styles.signoutBtn}
              onPress={() => this.logout()}
            >
              <Text>Cerrar sesión</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

    )
  }
}

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  signoutBtn: {
    backgroundColor: '#343A40',
    padding: 16,
    borderRadius: 5,
    alignItems: 'center',
  },
  posts: {
    margin: 20
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 10,
    objectFit: 'cover',
    marginTop: 30
  }
})

export default Profile