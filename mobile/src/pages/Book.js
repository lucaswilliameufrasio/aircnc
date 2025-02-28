import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, AsyncStorage, Alert } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

// import { Container } from './styles';

import api from '../services/api';

export default function Book({ navigation }) {
    const [date, setDate] = useState('');

    const id = navigation.getParam('id');

    async function handleSubmit(){
        const user_id = await AsyncStorage.getItem('user');

        console.log('Usuario: ' + user_id + ' , ID do Spot: ' + id);
        await api.post(`/spots/${id}/bookings`, {
            date
        }, {
            headers: { user_id }
        })

        Alert.alert('Solicitação de reserva enviada.');

        navigation.navigate('List');
    }

    function handleCancel(){
        navigation.navigate('List');

    }
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.label}>DATA DE INTERESSE *</Text>
            <TextInput
                style={styles.input}
                placeholder="Qual data você quer reservar?"
                placeholderTextColor="#999"
                autoCapitalize="words"
                autoCorrect={false}
                value={date}
                onChangeText={setDate}
            />
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttontext}>Solicitar Reserva</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={handleCancel} style={[styles.button, styles.cancelButton]}>
                <Text style={styles.buttontext}>Cancelar</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 30,
    },
    label: {
        marginTop: 20,
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2,
    },
    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
    },
    cancelButton: {
        backgroundColor: '#ccc',
        marginTop: 10,
    },
    buttontext: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    }
})
