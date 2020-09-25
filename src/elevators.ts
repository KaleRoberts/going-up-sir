
/*
    elevator.ts
    Add solutions in here
    Quick checks - are we already in the desired position?
        - Can we even satisfy the condition given the state of the elevators?

    Could work backwards from the known end
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

    So if we were to, "merge" all of the states together we could possibly assign coordinates
    to every elevator position


*/
import _ from 'lodash';
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

    let positions = {};

    // Is there another elevator on the same floor as me in the next time interval?
    // If there isn't then you have to stay in the same elevator until there is another at your floor

    // Current problem is that I can't check against the same time
    // If there is an elevator at the same time on my current floor do you get in it?
    const checkForNextElevator = (start, time, positions, finalFloor) => {
        let nextElevator;
        const nextPositions = _.omit(positions, [`${start}${time}`]);

        for(const prop in nextPositions) {
            if((positions[`${start}${time}`] === nextPositions[`${prop.charAt(0)}${prop.charAt(1)}`])) {
                console.log(`Checking`, `${start}${time}`, (positions[`${start}${time}`]),  `${prop}`, (nextPositions[`${prop.charAt(0)}${prop.charAt(1)}`]));
                console.log('The next elevator is', prop);
                steps.push(prop);
                nextElevator = prop;    
            } else {
                steps.push(`${start}${time}`);
                nextElevator = `${start}${time}`;
            }
        }
        // for(const prop in positions) {          
        //     // if(prop !== `${start}${time}`) {    //Don't check the same key
        //     // if((positions[`${start}${time}`] === positions[prop])){
        //     //     delete(positions[prop]);
        //     // }

        //     const nextPositions = _.omit(positions, [`${currentElevator}${time}`]);

        //     if((positions[`${start}${time}`] === nextPositions[`${prop}${time}`])) {
        //         console.log(`Checking`, `${start}${time}`, (positions[`${start}${time}`]),  `${prop}`, (positions[prop]));
        //         console.log('The next elevator is', prop);
        //         steps.push(prop);
        //         nextElevator = prop;    
        //     } else {
        //         steps.push(`${start}${time}`);
        //         nextElevator = `${start}${time}`;
        //     }
        //     // if((positions[`${start}${time}`] === positions[prop])){
        //     //     console.log(`Checking`, `${start}${time}`, (positions[`${start}${time}`]),  `${prop}`, (positions[prop]));
        //     //     console.log('The next elevator is', prop);
        //     //     steps.push(prop);
        //     //     nextElevator = prop;    
        //     // }
        //     // } 
        // }
        return nextElevator;
    }

    // Time interval 1 is now 0
    // Establish where each elevator is at a given time interval

    for(let i = 0; i < cleandUpStates.length; i++) {
        positions["A" + i] = mapFloor(cleandUpStates[i].indexOf("A"));
        positions["B" + i] = mapFloor(cleandUpStates[i].indexOf("B"));
        positions["C" + i] = mapFloor(cleandUpStates[i].indexOf("C"));
        positions["D" + i] = mapFloor(cleandUpStates[i].indexOf("D"));
    }
    

    /* 
        I think working backwards might be the best approach
        Compare final parameter <floor>-<time> to our floors+times object and see which elevator is there
        We want to know which elevator(s) is/are on a particular floor
    */

    let steps:string [] = [];
    const finalFloor = +final.charAt(0);
    let finalTime: number = +final.charAt(2);
    finalTime = finalTime - 1;
    

    steps.push(start);
    let currentElevator = start;
    // checkForNextElevator(currentElevator, 0, positions, finalFloor);

    // const nextPositions = _.omit(positions, ['A0']);
    // console.log(nextPositions);

    for(let time = 0; time < finalTime; time++) {

        currentElevator = checkForNextElevator(currentElevator, time, positions, finalFloor);
    }


    // if(positions[`${start}`+ `${i + 1}`] getStartingFloor(start,positions))


    // What is the elevator in the last position?
    // for(const prop in positions) {
    //     console.log(`${prop} : ${positions[prop]}`);
    //     if(positions[prop] === finalFloor) {
    //         console.log(`The final elevator is ${prop} on floor ${finalFloor}`)
    //     }
    // }

    // Then it becomes how to get from A to D?

    // console.log(positions[`A`+`${finalTime - 1}`]);

    // if(state[`${finalElevator}+${finalTime - 1}`]) {
        
    // }
 
    return steps.join();
}

console.log(findElevatorPath({
    states: elevatorStates,
    start: "A",
    final: "5-5"
}));