import React, { useCallback, useState, useEffect, useRef } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';
import * as Yup from 'yup';

import Icon from 'react-native-vector-icons/MaterialIcons';
import IconAntDesign from 'react-native-vector-icons/AntDesign';

import Input from '../../components/Input';

import {
  Header,
  ButtonRouteConfig,
  TitleHeader,
  Container,
  ContainerResultBlendBorder,
  TitleResult,
  ResultBlend,
  ContainerForm,
  ContainerPorcentagemMistura,
  TitleVazaoCalha,
  PorcentagemSilo,
  PorcentagemButton,
  ValuePorcentagem,
  SubmitButton,
  TextButton
} from './styles';

interface ConfigFormData {
  frequencia4: string;
  tempo4: string;
  peso4: string;
  frequencia5: string;
  tempo5: string;
  peso5: string;
}

interface PpcFormData {
  ppc4: number;
  ppc5: number;
}

const Calculator = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const formRef = useRef<FormHandles>(null);

  const [params, setParams] = useState<ConfigFormData>();

  const [ppcResult, setPpcResult] = useState(0);
  const [ppc, setPpc] = useState();

  // Busca os dados no banco local.
  const getParams = useCallback(async () => {
    const jsonData = await AsyncStorage.getItem('@configs');

    if (jsonData !== null) {
      const data = JSON.parse(jsonData);
      setParams(data);
      console.log(data);
    }
  }, [])

  async function handleCalcPpc(data: PpcFormData) {
    try {
      const schema = Yup.object().shape({
        ppc4: Yup.number().required('Campo obrigatório'),
        ppc5: Yup.number().required('Campo obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      })

      // =(((C12/C11)*3600)*C10)/60
      const vazaoCalha4 = (((
        Number(params?.peso4) / Number(
          params?.tempo4)) * 3600) * Number(
            params?.frequencia4)) /60

      const vazaoCalha5 = (((
        Number(params?.peso5) / Number(
          params?.tempo5)) * 3600) * Number(
            params?.frequencia5)) /60

      // =(C13/(C13+E13))*100
      const calha4 = (vazaoCalha4 / (vazaoCalha4 + vazaoCalha5)) * 100;
      const calha5 = (vazaoCalha5 / (vazaoCalha5 + vazaoCalha4)) * 100;

      // =((C13*C7)+(E13*E7))/(C13+E13)
      const resultPpc = ((
        vazaoCalha4 * Number(data.ppc4)) + (vazaoCalha5 * Number(data.ppc5))) / (
          vazaoCalha4 + vazaoCalha5);

      console.log({vazaoCalha4, vazaoCalha5, resultPpc});

      setPpcResult(resultPpc);
    } catch (err) {
      console.log(err);
    }
  }

  function upFreq4() {
    if (Number(params?.frequencia4) < 100 && Number(params?.frequencia4) >= 10) {
      const freq4 = Number(params?.frequencia4) + 5;
      const pes4 = (Number(params?.peso4) + (Number(params?.peso4) * 5) / 100);

      const updateParams4 = {
        frequencia4: freq4.toString() || undefined,
        tempo4: params?.tempo4,
        peso4: pes4.toFixed(2).toString() || undefined,
        frequencia5: params?.frequencia5,
        tempo5: params?.tempo5,
        peso5: params?.peso5
      }

      setParams(updateParams4);

      console.log(freq4, updateParams4);
    }
  }

  function downFreq4() {
    if (Number(params?.frequencia4) > 10 && Number(params?.frequencia4) <= 100) {
      const freq4 = Number(params?.frequencia4) - 5;
      const pes4 = (Number(params?.peso4) - (Number(params?.peso4) * 5) / 100);

      const updateParams4 = {
        frequencia4: freq4.toString() || undefined,
        tempo4: params?.tempo4,
        peso4: pes4.toFixed(2).toString() || undefined,
        frequencia5: params?.frequencia5,
        tempo5: params?.tempo5,
        peso5: params?.peso5
      }

      setParams(updateParams4);

      console.log(freq4, updateParams4);
    }
  }

  function upFreq5() {
    if (Number(params?.frequencia5) < 100 && Number(params?.frequencia5) >= 10) {
      const freq5 = Number(params?.frequencia5) + 5;
      const pes5 = (Number(params?.peso5) + (Number(params?.peso5) * 5) / 100);

      const updateParams5 = {
        frequencia4: params?.frequencia4,
        tempo4: params?.tempo4,
        peso4: params?.peso4,
        frequencia5: freq5.toString() || undefined,
        tempo5: params?.tempo5,
        peso5: pes5.toFixed(2).toString() || undefined,
      }

      setParams(updateParams5);

      console.log(freq5, updateParams5);
    }
  }

  function downFreq5() {
    if (Number(params?.frequencia5) > 10 && Number(params?.frequencia5) <= 100) {
      const freq5 = Number(params?.frequencia5) - 5;
      const pes5 = (Number(params?.peso5) - (Number(params?.peso5) * 5) / 100);

      const updateParams5 = {
        frequencia4: params?.frequencia4,
        tempo4: params?.tempo4,
        peso4: params?.peso4,
        frequencia5: freq5.toString() || undefined,
        tempo5: params?.tempo5,
        peso5: pes5.toFixed(2).toString() || undefined,
      }

      setParams(updateParams5);

      console.log(freq5, updateParams5);
    }
  }

  useEffect(() => {
    getParams();
  }, [isFocused])

  return (
    <>
      <Header>
        <TitleHeader>Alimentação Moagem</TitleHeader>

        <ButtonRouteConfig onPress={() => navigation.navigate('ConfigParams')}>
          <Icon name="settings" size={32} color="#fff" />
        </ButtonRouteConfig>
      </Header>

      <Container>
        <ContainerResultBlendBorder>
          <TitleResult>PPC da Mistura</TitleResult>
          <ResultBlend>{ppcResult.toFixed(2)} %</ResultBlend>
        </ContainerResultBlendBorder>

        <Form ref={formRef} onSubmit={handleCalcPpc}>
          <ContainerForm>
            <Input
              name="ppc4"
              icon="input"
              placeholder="PPC Silo 4"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="numeric"
              maxLength={5}
            />

            <Input
              name="ppc5"
              icon="input"
              placeholder="PPC Silo 5"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="numeric"
              maxLength={5}
            />
          </ContainerForm>

          <ContainerPorcentagemMistura>

          <PorcentagemSilo>
            <TitleVazaoCalha>Vazão Calha 4</TitleVazaoCalha>
            <PorcentagemButton onPress={upFreq4}>
              <IconAntDesign name="caretup" size={64} color="#fff" />
            </PorcentagemButton>
            { params?.frequencia4 ? (<ValuePorcentagem>{params?.frequencia4} hz</ValuePorcentagem>)
              : (
                <ValuePorcentagem>0 hz</ValuePorcentagem>)}
            <PorcentagemButton onPress={downFreq4}>
              <IconAntDesign name="caretdown" size={64} color="#fff" />
            </PorcentagemButton>
          </PorcentagemSilo>

          <PorcentagemSilo>
            <TitleVazaoCalha>Vazão Calha 5</TitleVazaoCalha>
            <PorcentagemButton onPress={upFreq5}>
              <IconAntDesign name="caretup" size={64} color="#fff" />
            </PorcentagemButton>
            {params?.frequencia5 ? (<ValuePorcentagem>{params?.frequencia5} hz</ValuePorcentagem>)
            : (
              <ValuePorcentagem>0 hz</ValuePorcentagem>)}
            <PorcentagemButton onPress={downFreq5}>
              <IconAntDesign name="caretdown" size={64} color="#fff" />
            </PorcentagemButton>
          </PorcentagemSilo>
        </ContainerPorcentagemMistura>

        <SubmitButton onPress={() => {
          formRef.current?.submitForm();
        }}>
          <TextButton>Calcular</TextButton>
        </SubmitButton>
        </Form>
      </Container>
    </>
  )
}

export default Calculator;
