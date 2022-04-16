import React from 'react';
import {useEffect, useState} from 'react';
import MapView, {
  PROVIDER_GOOGLE,
  Heatmap,
  Marker,
  Callout,
} from 'react-native-maps';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {StyleSheet, Platform, View, Text, Alert, Image} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import points from '../config/postal_sectors';
import Theme from '../config/Theme';
import {getProperties} from '../api/properties';
import {getAddress} from '../utils/misc';

const LATITUDE = 51.503244;
const LONGITUDE = -0.129778;
const LATITUDE_DELTA = 0.015;
const LONGITUDE_DELTA = 0.0121;
const WEATHER_UPDATE = 1000 * 60 * 5; // 5 minutes

const App = () => {
  const heatmap_grad = {
    colors: ['lightblue', 'yellow', 'red'],
    startPoints: [0.03, 0.33, 0.66],
    colorMapSize: 256,
  };

  const [location, setLocation] = useState({
    latitude: LATITUDE,
    longitude: LONGITUDE,
  });

  const [propertyMarkers, setPropertyMarkers] = useState([]);
  const [displayMarkers, setDisplayMarkers] = useState(true);

  // Current Weather Data
  const [weatherData, setWeather] = useState({
    name: '',
    region: '',
    temp_c: 0,
    temp_f: 0,
    icon: null,
    cloud: 0,
    wind_mph: 0,
    wind_kph: 0,
    wind_dir: 0,
  });

  // Get current weather at this location
  const getWeatherData = weather_url => {
    return fetch(weather_url)
      .then(response => response.json())
      .then(data => {
        setWeather({
          name: data.location.name,
          region: data.location.region,
          temp_c: data.current.temp_c,
          temp_f: data.current.temp_f,
          icon: 'https:' + data.current.condition.icon,
          cloud: data.current.cloud,
          wind_mph: data.current.wind_mph,
          wind_kph: data.current.wind_kph,
          wind_dir: data.current.wind_dir,
        });
      })
      .catch(err => {
        console.error(err);
      });
  };

  useEffect(() => {
    try {
      handleLocationPermission();
      // getCurrentLocation();

      const watchId = trackUserLocation();

      return () => {
        Geolocation.clearWatch(watchId);
      };
    } catch (e) {
      Alert.alert('Ooops', 'Something went wrong');
    }
  }, []);

  useEffect(() => {
    // Get Weather and update intermittently every 5 minutes
    const weather_url = `https://api.weatherapi.com/v1/current.json?key=9bb972c1338243fea82161415213011&q=${location.latitude},${location.longitude}&aqi=no`;

    getWeatherData(weather_url);

    // Fetch properties
    getProperties(location).then(properties => setPropertyMarkers(properties));

    const prepareMarkersData = async () => {
      try {
        const properties = await getProperties(location);
        const data = await Promise.all(
          properties.map(async ({_source: property}) => {
            return {
              id: property._id,
              coordinate: {
                latitude: property.latitude,
                longitude: property.longitude,
              },
              address: await getAddress(property.latitude, property.longitude),
              price: `${formatPrice(property.avg_price)} GBP`,
            };
          }),
        );

        setPropertyMarkers(data);
      } catch (e) {
        Alert.alert('Ooops', 'Something went wrong while fetching properties');
      }
    };

    prepareMarkersData();

    setInterval(() => {
      getWeatherData(weather_url);
    }, WEATHER_UPDATE);
  }, [location]);

  const handleLocationPermission = async () => {
    let checkIfGranted = '';

    // check if location permission is granted
    // if not, request for permission

    // iOS
    if (Platform.OS === 'ios') {
      checkIfGranted = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

      if (
        checkIfGranted === RESULTS.BLOCKED ||
        checkIfGranted === RESULTS.DENIED
      ) {
        await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      }
    }

    // Android
    if (Platform.OS === 'android') {
      checkIfGranted = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

      if (
        checkIfGranted === RESULTS.BLOCKED ||
        checkIfGranted === RESULTS.DENIED
      ) {
        await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      }
    }
  };

  const trackUserLocation = () => {
    // will track the user location
    const watchId = Geolocation.watchPosition(
      position =>
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }),
      error => {
        Alert.alert(error.message);
      },
      {enableHighAccuracy: true, useSignificantChanges: true},
    );

    return watchId;
  };

  const formatPrice = price => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleZooming = region => {
    // calculate the zoom level
    const lngDelta = region.longitudeDelta;
    const currentZoomLevel = Math.round(
      Math.log(360 / lngDelta) / Math.LN2 + 1,
    );

    setDisplayMarkers(currentZoomLevel > 10);
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          ...location,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        initialRegion={{
          ...location,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        showsUserLocation={true}
        followsUserLocation={true}
        showsMyLocationButton={true}
        onRegionChange={handleZooming}>
        {displayMarkers &&
          propertyMarkers.map((property, index) => {
            return (
              <Marker key={index} coordinate={property.coordinate}>
                <Callout>
                  <View>
                    <Text style={styles.sectionTitle}>Address</Text>
                    <Text style={styles.calloutText}>{property.address}</Text>
                    <Text style={styles.calloutText}>{property.price}</Text>
                  </View>
                </Callout>
              </Marker>
            );
          })}
        <Heatmap
          points={points.data}
          radius={50}
          opacity={1}
          gradient={heatmap_grad}
          gradientSmoothing={10}
          heatmapMode={'POINTS_DENSITY'}
        />
      </MapView>

      <View style={styles.modalContainer}>
        <View style={styles.place}>
          <Text style={styles.sectionTitle}>Current Location</Text>
          <Text style={[styles.weatherTxt, styles.currentLocation]}>
            {weatherData.name}
          </Text>
        </View>
        <View style={styles.weather}>
          <View style={styles.cloud}>
            <Image style={styles.icon} source={{uri: weatherData.icon}} />
            <Text style={styles.weatherTxt}> {weatherData.cloud}%</Text>
          </View>
          <View style={styles.temp}>
            <Text style={styles.weatherTxt}>
              {weatherData.temp_c}˚C / {weatherData.temp_f}F
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    height: '85%',
  },
  modalContainer: {
    flex: 1,
    position: 'absolute',
    height: '15%',
    width: '100%',
    justifyContent: 'space-around',
    minHeight: 44,
    zIndex: 1,
    padding: 5,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: Theme.background,
  },
  weather: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    alignContent: 'center',
    marginBottom: 10,
  },
  cloud: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '15%',
  },
  place: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 12,
    color: Theme.gray,
  },
  temp: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '15%',
  },
  title: {
    fontSize: 20,
    color: Theme.primary,
  },
  weatherTxt: {
    fontSize: 15,
    color: Theme.secondary,
  },
  calloutText: {
    fontWeight: '500',
    marginBottom: 5,
    fontSize: 14,
  },
  tapToSave: {
    fontSize: 10,
    marginVertical: 5,
  },
  currentLocation: {
    fontSize: 20,
  },
  lastUpdateLabel: {
    textAlign: 'left',
    color: 'gray',
  },
  lastUpdate: {
    textAlign: 'right',
    fontSize: 20,
  },
  icon: {
    width: 32,
    height: undefined,
    aspectRatio: 1,
    justifyContent: 'flex-start',
  },
});

export default App;
