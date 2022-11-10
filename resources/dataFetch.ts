import data from './data.json';
import { kebabCase } from '../lib/utils';

export type Destination = {
  name: string,
  images: {
    png: string,
    webp: string,
  },
  description: string,
  distance: string,
  travel: string
}

export type Crew = {
  name: string;
  images: {
    png: string,
    webp: string,
  },
  role: string,
  bio: string
}

export type Technology = {
  name: string,
  images: {
    portrait: string,
    landscape: string,
  },
  description: string
}

export function getFirstPageNameForEachNavItem() {
  return {
    destination: data.destinations[0].name,
    crew: data.crew[0].name,
    technology: data.technology[0].name
  };
}

export function getDestinationsData(): Destination[] {
  return data.destinations;
}

export function getCrewData(): Crew[] {
  return data.crew;
}


export function getTechnologiesData(): Technology[] {
  return data.technology;

}

export function getDestination(id: string): Destination | null {
  const destinations = data.destinations;

  for (let i = 0; i < destinations.length; i ++) {
    if (id === kebabCase(destinations[i].name)) {
      return destinations[i];
    }
  }
  return null;
}

export function getCrew(id: string): Crew | null {
  const crew = data.crew;

  for (let i = 0; i < crew.length; i ++) {
    if (id === kebabCase(crew[i].name)) {
      return crew[i];
    }
  }
  return null;
}

export function getTechnology(id: string): Technology | null {
  const technologies = data.technology;

  for (let i = 0; i < technologies.length; i ++) {
    if (id === kebabCase(technologies[i].name)) {
      return technologies[i];
    }
  }
  return null;
}
