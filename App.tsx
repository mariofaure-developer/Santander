import React, { createContext } from "react";
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import BranchesInput from './src/BranchesInput';
import { SearchLocation } from './src/SearchLocation';
import Map from './src/Map';
import Spinner from './src/Spinner';
import useLoading from './src/useLoading';
import { closestBranchTo } from './src/distances';
import BranchDetails from './src/BranchDetails';
import { useMachine } from '@xstate/react';
import { BranchMachine, MachineContext } from './src/machine/BranchMachine';

export const MachineProvider = createContext(null);


export default function App() {
  const [state, branches] = useLoading();
  const [search, setSearch] = useState<SearchLocation>();
  const [currentMachine, sendToMachine] = useMachine(BranchMachine);
  const SET_CLOSEST = 'SET_CLOSEST';

  useEffect(() => {
    if (branches && typeof search === 'object') {
      sendToMachine(SET_CLOSEST, { data: closestBranchTo(search, branches) });
    } else {
      sendToMachine(SET_CLOSEST, []);
    }
  }, [search, branches]);



  return (
    <MachineContext.Provider value={{currentMachine, sendToMachine}}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Map />
        {state === 'ready' ? (
          <View style={styles.form}>
            <BranchesInput search={search} setSearch={setSearch} />
            <BranchDetails />
          </View>
        ) : state === 'error' ? (
          <View style={styles.centred}>
            <Text style={styles.error}>An error has occurred</Text>
          </View>
        ) : (
          <View style={styles.centred}>
            <Spinner height={60} />
          </View>
        )}
      </View>
    </MachineContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  form:{
    backgroundColor:'#fff',
    flex:1
  },
  error: {
    fontFamily: 'textRegular',
    fontSize: 24,
    color: '#ED0000',
    padding: 10,
    backgroundColor: '#80808030',
  },
  centred: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
