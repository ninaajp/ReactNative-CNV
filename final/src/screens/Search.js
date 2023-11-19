import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import { auth, db } from '../firebase/config'


export default class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      cargando: null,
      usuarios: [],
    }
  }

  buscarUsuarios(search) {
    this.setState({ cargando: true })
    console.log(search)
    db.collection("users").where("name", "==", search).get()
      .then(async (docs) => {
        let arrayUsuarios = []
        docs.forEach(doc => {
          arrayUsuarios.push(doc.data())
        })

        // si no se encontro por nombre, buscar por email
        if (arrayUsuarios.length === 0) {
          await db.collection("users").where("owner", "==", search).get()
            .then(docs => {
              docs.forEach(doc => {
                arrayUsuarios.push(doc.data())
              })
            })
            .catch(error => console.log(error))
        }

        this.setState({ usuarios: arrayUsuarios, cargando: false })
      })
      .catch(error => console.log(error))
  }


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}> Busqueda </Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => this.props.navigation.goBack()}
        >
          <Text style={styles.tit}>&larr;</Text>
        </TouchableOpacity>


        <View style={styles.searchSection}>
          <TextInput
            style={styles.input}
            placeholder="Busca un user"
            onChangeText={(search) => this.setState({ search })}
            value={this.state.search}
          />
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => this.buscarUsuarios(this.state.search)}>
            <Text style={styles.searchButtonText}>Buscar</Text>
          </TouchableOpacity>
        </View>


        {this.state.cargando === null ?
          null :
          this.state.cargando ?
            <ActivityIndicator size="large" color="white" /> :
            this.state.usuarios.length === 0 ?
              <Text style={styles.userName}>El email / user name no existe</Text> :
              <FlatList
                data={this.state.usuarios}
                renderItem={({ item }) =>
                  <View style={styles.userContainer}>
                    <TouchableOpacity
                      onPress={() => this.props.navigation.navigate("UserResult", { userName: item.name })}
                    >
                      <Text style={styles.userName}>{item.name}</Text>
                    </TouchableOpacity>
                  </View>
                }
                keyExtractor={item => item.name}
              />
        }
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#595758',
  },
  tit: {
    color: '#FFC8FB',
    fontSize: 25,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 40,
    marginLeft: 110,
    color: '#FFC8FB',
  },
  backButton: {
    marginBottom: 20,
  },
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,

  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    paddingLeft: 10,
    color: '#FFC8FB',
    borderRadius: 10,
  },
  searchButton: {
    padding: 10,
    borderRadius: 5,
  },
  searchButtonText: {
    color: '#FFC8FB',
  },
  userContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#61dafb',
    paddingVertical: 10,
  },
  userName: {
    color: '#FFC8FB',
  },
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
});