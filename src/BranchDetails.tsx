import React, { useContext } from "react";
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Branch } from './Branch';
import { FormatList } from './common/Index'
import { MachineContext } from './machine/BranchMachine';

export default function BranchDetails() {

  const  machine  = useContext(MachineContext);
  const  {...branch}  = machine.currentMachine.context;
  const closest = branch.closest as Branch[];

  let branchDetails: JSX.Element[] = [];

  if (closest){
    branchDetails = closest.map((branch, i) =>  
    <View key={`branch_${i}`} style={styles.container}>
    <View style={styles.separator} />
    <View>
      <Text style={styles.branchName}>{branch.Name}</Text>
    </View>
    <View>
      <Text style={styles.text}>
        {`${branch.PostalAddress.BuildingNumber}, ${branch.PostalAddress.StreetName}, ${branch.PostalAddress.TownName}, ${branch.PostalAddress.PostCode}`}
      </Text>
    </View>
    {branch.ServiceAndFacility && (
      <View>
        <Text style={styles.text}>Services: <Text style={styles.textBold}>{FormatList(branch.ServiceAndFacility)}</Text></Text>
      </View>
    )}
    {branch.Accessibility && (
      <View>
        <Text style={styles.text}>Accessibility: <Text style={styles.textBold}>{FormatList(branch.Accessibility)}</Text></Text>
      </View>
    )}
  </View>
    );
  } 

  return (
    <ScrollView>
      { branchDetails }
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 20
  },
  separator:{
    borderBottomColor: 'gainsboro',
    borderBottomWidth: 1,
    marginBottom:10
  },
  text: {
    fontFamily: 'textRegular',
    color: 'black',
    fontSize: 14,
    },
  textBold: {
    fontFamily: 'textBold',
    color: 'black',
    fontSize: 14,
 
  },
  branchName: {
    fontFamily: 'textBold',
    color: '#ED0000',
    fontSize: 16,
  },
});


