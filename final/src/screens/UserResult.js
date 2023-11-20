import { StyleSheet, Text, View, TouchableOpacity, FlatList, ScrollView, Image, ActivityIndicator } from 'react-native'
import React, { Component } from 'react'
import { auth } from '../firebase/config'
import { db } from '../firebase/config'
import Post from '../components/Post'

class UserResult extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: this.props.route.params?.userName || null,
      userResult: null,
      userPosts: [],
      cargando: false
    }
  }

  componentDidMount() {
    if (this.state.userName == null) {
      return;
    }

    this.setState({
      cargando: true
    })

    // fetch current user data by email
    db.collection('users').where("name", "==", this.state.userName).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        this.setState({
          userResult: doc.data()
        })
      });

      this.fetchPosts()
    })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      })
      .finally(() => {
        // independientemente de si hay error o no, se ejecuta
        this.setState({
          cargando: false
        })
      })
  }

  fetchPosts = () => {
    // fetch posts associated with current user
    db.collection('posts').orderBy('createdAt', 'desc').onSnapshot((querySnapshot) => {
      const userPosts = []
      querySnapshot.forEach((doc) => {
        if (doc.data().owner == this.state.userResult.owner) {
          userPosts.push({
            id: doc.id,
            data: doc.data()
          })
        }
      });

      this.setState({
        userPosts: userPosts,
      })
    })
  }

  render() {
    if (this.state.cargando) {
      return (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="black" />
          <Text style={styles.title}>Cargando...</Text>
        </View>
      );
    }

    if (this.state.userName == null) {
      return (
        <View style={styles.loaderContainer}>
          <Text style={styles.title}>Se debe buscar un usuario</Text>
        </View>
      );
    }

    if (!this.state.userResult) {
      return (
        <View style={styles.loaderContainer}>
          <Text style={styles.title}>No se encontró el usuario</Text>
        </View>
      );
    }

    return (
      <ScrollView>
        <View style={styles.profileContainer}>
          <Image source={{ uri: this.state.userResult.fotoPerfil || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" }} style={styles.avatar} />
          <Text>
            <Text style={{ fontWeight: 'bold' }}>Email:</Text> {this.state.userResult?.owner}
          </Text>
          <Text>
            <Text style={{ fontWeight: 'bold' }}>Nombre:</Text> {this.state.userResult?.name}
          </Text>
          {this.state.userResult?.minibio ?
            <Text>
              <Text style={{ fontWeight: 'bold' }}>Minibio:</Text> {this.state.userResult?.minibio}
            </Text> : null
          }
          <Text>
            <Text style={{ fontWeight: 'bold' }}>Cantidad de posteos:</Text> {this.state.userPosts.length}
          </Text>

          <View>
            <FlatList
              style={styles.posts}
              data={this.state.userPosts}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <Post navigation={this.props.navigation} data={item.data} id={item.id} />}
            />
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
    backgroundColor: 'pink' 
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
  },
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: 'white' 
  },
})

export default UserResult