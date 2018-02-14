import Polyline from 'polyline';

const fetchGoogleDirection = (origin, destination) => {
  const _origin = origin.latitude + ',' + origin.longitude;
  const _destination = destination.latitude + ',' + destination.longitude;
  let url =
    'http://maps.googleapis.com/maps/api/directions/json?sensor=false&units=metric&mode=1&origin=';
  url += _origin;
  url += '&destination=';
  url += _destination;

  console.log('fetchGoogleDirection', url);
  return fetch(url)
    .then(response => response.json())
    .then(responseJson => {
      console.log('response', responseJson);
      const points = responseJson.routes[0].overview_polyline.points;
      const steps = Polyline.decode(points);
      const polylineCoords = [];
      for (let i = 0; i < steps.length; i++) {
        const tempLocation = {
          latitude: steps[i][0],
          longitude: steps[i][1]
        };
        polylineCoords.push(tempLocation);
      }
      return polylineCoords;
    });
};

export default { fetchGoogleDirection };
