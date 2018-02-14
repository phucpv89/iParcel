import React, { PureComponent, Component } from 'react';
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  Text
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  row: {
    padding: 10,
    margin: 10,
    borderRadius: 3,
    backgroundColor: '#ddeaf2',
    shadowColor: 'rgba(0, 0, 0, 0.15)',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 2,
    shadowOpacity: 1
  }
});

const datas = [
  {
    latitude: 21.028511,
    longitude: 105.804817,
    title: 'Delivery 1'
  },
  {
    latitude: 21.038911,
    longitude: 109.71814,
    title: 'Delivery 2'
  }
];

class DeliveryRow extends PureComponent {
  _handlePress = () => {
    const params = {
      latitude: this.props.latitude,
      longitude: this.props.longitude
    };
    this.props.navigation.navigate('MapViewStack', {
      latitude: this.props.latitude,
      longitude: this.props.longitude
    });
  };

  render() {
    const { title, latitude, longitude } = this.props;
    return (
      <TouchableOpacity onPress={this._handlePress}>
        <View style={styles.row}>
          <Text style={styles.displayName}>{title}</Text>
          <Text
            style={styles.displayName}
          >{`latitude: ${latitude}   longitude${longitude}`}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

class IPListView extends Component {
  static navigationOptions = {
    title: 'ListView'
  };
  _keyExtractor = (item, index) => String(index);
  _renderItem = ({ item, index }) => (
    <DeliveryRow {...item} navigation={this.props.navigation} />
  );
  render() {
    return (
      <FlatList
        style={styles.container}
        data={datas}
        renderItem={this._renderItem}
        keyExtractor={this._keyExtractor}
      />
    );
  }
}
export default IPListView;
