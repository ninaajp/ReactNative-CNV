import { Text, View } from 'react-native'
import React, { Component } from 'react'
import FormRegister from '../components/FormRegister'

class Register extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <View>
        <FormRegister navigation={this.props.navigation} />
      </View>
    )
  }
}

export default Register