import { useState } from 'react';
import {
View,
Text,
TextInput,
Pressable,
StyleSheet,
Alert,
KeyboardAvoidingView,
Platform,
} from 'react-native';
import { Link, router } from 'expo-router';

export default function RegisterScreen() {
const [nome, setNome] = useState('');
const [sobrenome, setSobrenome] = useState('');
const [email, setEmail] = useState('');
const [senha, setSenha] = useState('');

const handleRegister = () => {
    if (!nome || !sobrenome || !email || !senha) {
    Alert.alert('Erro', 'Preencha todos os campos.');
    return;
    }

    // Aqui entra a lógica real de criação de usuário (ex: Supabase)
    console.log('Registrando:', { nome, sobrenome, email, senha });
    Alert.alert('Sucesso', 'Registro realizado com sucesso!');
    router.replace('/login'); // Redireciona para login após registro
};

return (
    <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
    >
    <Text style={styles.title}>Registrar</Text>

    <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
    />
    <TextInput
        style={styles.input}
        placeholder="Sobrenome"
        value={sobrenome}
        onChangeText={setSobrenome}
    />
    <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
    />
    <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
    />

    <Pressable style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrar</Text>
    </Pressable>

    <Text style={styles.loginPrompt}>
        Já tem uma conta?{' '}
        <Link href="/login">
        <Text style={styles.loginLink}>Entrar</Text>
        </Link>
    </Text>
    </KeyboardAvoidingView>
);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 24,
        textAlign: 'center',
    },
    input: {
        width: '100%',
        maxWidth: 400,
        backgroundColor: '#fff',
        padding: 12,
        marginBottom: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    button: {
        width: '100%',
        maxWidth: 400,
        backgroundColor: '#003b61',
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 16,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loginPrompt: {
        textAlign: 'center',
        fontSize: 14,
    },
    loginLink: {
        color: '#003b61',
        fontWeight: 'bold',
    },
});