import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client';
import { Alert, View, Platform, AsyncStorage, Text, Image, StyleSheet, SafeAreaView } from 'react-native';

// import { Container } from './styles';

import SpotList from '../components/SpotList';

import logo from '../assets/logo.png';
import { ScrollView } from 'react-native-gesture-handler';

export default function List() {
    const [techs, setTechs] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio('http://192.168.7.106:7777', {
                query: { user_id }
            });

            socket.on('booking_response', booking => {
                Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA'}`)
            })
        })
    }, [])

    useEffect(() => {
        AsyncStorage.getItem('techs').then(storagedTechs => {
            const techsArray = storagedTechs.split(',').map(tech => tech.trim());

            setTechs(techsArray);
        })
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={logo} />

            <ScrollView>{techs.map(tech => <SpotList key={tech} tech={tech} />)}</ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logo: {
        ...Platform.select({
            ios: {
                height: 32,
                resizeMode: 'contain',
                alignSelf: 'center',
                marginTop: 10,
            },
            android: {
                height: 32,
                resizeMode: 'contain',
                alignSelf: 'center',
                marginTop: 27,
            },
        }),
    },
});