import * as Location from 'expo-location';
import { Branch } from './Branch';

type Coordinate = {
  latitude: number;
  longitude: number;
};

// https://stackoverflow.com/a/65799152/5225716
function distanceBetween(coord1: Coordinate, coord2: Coordinate) {
  if (
    coord1.latitude == coord2.latitude &&
    coord1.longitude == coord2.longitude
  ) {
    return 0;
  }

  const radlat1 = (Math.PI * coord1.latitude) / 180;
  const radlat2 = (Math.PI * coord2.latitude) / 180;
  const theta = coord1.longitude - coord2.longitude;
  const radtheta = (Math.PI * theta) / 180;

  let dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

  if (dist > 1) {
    dist = 1;
  }

  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  dist = dist * 1.609344; //convert miles to km

  return dist;
}

export function closestBranchTo(
  location: Location.LocationGeocodedLocation,
  branches: Branch[],
): Branch | undefined {
  let closestBranch = undefined;
  let closestDistance = Number.MAX_VALUE;
  branches.forEach((branch) => {
    if (branch.PostalAddress.GeoLocation) {
      const distance = distanceBetween(location, {
        latitude: parseFloat(
          branch.PostalAddress.GeoLocation.GeographicCoordinates.Latitude,
        ),
        longitude: parseFloat(
          branch.PostalAddress.GeoLocation.GeographicCoordinates.Longitude,
        ),
      });
      if (distance < closestDistance) {
        closestBranch = branch;
        closestDistance = distance;
      }
    }
  });
  return closestBranch;
}
