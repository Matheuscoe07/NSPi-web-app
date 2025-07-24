import React, { useState } from 'react';
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
import { supabase } from '../src/services/supabase';
import bcrypt from 'bcryptjs';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('email', email)
        .single();

      if (error || !data) {
        console.error('Erro ao buscar o usuário:', error?.message);
        Alert.alert('Erro', 'Usuário não encontrado ou erro de conexão.');
        return;
      }

      const senhaValida = bcrypt.compareSync(senha, data.senha_hash);

      if (!senhaValida) {
        Alert.alert('Erro', 'Senha incorreta.');
        return;
      }

      await AsyncStorage.setItem('usuario_id', data.id_usuario.toString());

      if (data.tipo_usuario) {
        await AsyncStorage.setItem('tipo_usuario', data.tipo_usuario);
        console.log(`🔐 Login confirmado. Tipo de usuário: ${data.tipo_usuario}`);

        if (data.tipo_usuario.toLowerCase() === 'operator') {
          router.replace('/operador');
        } else {
          router.replace('/home');
        }
      } else {
        console.warn('❗ tipo_usuario não encontrado no Supabase!');
        Alert.alert('Erro', 'O tipo de usuário não está definido.');
      }
    } catch (err) {
      console.error('Erro ao realizar login:', err);
      Alert.alert('Erro', 'Erro ao tentar fazer login.');
    }
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
          Não tem uma conta?{' '}
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
    width: '80%',
    maxWidth: 400,
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    width: '80%',
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
  registerPrompt: {
    textAlign: 'center',
    fontSize: 14,
  },
  registerLink: {
    color: '#003b61',
    fontWeight: 'bold',
  },
});