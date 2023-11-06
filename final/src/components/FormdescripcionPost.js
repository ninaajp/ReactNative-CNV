import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
// import { TextInputComponent } from 'react-native'

export default class FormdescripcionPost extends Component {
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
            onChangeText={(text)=> this.setState({
                descripcionPost: text
            }) }
            value={this.state.descripcionPost}
            style={styles.input}
            multiline={true}
            numberOfLines={8}
            />
            <TouchableOpacity
                style={styles.btn}
                onPress={()=> this.props.onSubmit({
                    descripcion: this.state.descripcionPost
                })}
            >
                <Text>
                    Send post 
                </Text>
            </TouchableOpacity>
        </View>
      </View>
    )
  }
}