import { Text, View, TouchableOpacity, StyleSheet, Image, FlatList, ActivityIndicator, ScrollView } from 'react-native'
import React, { Component } from 'react'
import { db } from '../firebase/config'
import Post from '../components/Post'


export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posteos: []
        }
    }

    componentDidMount() {
        db.collection('posts')
            .orderBy('createdAt', 'desc')
            .onSnapshot(docs => {
                let arrPosteos = []
                docs.forEach(doc => {
                    arrPosteos.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })

                this.setState({
                    posteos: arrPosteos
                })
            })
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.containerGral}>
                    <FlatList
                        style={styles.posts}
                        data={this.state.posteos}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => <Post navigation={this.props.navigation} data={item.data} id={item.id} />}
                    />
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create(
    {
        containerGral: {
            flex: 1,
            backgroundColor: '#FFC2D1',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        container: {
            flex: 2,
            alignContent: 'center'

        },
        containerGrande: {
            flex: 3,
            backgroundColor: '#ffc2d1'
        },
        containerChico: {
            flex: 1,
            backgroundColor: 'orange'
        },
        posts: {
            width: 300,
        }
    }
) 