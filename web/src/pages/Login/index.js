import React, { useState } from 'react';
import api from '../../services/api';

// import { Container } from './styles';

export default function Login({ history }) {
    //Gerencia de estados, variável email será atualizada em tempo real, variável setEmail serve para atualizar a "email"
    const [email, setEmail] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();

        const response = await api.post('/sessions', { email });

        const { _id } = response.data;

        localStorage.setItem('user', _id);

        history.push('/dashboard');
    }

    return (
        <>
            <p>
                Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para sua empresa.
            </p>

            <form onSubmit={handleSubmit}>
                <label htmlFor="email">E-MAIL *</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Seu melhor e-mail"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />

                <button type="submit" className="btn">ENTRAR</button>
            </form>
        </>
    );
};
