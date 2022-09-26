import { createContext } from 'react';
import { assign, createMachine } from "xstate";

export const MachineContext = createContext();

export const BranchMachine = createMachine(
  {
    predictableActionArguments: true,
    id: "branchMachine",
    initial: "loading",
    context: {
      closest: [],
    },
    states: {
      loading: {
        on: {
          SET_CLOSEST: {
            actions: assign({
              closest: (_, event) => event.data,
            }),
          },
        },
      }
    },
  }
);

