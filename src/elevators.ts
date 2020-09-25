
/*
    elevator.ts
    Add solutions in here
    Quick checks - are we already in the desired position?
        - Can we even satisfy the condition given the state of the elevators?

    Could work backwards from the known beginning and known end
    since we know the start and the end.
    If you start in elevator A, and need to get to floor 5 by t=5 then
    you wouldn't want to go back down to floor 1 because you'd run out
    of steps to get to floor 5
    But there could be issues with this approach

    const path = ['A', 'D'];

    Thought about trying to, "merge" the states/array indicies and give a given elevator coordinates
    E.g.
        xx.x.x.xDxx
        xx.x.x.x.xx
        xx.x.x.x.xx
        xx.xBx.x.xx
        xx.x.xCx.xx
        xxAx.x.x.xx

    Here A would be (1,1) where t=1 and A is on the first floor
    C is (1, 2) again t=1 and C is on the second floor
    B is (1, 3)

    So if we were to, "merge" all of the states together we could assign coordinates
    to every elevator position


*/

export interface FindElevatorPathParams {
    states: string [];
    start: string;
    final: string;
}

const elevatorStates: string[] = [
    // State @ t=1
    `xx.x.x.xDxx
     xx.x.x.x.xx
     xx.x.x.x.xx
     xx.xBx.x.xx
     xx.x.xCx.xx
     xxAx.x.x.xx`,
    // State @ t=2
    `xx.x.x.x.xx
     xx.x.x.x.xx
     xxAx.x.x.xx
     xx.xBx.x.xx
     xx.x.xCx.xx
     xx.x.x.xDxx`,
    // State @ t=3
    `xx.x.xCx.xx
     xx.x.x.x.xx
     xx.x.x.x.xx
     xxAxBx.x.xx
     xx.x.x.x.xx
     xx.x.x.xDxx`,
    // State @ t=4
    `xx.x.xCx.xx
     xx.x.x.x.xx
     xx.xBx.xDxx
     xx.x.x.x.xx
     xxAx.x.x.xx
     xx.x.x.x.xx`,
     // State @ t=5
    `xx.x.xCx.xx
     xx.x.x.xDxx
     xx.x.x.x.xx
     xx.x.x.x.xx
     xxAxBx.x.xx
     xx.x.x.x.xx`
];

// CleanedUpStates
//            11           23           35           47           59

[ 'xx.x.x.xDxx\nxx.x.x.x.xx\nxx.x.x.x.xx\nxx.xBx.x.xx\nxx.x.xCx.xx\nxxAx.x.x.xx',
  'xx.x.x.x.xx\nxx.x.x.x.xx\nxxAx.x.x.xx\nxx.xBx.x.xx\nxx.x.xCx.xx\nxx.x.x.xDxx',
  'xx.x.xCx.xx\nxx.x.x.x.xx\nxx.x.x.x.xx\nxxAxBx.x.xx\nxx.x.x.x.xx\nxx.x.x.xDxx',
  'xx.x.xCx.xx\nxx.x.x.x.xx\nxx.xBx.xDxx\nxx.x.x.x.xx\nxxAx.x.x.xx\nxx.x.x.x.xx',
  'xx.x.xCx.xx\nxx.x.x.xDxx\nxx.x.x.x.xx\nxx.x.x.x.xx\nxxAxBx.x.xx\nxx.x.x.x.xx' ]

export const findElevatorPath = (params: FindElevatorPathParams): string => {
    const {states, start, final} = params;

    const elevators = /ABCD/gi
    const cleanUp = /[' ']/gis;

    // Flatten out the states
    const cleandUpStates = states.map((state) => {
        return state.replace(cleanUp, ''); 
    });

    console.log(cleandUpStates);

    // Could determine floor level by index range
    // if index between 0 and 11 then its on the first floor

    /*
        Index mappings
        0 - 10 is floor 6
        12 - 22 is floor 5
        24 - 34 is floor 4
        36 - 46 is floor 3
        48 - 58 is floor 2
        60 - 70 is floor 1
    */

    const mapFloor = (idx: number): number => {
        let floor: number = 0;

        if(idx < 11) {
            floor = 6
        }
        if(idx > 11 && idx < 23) {
            floor = 5
        }
        if(idx > 23 && idx < 35) {
            floor = 4
        }
        if(idx > 35 && idx < 47) {
            floor = 3
        }
        if (idx > 47 && idx < 57) {
            floor = 2
        }
        if (idx > 59 && idx < 69) {
            floor = 1
        }
          
        return floor;
    }


    // let state1 = {
    //     A: mapFloor(cleandUpStates[0].indexOf("A")),
    //     B: mapFloor(cleandUpStates[0].indexOf("B")),
    //     C: mapFloor(cleandUpStates[0].indexOf("C")),
    //     D: mapFloor(cleandUpStates[0].indexOf("D"))
    // }  

    // console.log(state1.A);
    // console.log(state1.B);
    // console.log(state1.C);
    // console.log(state1.D);

    let state = {}

    // Time interval 1 is now 0
    // Establish where each elevator is at a given time interval

    for(let i = 0; i < cleandUpStates.length; i++) {
        state["A" + i] = mapFloor(cleandUpStates[i].indexOf("A"));
        state["B" + i] = mapFloor(cleandUpStates[i].indexOf("B"));
        state["C" + i] = mapFloor(cleandUpStates[i].indexOf("C"));
        state["D" + i] = mapFloor(cleandUpStates[i].indexOf("D"));
    }
    

    /* 
        I think working backwards might be the best approach
        Compare final parameter <floor>-<time> to our floors+times object and see which elevator is there
        We want to know which elevator(s) is/are on a particular floor
    */

    let steps:string [] = [];
    const finalElevator = final.charAt(2);
    const finalTime = final.charAt(0);



    /*
    Quick representation of what our state object looks like
        state {
            A0: 1
            B0: 3
            C0: 999
            D0: 999
            A1:
            B1:
            C1:
            D1:

        }
    */

    console.log(state["A0"]);
    console.log(state["B0"]);
    console.log(state["C4"]);

    return "AABBDD";
}

console.log(findElevatorPath({
    states: elevatorStates,
    start: "A",
    final: "5-5"
}));