import elasticSearchAPI from '../config/elasticSearch';
import api from '../config/axiosConfig';

export const getProperties = async (
  {latitude, longitude},
  distance = '1km',
  size = 100,
) => {
  const searchQuery = {
    size,
    query: {
      bool: {
        must: {
          match_all: {},
        },
        filter: {
          geo_distance: {
            distance,
            location: {
              lat: latitude,
              lon: longitude,
            },
          },
        },
      },
    },
  };

  try {
    const response = await elasticSearchAPI.post(
      'postcode_data/_search',
      searchQuery,
    );

    return response.data.hits.hits;
  } catch (e) {
    return e;
  }
};

// send location to server
export const saveProperty = async ({latitude, longitude, id, name}) => {
  try {
    if (!name) {
      name = id;
    }

    const response = await api.post('save_location/', {
      lat: latitude,
      lng: longitude,
      MAC: id,
      name,
    });

    return response.data;
  } catch (e) {
    console.log(e);
    return e;
  }
};
