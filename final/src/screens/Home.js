import { Text, View, TouchableOpacity, StyleSheet, Image, FlatList, ActivityIndicator } from 'react-native'
import React, { Component } from 'react'
//import Contador from '../components/Contador'
import Post from '../components/Post'


class Home extends Component {
    constructor(props){
        super(props)
        this.state={
            posteos : [],      
        }
    }
    componentDidMount(){
        db.collection("posts").onSnapshot(
            docs=>{
            let postsFromDb =[]
            docs.forEach( doc => {
                postsFromDb.push({
                    id: doc.id, 
                    data: doc.data()
                })
                console.log(postsFromDb);
                this.setState({posteos:postsFromDb})
            })
        })
    }  
render() {
    return (
        <View>
            <View style={styles.containerGral}>
                <View style={styles.container1} >
                    <Text>Home</Text>
                </View>
                <FlatList  
                    style={styles.container}
                    ItemSeparatorComponent={()=>(<View style={{height: 2, backgroundColor: '#B7B9BF', width: 400, alignSelf:'center'}}></View>)}
                    data={this.state.posteos}
                    keyExtrator={item => item.id.toString()}
                    renderItem={({item})=>
                    ( <Post 
                        posteo={item}
                        navegacion={this.props.navigation}
                       />
                    )} 
                />
                <ActivityIndicator
                    size={32}
                    color={'blue'}
                />
            </View>
        </View>
    )
  }
}



const styles = StyleSheet.create(
    {
        containerGral:{
            flex:1
        },
        container1 : {
            flex : 2,
            alignContent:'centrer'
    
        },
        container: {
            backgroundColor:'#d9d9d9'
        }
    }
)

export default Home
