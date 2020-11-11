import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

export const Container = styled.ScrollView`
  flex: 1;
  padding: 5px 25px 5px;
`;

export const Header = styled.View`
  height: 70px;
  padding: 15px 5px;
  background: #043c4e;

  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const BackRoute = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})``;

export const TiteHeader = styled.Text`
  font-size: 22px;
  color: #fff;
  font-weight: bold;
  align-self: center;
`;

export const Title = styled.Text`
  font-size: 18px;
  color: #fff;
  font-weight: bold;
  align-self: center;
  margin: 5px 0 10px;
`;

export const ContainerInputParam = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const ParamRegister = styled.Text`
  font-size: 44px;
  font-weight: bold;
  color: #fff;
`;

export const BorderContainer = styled.View`
  border-width: 1px;
  border-color: #fff;
  padding: 0 10px 0;
  border-radius: 10px;
  margin-top: 20px;
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
