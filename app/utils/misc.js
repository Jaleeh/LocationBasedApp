import axios from 'axios';

export const getAddress = async (latitude, longitude) => {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=
        ${latitude},${longitude}&key=AIzaSyBDFPa3DBsjSsC37b4lO-wqv-LUColRc4Q`,
  );

  const address = response.data.results
    ? response.data.results[0].formatted_address
    : 'No Address Found';

  return address;
};
