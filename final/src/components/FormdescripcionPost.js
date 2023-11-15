import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { TextInputComponent } from 'react-native'



export default class FormDescripcionPost extends Component {
    constructor(props){
        super(props)
        this.state ={
            descripcionPost : ''
        }
    }
  render() {
    return (
      <View>
        <Text>Description</Text>
        <View>
            <TextInput
            placeholder='Description post'
            onChangeText={(descripcion)=> this.props.actualizarDescripcion(descripcion) }
            value={this.state.descripcionPost}
            style={styles.input}
            multiline={true}
            numberOfLines={8}
            />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    input:{
        borderWidth:1,
        borderColor:'red'
    },
    btn:{
        borderWidth:1,
        borderColor:'green'
    }
})
