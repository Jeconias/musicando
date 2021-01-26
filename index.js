import {AppRegistry} from 'react-native';
import AppManager from './AppManager';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => AppManager);
