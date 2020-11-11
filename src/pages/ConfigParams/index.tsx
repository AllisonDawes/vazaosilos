import React, {useCallback, useEffect, useState, useRef} from 'react';
import { Alert } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';
import * as Yup from 'yup';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Input from '../../components/Input';

interface ConfigFormData {
  frequencia4: string;
  tempo4: string;
  peso4: string;
  frequencia5: string;
  tempo5: string;
  peso5: string;
}

import {
  Container,
  Header,
  BackRoute,
  TiteHeader,
  Title,
  ContainerInputParam,
  ParamRegister,
  BorderContainer,
  SubmitButton,
  TextButton
} from './styles';

const ConfigParams = () => {
  const navigation = useNavigation();

  const formRef = useRef<FormHandles>(null);

  const [params, setParams] = useState<ConfigFormData>();

  const handleConfig = useCallback(async (data: ConfigFormData) => {
    try {
      const schema = Yup.object().shape({
        frequencia4: Yup.string().required('Campo obrigatório'),
        tempo4: Yup.string().required('Campo obrigatório'),
        peso4: Yup.string().required('Campo obrigatório'),
        frequencia5: Yup.string().required('Campo obrigatório'),
        tempo5: Yup.string().required('Campo obrigatório'),
        peso5: Yup.string().required('Campo obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      })

      const jsonData = JSON.stringify(data)
      await AsyncStorage.setItem('@configs', jsonData)

      getParamsData();

      Alert.alert('Sucesso!', 'Parâmetros registrados!')
    } catch(err) {
      console.log(err);
    }
  }, [])

  const getParamsData = useCallback(async () => {
    const jsonData = await AsyncStorage.getItem('@configs');

    if (jsonData !== null) {
      const data = JSON.parse(jsonData);
      setParams(data)
    }
  }, [])

  useEffect(() => {
    getParamsData();
  }, [])

  return (
    <>
      <Header>
        <BackRoute onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={48} color="#fff" />
        </BackRoute>
        <TiteHeader>Menu de Configurações</TiteHeader>
      </Header>

      <Container>
        <Form ref={formRef} onSubmit={handleConfig}>
          <BorderContainer>

            <Title>Silo 4</Title>

            <ContainerInputParam>
              <Input
                name="frequencia4"
                icon="input"
                placeholder="Frequência"
                autoCapitalize="none"
                keyboardType="number-pad"
                maxLength={2}
                autoCorrect={false}
              />

              <ParamRegister>{params?.frequencia4 || 0} Hz</ParamRegister>
            </ContainerInputParam>

            <ContainerInputParam>
              <Input
                name="tempo4"
                icon="input"
                placeholder="Tempo"
                autoCapitalize="none"
                keyboardType="number-pad"
                maxLength={3}
                autoCorrect={false}
              />

              <ParamRegister>{params?.tempo4 || 0} s</ParamRegister>
            </ContainerInputParam>

            <ContainerInputParam>
              <Input
                name="peso4"
                icon="input"
                placeholder="Peso"
                autoCapitalize="none"
                keyboardType="number-pad"
                maxLength={3}
                autoCorrect={false}
              />

              <ParamRegister>{params?.peso4 || 0} kg</ParamRegister>
            </ContainerInputParam>
          </BorderContainer>

          <BorderContainer>

            <Title>Silo 5</Title>

            <ContainerInputParam>
              <Input
                name="frequencia5"
                icon="input"
                placeholder="Frequência"
                autoCapitalize="none"
                keyboardType="number-pad"
                maxLength={2}
                autoCorrect={false}
              />

              <ParamRegister>{params?.frequencia5 || 0} Hz</ParamRegister>
            </ContainerInputParam>

            <ContainerInputParam>
              <Input
                name="tempo5"
                icon="input"
                placeholder="Tempo"
                autoCapitalize="none"
                keyboardType="number-pad"
                maxLength={3}
                autoCorrect={false}
              />
              <ParamRegister>{params?.tempo5 || 0} s</ParamRegister>
            </ContainerInputParam>

            <ContainerInputParam>
              <Input
                name="peso5"
                icon="input"
                placeholder="Peso"
                autoCapitalize="none"
                keyboardType="number-pad"
                maxLength={3}
                autoCorrect={false}
              />
              <ParamRegister>{params?.peso5 || 0} kg</ParamRegister>
            </ContainerInputParam>
          </BorderContainer>

          <SubmitButton onPress={() => {
            formRef.current?.submitForm();
          }}>
          <TextButton>Registrar</TextButton>
          </SubmitButton>
        </Form>
      </Container>
    </>
  )
}

export default ConfigParams;
