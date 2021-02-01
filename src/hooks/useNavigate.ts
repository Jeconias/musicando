import {useNavigation} from '@react-navigation/native';
import {
  AppStackScreens,
  AuthStackScreens,
  DrawerStackScreens,
  EventStackScreens,
  RootStackScreens,
} from '~/config/types';

type Screen =
  | RootStackScreens
  | AppStackScreens
  | AuthStackScreens
  | DrawerStackScreens
  | EventStackScreens;

type ToOption = {
  screen?: Screen;
  params?: ToOption | {[index: string]: any};
};

const useNavigate = () => {
  const navigation = useNavigation();

  return {
    navigation,
    toggleDrawer: () => (navigation as any).toggleDrawer() || (() => {}),
    goBack: () => navigation.goBack(),
    to: (screen: Screen, options?: ToOption) => {
      navigation.navigate(screen, options);
    },
  };
};

export default useNavigate;
