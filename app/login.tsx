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

export default function LoginScreen() {
const [email, setEmail] = useState('');
const [senha, setSenha] = useState('');

const handleLogin = () => {
    // Aqui você pode usar Supabase, Firebase, etc.
    if (!email || !senha) {
    Alert.alert('Erro', 'Preencha todos os campos.');
    return;
    }

    // Simulando login bem-sucedido
    console.log('Autenticando com:', email, senha);
    Alert.alert('Sucesso', 'Login realizado com sucesso!');
    router.replace('/'); // Redireciona para Home
};

return (
    <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
    >
        <Text style={styles.title}>Entrar</Text>

        <View style={styles.formWrapper}>
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

            <Pressable style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Entrar</Text>
            </Pressable>

            <Text style={styles.registerPrompt}>
                Ainda não tem conta?{' '}
                <Link href="/registrar">
                    <Text style={styles.registerLink}>Registrar-se</Text>
                </Link>
            </Text>
        </View>
    </KeyboardAvoidingView>
);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#f9f9f9',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginTop: 48,
        marginBottom: 24,
        textAlign: 'center',
    },
    formWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        width: '80%',         // ✅ mudou de 25% pra 80%
        maxWidth: 400,        // ✅ adicionado limite em telas grandes
        backgroundColor: '#fff',
        padding: 12,
        marginBottom: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    button: {
        width: '80%',         // ✅ mudou de 25% pra 80%
        maxWidth: 400,        // ✅ adicionado limite
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
    registerPrompt: {
        textAlign: 'center',
        fontSize: 14,
    },
    registerLink: {
        color: '#003b61',
        fontWeight: 'bold',
    },
});