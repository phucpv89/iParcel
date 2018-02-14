import React, { PureComponent, Component } from 'react';
import { View, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { withNavigationFocus } from 'react-navigation-is-focused-hoc';

import GoogleApi from './googleapi';

const { height, width } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const LongitudeDelta = latitudeDelta => latitudeDelta * ASPECT_RATIO;
const RADIUS = 10000; //10km
const RADIUS_OF_EARTH = 6371;

function getDeltaLongWithDistance(distance, aspectRatio) {
  distance = distance / 1000 * 2 * aspectRatio;
  const x = distance / RADIUS_OF_EARTH / 2;
  const a = Math.sin(x) * Math.sin(x);
  const longitudeDelta = Math.acos(1 - 2 * a) / (Math.PI / 180);
  return longitudeDelta;
}

function getLatitudeDelta(longitudeDelta, aspectRatio) {
  return longitudeDelta / aspectRatio;
}
function getDistanceFromLatLonInKm(startLoc, endLoc) {
  const { latitude: lat1, longitude: lon1 } = startLoc;
  const { latitude: lat2, longitude: lon2 } = endLoc;
  let dLat = deg2rad(lat2 - lat1); // deg2rad below
  let dLon = deg2rad(lon2 - lon1);
  let a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  let d = RADIUS_OF_EARTH * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

const defaultLocation = {
  latitude: 21.028511,
  longitude: 105.804817
};

const locations = [
  {
    latitude: 21.028511,
    longitude: 105.804817
  },
  {
    latitude: 21.038911,
    longitude: 105.71814
  }
];

class IPMapView extends Component {
  constructor(props) {
    super(props);
    const longitudeDelta = getDeltaLongWithDistance(RADIUS, ASPECT_RATIO);
    const latitudeDelta = getLatitudeDelta(longitudeDelta, ASPECT_RATIO);
    const region = {
      ...defaultLocation,
      latitudeDelta,
      longitudeDelta
    };

    this.state = { region };

    this.fetchGoogleDirection(
      {
        latitude: 21.028511,
        longitude: 105.804817
      },
      {
        latitude: 21.038911,
        longitude: 105.71814
      }
    );
  }
  static navigationOptions = {
    title: 'MapView'
  };

  componentWillReceiveProps = nextProps => {
    const { item } = nextProps.navigation.state.params;

    console.log('>>>>>>>>>>>>>>>>>>>>>');
  };

  fetchGoogleDirection(startCoordinate, endCoordinate) {
    console.log('fetchGoogleDirection');
    const edgePadding = { top: 50, right: 50, bottom: 70, left: 50 };
    let coordinates = [startCoordinate];
    GoogleApi.fetchGoogleDirection(startCoordinate, endCoordinate)
      .then(polylineCoords => {
        console.log('polylineCoords: ', polylineCoords);
        coordinates = coordinates.concat(polylineCoords);
        coordinates.push(endCoordinate);
        this.setState({
          coords: coordinates
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  _renderMarker = (coordinate, index) => (
    <MapView.Marker key={index} coordinate={coordinate} />
  );
  render() {
    return (
      <MapView
        style={{
          flex: 1
        }}
        initialRegion={this.state.region}
      >
        <MapView.Polyline
          coordinates={this.state.coords}
          strokeWidth={2}
          strokeColor="red"
        />
        {locations.map(this._renderMarker)}
      </MapView>
    );
  }
}
export default IPMapView;
