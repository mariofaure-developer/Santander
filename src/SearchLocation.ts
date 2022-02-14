import * as Location from 'expo-location';

export type SearchLocation =
  | undefined
  | 'fetching'
  | 'no-result'
  | 'error'
  | Location.LocationGeocodedLocation;
