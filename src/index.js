import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import {
  DrawerNavigator,
  DrawerItems,
  StackNavigator,
  SafeAreaView,
  TabNavigator
} from 'react-navigation';
import { Icon } from 'react-native-elements';

import IPMapView from './ip-map-view';
import IPListView from './ip-list-view';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});

const mapNavigationStateParamsToProps = SomeComponent => {
  return class extends React.Component {
    static navigationOptions = SomeComponent.navigationOptions; // better use hoist-non-react-statics
    render() {
      const { navigation: { state: { params } } } = this.props;
      return <SomeComponent {...params} {...this.props} />;
    }
  };
};

const RootTabs = TabNavigator(
  {
    MapViewStack: {
      screen: StackNavigator({
        MapView: { screen: IPMapView }
      }),
      navigationOptions: {
        tabBarLabel: 'MapView'
      }
    },
    ListViewStack: {
      screen: StackNavigator({
        ListView: { screen: IPListView }
      }),
      navigationOptions: {
        tabBarLabel: 'ListView'
      }
    }
  },
  {
    tabBarPosition: 'bottom',
    tabBarOptions: {
      showIcon: false,
      activeTintColor: 'white',
      activeBackgroundColor: '#FE4E35',
      inactiveTintColor: 'gray',
      inactiveBackgroundColor: '#D0DDE5',
      tabStyle: {
        justifyContent: 'center'
      },
      style: {
        backgroundColor: '#d1dde5'
      },
      labelStyle: {
        fontSize: 20,
        fontWeight: '800'
      },
      indicatorStyle: {
        backgroundColor: '#FE4E35',
        ...StyleSheet.absoluteFillObject,
        height: undefined
      }
    }
  }
);
export default RootTabs;
