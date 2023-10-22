import { Text, View } from 'react-native'
import React, { Component } from 'react'
import FormRegister from '../components/FormRegister'

class Register extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    auth.onAuthStateChanged(( user )=> {
      if(user !== null){
        this.props.navigation.navigate('TabNavigation')
      }
    })
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