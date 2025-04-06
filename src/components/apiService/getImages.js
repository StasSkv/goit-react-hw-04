import axios from 'axios';

const API_KEY = 'oNpGMpgaibADokunuTZQIjG2DkS1Gw5n_IACBzuK4z8';
axios.defaults.baseURL = 'https://api.unsplash.com/';

export const getImages = async (query, page) => {
  const { data } = await axios.get('search/photos', {
    params: {
      client_id: API_KEY,
      query,
      page,
      per_page: 12,
    },
  });

  return {
    images: data.results,
    total_pages: data.total_pages,
  };
};
