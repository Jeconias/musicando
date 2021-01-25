import {useNavigation} from '@react-navigation/native';
import {
  AppStackScreens,
  AuthStackScreens,
  RootStackScreens,
} from '~/config/types';

type Screen = RootStackScreens | AppStackScreens | AuthStackScreens;

type ToOption = {
  screen?: Screen;
  params?: ToOption | {[index: string]: any};
};

const useNavigate = () => {
  const navigation = useNavigation();

  return {
    navigation,
    goBack: () => navigation.goBack(),
    to: (screen: Screen, options?: ToOption) => {
      navigation.navigate(screen, options);
    },
  };
};

export default useNavigate;
