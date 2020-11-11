import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

export const Header = styled.View`
  height: 70px;
  padding: 15px 15px;
  background: #043c4e;
  margin-bottom: 10px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ButtonRouteConfig = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})``;

export const TitleHeader = styled.Text`
  font-size: 22px;
  color: #fff;
  font-weight: bold;
`;

export const Container = styled.ScrollView`
  flex: 1;
  padding: 15px 25px 5px;
`;

export const ContainerResultBlendBorder = styled.View`
  background: #043c4e;
  border-width: 1px;
  border-color: #fff;
  border-radius: 8px;
  padding: 5px 0;

  align-items: center;
  justify-content: center;
`;

export const TitleResult = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 5px;
`;

export const ResultBlend = styled.Text`
  font-size: 92px;
  font-weight: bold;
  color: #fff;
`;

export const ContainerForm = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0 0;
`;

export const ContainerPorcentagemMistura = styled.View`
  height: 215px;
  background: #043c4e;
  padding: 3px 3px;
  border-radius: 8px;
  border-width: 1px;
  border-color: #fff;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const TitleVazaoCalha = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  align-self: center;
  margin: 25px 0 5px;
`;

export const PorcentagemSilo = styled.View`
  flex: 1;
  background: #043c4e;
  align-items: center;
  justify-content: center;
  padding: 5px 5px;
`;

export const PorcentagemButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})``;

export const ValuePorcentagem = styled.Text`
  font-size: 54px;
  font-weight: bold;
  color: #fff;
`;

export const SubmitButton = styled(RectButton)`
  height: 60px;
  width: 100%;
  background: #26c48e;
  border-radius: 10px;
  margin: 15px 0 10px;

  align-items: center;
  justify-content: center;
`;

export const TextButton = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #043c4e;
`;
