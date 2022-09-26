import React, { useContext } from "react";
import MapView, { Marker, Callout } from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';
import { branchAddress, Branch } from './Branch';
import { useEffect, useRef } from 'react';
import { MachineContext } from './machine/BranchMachine';

export default function Map() {

  const mapRef = useRef();
  const machine  = useContext(MachineContext);
  const {...branch}  = machine.currentMachine.context;
  const closest = branch.closest as Branch[];

  const EDGE_PADDING = {
    top: 100,
    right: 100,
    bottom: 100,
    left: 100
  }

  useEffect(() => {
    if (mapRef.current && closest) {
      setTimeout(() => {
        mapRef.current?.fitToSuppliedMarkers(closest.map( (element: { Identification: any; })  => element.Identification), {edgePadding: EDGE_PADDING});

      }, 500);
    }
  }, [closest]);

  function renderMarkers(){

    let markers: JSX.Element[] = [];

    {closest && closest.forEach(branch => {
          {branch && branch.PostalAddress.GeoLocation && (
            markers.push(<Marker
            key={branch.Identification}
            title={branch.Name}
            identifier={branch.Identification}
            description={branchAddress(branch)}
            coordinate={{
              latitude: parseFloat(
                branch.PostalAddress.GeoLocation.GeographicCoordinates
                  .Latitude,
              ),
              longitude: parseFloat(
                branch.PostalAddress.GeoLocation.GeographicCoordinates
                  .Longitude,
              ),
            }}>
            <Callout tooltip>
              <View style={styles.callout}>
                <Text style={styles.calloutHeader}>
                  {branch.Name || branch.Identification}
                </Text>
                <Text style={styles.calloutText}>{branchAddress(branch)}</Text>
              </View>
            </Callout>
          </Marker>)
        )}
    })}

    return markers;

  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: 55.77,
          latitudeDelta: 11.03,
          longitude: -2.82,
          longitudeDelta: 11.35,
        }}>
          {
            renderMarkers()
          }
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex:1
  },
  map: StyleSheet.absoluteFillObject,
  callout: {
    padding: 5,
    backgroundColor: '#ffffffa0',
    borderRadius: 4,
  },
  calloutHeader: {
    fontFamily: 'textBold',
    color: 'black',
    fontSize: 14,
  },
  calloutText: {
    fontFamily: 'textRegular',
    color: 'black',
    fontSize: 10,
  },
});
