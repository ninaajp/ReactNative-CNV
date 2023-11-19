import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';

import React, { Component } from 'react'
import { db, auth } from '../firebase/config';
import firebase from 'firebase';

export default class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            likes: 0,
            estaMiLike: false
        }
    }

    componentDidMount() {
        let validacionLike = this.props.data.likes.includes(auth.currentUser.email)
        this.setState({
            estaMiLike: validacionLike,
            likes: this.props.data.likes.length
        })
    }

    like() {
        db
            .collection('posts')
            .doc(this.props.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
            })
            .then((resp) => {
                this.setState({
                    estaMiLike: true,
                    likes: this.state.likes + 1
                })
            })
            .catch((err) => console.log(err))
    }

    unlike() {
        db
            .collection('posts')
            .doc(this.props.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
            })
            .then((resp) => {
                this.setState({
                    estaMiLike: false,
                    likes: this.state.likes - 1
                })
            })
            .catch((err) => console.log(err))
    }

    irAComentar() {
        this.props.navigation.navigate('Comments', { id: this.props.id })
    }

    delete() {
        this.props.onDelete(this.props.id)
    }

    render() {
        return (
            <View style={styles.containerPost}>
                <Image
                    source={{ uri: this.props.data.fotoUrl ? this.props.data.fotoUrl : '' }}
                    style={styles.img}
                    resizeMode='cover'
                />
                <Text>{this.props.data.descripcion}</Text>
                <View>
                    <Text>
                        {this.state.likes} likes
                    </Text>
                    {
                        this.state.estaMiLike ?
                            <TouchableOpacity
                                onPress={() => this.unlike()}
                            >
                                <FontAwesome
                                    name='heart'
                                    color='red'
                                    size={24}
                                />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity
                                onPress={() => this.like()}
                            >
                                <FontAwesome
                                    name='heart-o'
                                    color='red'
                                    size={24}
                                />
                            </TouchableOpacity>
                    }
                </View>
                <View>
                    <TouchableOpacity
                        onPress={() => this.irAComentar()}
                    >
                        <Text>Comentar</Text>
                    </TouchableOpacity>
                </View>
                {
                    this.props.canDelete ?
                        <View>
                            <TouchableOpacity
                                onPress={() => this.delete()}
                            >
                                <FontAwesome
                                    name='trash'
                                    color='black'
                                    size={24}
                                />
                            </TouchableOpacity>
                        </View>
                        :
                        null
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerPost: {
        marginBottom: 16,
    },
    img: {
        width: '100%',
        height: 200
    }
})