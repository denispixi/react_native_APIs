import { AppRegistry, Platform } from 'react-native';
import App from './App';

AppRegistry.registerComponent('rn_showcase', () => App);

if (Platform.OS === 'web') {
  const rootTag = document.getElementById('root') || document.getElementById('main');
  AppRegistry.runApplication('rn_showcase', { rootTag });
}
