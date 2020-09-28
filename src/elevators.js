"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findElevatorPath = void 0;
const elevatorStates = [
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
['xx.x.x.xDxx\nxx.x.x.x.xx\nxx.x.x.x.xx\nxx.xBx.x.xx\nxx.x.xCx.xx\nxxAx.x.x.xx',
    'xx.x.x.x.xx\nxx.x.x.x.xx\nxxAx.x.x.xx\nxx.xBx.x.xx\nxx.x.xCx.xx\nxx.x.x.xDxx',
    'xx.x.xCx.xx\nxx.x.x.x.xx\nxx.x.x.x.xx\nxxAxBx.x.xx\nxx.x.x.x.xx\nxx.x.x.xDxx',
    'xx.x.xCx.xx\nxx.x.x.x.xx\nxx.xBx.xDxx\nxx.x.x.x.xx\nxxAx.x.x.xx\nxx.x.x.x.xx',
    'xx.x.xCx.xx\nxx.x.x.xDxx\nxx.x.x.x.xx\nxx.x.x.x.xx\nxxAxBx.x.xx\nxx.x.x.x.xx'];
exports.findElevatorPath = (params) => {
    const { states, start, final } = params;
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
    const mapFloor = (idx) => {
        let floor = 0;
        if (idx < 11) {
            floor = 6;
        }
        if (idx > 11 && idx < 23) {
            floor = 5;
        }
        if (idx > 23 && idx < 35) {
            floor = 4;
        }
        if (idx > 35 && idx < 47) {
            floor = 3;
        }
        if (idx > 47 && idx < 57) {
            floor = 2;
        }
        if (idx > 59 && idx < 69) {
            floor = 1;
        }
        return floor;
    };
    const Afloors = new Array();
    const Bfloors = new Array();
    const Cfloors = new Array();
    const Dfloors = new Array();
    for (let i = 0; i < cleandUpStates.length; i++) {
        Afloors.push(mapFloor(cleandUpStates[i].indexOf("A")));
        Bfloors.push(mapFloor(cleandUpStates[i].indexOf("B")));
        Cfloors.push(mapFloor(cleandUpStates[i].indexOf("C")));
        Dfloors.push(mapFloor(cleandUpStates[i].indexOf("D")));
    }
    const positions = {
        A: Afloors,
        B: Bfloors,
        C: Cfloors,
        D: Dfloors
    };
    let steps = [];
    const finalFloor = +final.charAt(0);
    let finalTime = +final.charAt(2);
    let currentElevator = start;
    // checkForNextElevator(currentElevator, 0, positions, finalFloor);
    // const nextPositions = _.omit(positions, ['A0']);
    /*
        Check every elevator, if we checked every elevator and there was no match stay in the same elevator.
    */
    const elevators = Object.getOwnPropertyNames(positions);
    // elevators.forEach((elevator) => {
    //     console.log(elevator.localeCompare(currentElevator));
    // })
    let retry = 0;
    steps.push(currentElevator);
    console.log(finalTime);
    for (let i = 0; i <= finalTime; i++) {
        console.log("The currentElevator is:", currentElevator, '\n');
        for (let k = 0; k < elevators.length; k++) {
            if (elevators[k].localeCompare(currentElevator) > 0) {
                console.log("Comparing against elevator", elevators[k]);
                if (retry === 3) {
                    steps.push(currentElevator);
                }
                if (positions[currentElevator][i] === positions[elevators[k]][i]) {
                    console.log("Hitting match condition", positions[currentElevator][i], positions[elevators[k]][i]);
                    console.log("Changing elevators to elevator", elevators[k]);
                    steps.push(elevators[k]);
                    currentElevator = elevators[k];
                    // return currentElevator;
                    break;
                }
                else {
                    console.log("Hitting else condition", positions[currentElevator][i], positions[elevators[k]][i]);
                    currentElevator = currentElevator;
                    retry += 1;
                }
            }
        }
    }
    return steps.join(',');
};
console.log(exports.findElevatorPath({
    states: elevatorStates,
    start: "A",
    final: "5-5"
}));
//# sourceMappingURL=elevators.js.map