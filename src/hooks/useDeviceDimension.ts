import {useWindowDimensions} from 'react-native';
import {useTheme} from 'styled-components';

const useDeviceDimension = () => {
  const theme = useTheme();
  const data = useWindowDimensions();

  return {
    ...data,
    ...theme.device.dimensions.window,
  };
};

export default useDeviceDimension;
