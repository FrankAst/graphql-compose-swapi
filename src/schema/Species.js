/* @flow */

import composeWithRest from 'graphql-compose-rest';
import {
  createFindByIdResolver,
  createFindListByPageNumberResolver,
  createFindByUrlListResolver,
} from '../utils';
import PersonTC from './Person';
import FilmTC from './Film';
import PlanetTC from './Planet';

const restApiResponse = {
  name: 'Toong',
  classification: 'unknown',
  designation: 'sentient',
  average_height: '200',
  skin_colors: 'grey, green, yellow',
  hair_colors: 'none',
  eye_colors: 'orange',
  average_lifespan: 'unknown',
  homeworld: 'https://swapi.co/api/planets/41/',
  language: 'Tundan',
  people: ['https://swapi.co/api/people/50/'],
  films: ['https://swapi.co/api/films/4/', 'https://swapi.co/api/films/6/'],
  created: '2014-12-20T10:08:36.795000Z',
  edited: '2014-12-20T21:36:42.177000Z',
  url: 'https://swapi.co/api/species/19/',
};

const SpeciesTC = composeWithRest('Species', restApiResponse);

export default SpeciesTC;

createFindByIdResolver(SpeciesTC, 'species');

createFindListByPageNumberResolver(SpeciesTC, 'species');

createFindByUrlListResolver(SpeciesTC);

SpeciesTC.addRelation('homeworld', {
  resolver: () => PlanetTC.getResolver('findByUrl'),
  prepareArgs: {
    urls: source => source.homeworld,
  },
});

SpeciesTC.addRelation('people', {
  resolver: () => PersonTC.getResolver('findByUrlList'),
  prepareArgs: {
    urls: source => source.people,
  },
});

SpeciesTC.addRelation('films', {
  resolver: () => FilmTC.getResolver('findByUrlList'),
  prepareArgs: {
    urls: source => source.films,
  },
});
