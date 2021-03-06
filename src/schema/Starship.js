/* @flow */

import composeWithRest from 'graphql-compose-rest';
import {
  createFindByIdResolver,
  createFindListByPageNumberResolver,
  createFindByUrlListResolver,
} from '../utils';
import PersonTC from './Person';
import FilmTC from './Film';

const restApiResponse = {
  name: 'Millennium Falcon',
  model: 'YT-1300 light freighter',
  manufacturer: 'Corellian Engineering Corporation',
  cost_in_credits: '100000',
  length: '34.37',
  max_atmosphering_speed: '1050',
  crew: '4',
  passengers: '6',
  cargo_capacity: '100000',
  consumables: '2 months',
  hyperdrive_rating: '0.5',
  MGLT: '75',
  starship_class: 'Light freighter',
  pilots: [
    'https://swapi.co/api/people/13/',
    'https://swapi.co/api/people/14/',
    'https://swapi.co/api/people/25/',
    'https://swapi.co/api/people/31/',
  ],
  films: [
    'https://swapi.co/api/films/2/',
    'https://swapi.co/api/films/7/',
    'https://swapi.co/api/films/3/',
    'https://swapi.co/api/films/1/',
  ],
  created: '2014-12-10T16:59:45.094000Z',
  edited: '2014-12-22T17:35:44.464156Z',
  url: 'https://swapi.co/api/starships/10/',
};

const StarshipTC = composeWithRest('Starships', restApiResponse);

export default StarshipTC;

createFindByIdResolver(StarshipTC, 'starships');

createFindListByPageNumberResolver(StarshipTC, 'starships');

createFindByUrlListResolver(StarshipTC);

StarshipTC.addRelation('pilots', {
  resolver: () => PersonTC.getResolver('findByUrlList'),
  prepareArgs: {
    urls: source => source.pilots,
  },
});

StarshipTC.addRelation('films', {
  resolver: () => FilmTC.getResolver('findByUrlList'),
  prepareArgs: {
    urls: source => source.films,
  },
});
