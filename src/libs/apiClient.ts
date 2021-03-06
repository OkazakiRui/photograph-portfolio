import aspida from '@aspida/fetch';
import api from 'apis/$api';

export const endPoint = process.env.BASE_API_URL;
export const apiKey = process.env.X_MICROCMS_API_KEY;

if (endPoint === undefined)
  throw new Error('環境変数に BASE_API_URL をセットしてください');
if (apiKey === undefined)
  throw new Error('環境変数に X_MICROCMS_API_KEY をセットしてください');

const config = {
  headers: {
    'X-MICROCMS-API-KEY': apiKey,
  },
};

const fetchClient = api(aspida(fetch, { baseURL: endPoint }));

export const getAllPost = (filter?: string) => {
  if (filter === 'selected')
    return fetchClient.post.$get({
      config,
      query: { limit: 1000, filters: 'favorite[equals]true' },
    });

  if (!filter) return fetchClient.post.$get({ config, query: { limit: 1000 } });

  return fetchClient.post.$get({
    config,
    query: { limit: 1000, filters: `genre[contains]${filter}` },
  });
};

export const getPostById = (id: string) =>
  fetchClient.post._contentId(id).$get({ config }); // eslint-disable-line no-underscore-dangle

export const getAllGenre = () =>
  fetchClient.genre.$get({ config, query: { limit: 1000 } });

export const getGenreIdByName = (name: string) => {
  if (!name) throw new Error('nameが引数に渡されてません');

  return fetchClient.genre.$get({
    config,
    query: { limit: 1, filters: `genreName[equals]${name}` },
  });
};
