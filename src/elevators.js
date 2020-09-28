"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findElevatorPath = void 0;
// CleanedUpStates
//            11           23           35           47           59
// [ 'xx.x.x.xDxx\nxx.x.x.x.xx\nxx.x.x.x.xx\nxx.xBx.x.xx\nxx.x.xCx.xx\nxxAx.x.x.xx',
//   'xx.x.x.x.xx\nxx.x.x.x.xx\nxxAx.x.x.xx\nxx.xBx.x.xx\nxx.x.xCx.xx\nxx.x.x.xDxx',
//   'xx.x.xCx.xx\nxx.x.x.x.xx\nxx.x.x.x.xx\nxxAxBx.x.xx\nxx.x.x.x.xx\nxx.x.x.xDxx',
//   'xx.x.xCx.xx\nxx.x.x.x.xx\nxx.xBx.xDxx\nxx.x.x.x.xx\nxxAx.x.x.xx\nxx.x.x.x.xx',
//   'xx.x.xCx.xx\nxx.x.x.xDxx\nxx.x.x.x.xx\nxx.x.x.x.xx\nxxAxBx.x.xx\nxx.x.x.x.xx' ]
exports.findElevatorPath = (params) => {
    const { states, start, final } = params;
    const cleanUp = /[' ']/gis;
    // Flatten out the states
    const cleandUpStates = states.map((state) => {
        return state.replace(cleanUp, '');
    });
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
    const elevators = Object.getOwnPropertyNames(positions);
    let steps = new Array();
    let finalFloor = +final.charAt(0);
    let finalTime = +final.charAt(2);
    let currentElevator = start;
    let finalElevator = '';
    /*
        Determine if a route can actually be found by checking if any
        of the elevators are on the right floor at the end time
    */
    let finalElevatorSearchRetry = 0;
    let finalElevatorSearchLimit = 0;
    for (let i = 0; i < elevators.length; i++) {
        finalElevatorSearchLimit += positions[elevators[i]].length;
    }
    for (let i = 0; i <= finalTime; i++) {
        if (finalElevatorSearchRetry < finalElevatorSearchLimit) {
            for (let k = 0; k < elevators.length; k++) {
                if (positions[elevators[k]][finalTime - 1] === finalFloor) {
                    finalElevator = elevators[k];
                }
                else {
                    finalElevatorSearchRetry += 1;
                }
            }
        }
        else {
            console.log('NO SUCCESSFUL ROUTE');
            return 'NO SUCCESSFUL ROUTE';
        }
    }
    /*
        Decision/Logic Notes
        If we've checked every elevator and there was no match stay in the same elevator.
        If there is another elevator on the same floor, should we get on it?
        Does the elevator you're going to get on ever overlap with the final elevator?
        If not, stay on your current elevator.
    */
    let retry = 0;
    let continueSearch = true;
    for (let i = 0; i < finalTime; i++) { // i is the time count/interval
        /* If we are at the end of the path but we're not on the final floor at
            the final time, then this was an invalid path
         */
        if ((i === finalTime - 1) && positions[currentElevator][i] !== finalFloor) {
            console.log('NO SUCCESSFUL ROUTE');
            return 'NO SUCCESSFUL ROUTE';
        }
        /* If the elevator we've changed to is on the final floor, stop there
        */
        if ((i === finalTime - 1) && (positions[currentElevator][i] === finalFloor)) {
            steps.push(currentElevator);
            continueSearch = false;
            break;
        }
        continueSearch = true;
        retry = 0;
        for (let k = 0; k < elevators.length; k++) { // k is an interator to grab elevator names from our elevators array
            // Not wanting to compare against the same elevator
            if (elevators[k].localeCompare(currentElevator) != 0 && continueSearch) {
                if (positions[currentElevator][i] === positions[elevators[k]][i]) {
                    // We have an elevator on our same floor, now we decide if we should get in that elevator
                    for (let z = 0; z < positions[finalElevator].length - i; z++) { // z is a secondary iterator so we can check a potential elevator against the floors of the final elevator
                        if (elevators[k].localeCompare(finalElevator) === 0) {
                            steps.push(elevators[k]);
                            currentElevator = elevators[k];
                            continueSearch = false;
                            break;
                        }
                        if (positions[elevators[k]][i + 1] === positions[finalElevator][i + 1]) { // z = 3;
                            steps.push(elevators[k]);
                            currentElevator = elevators[k];
                            continueSearch = false;
                            break;
                        }
                        else {
                            currentElevator = currentElevator;
                        }
                    }
                    break;
                }
                else {
                    currentElevator = currentElevator;
                    retry += 1;
                    if (retry === 3) {
                        /* If we've checked all other elevators and couldn't find another on our floor then stay */
                        steps.push(currentElevator);
                        retry = 0;
                        continueSearch = false;
                        break;
                    }
                }
            }
        }
    }
    console.log(steps.join(''));
    return steps.join('');
};
/* If running with yarn start uncomment these*/
// const elevatorStates: string[] = [
//     // State @ t=1
//     `xx.x.x.xDxx
//      xx.x.x.x.xx
//      xx.x.x.x.xx
//      xx.xBx.x.xx
//      xx.x.xCx.xx
//      xxAx.x.x.xx`,
//     // State @ t=2
//     `xx.x.x.x.xx
//      xx.x.x.x.xx
//      xxAx.x.x.xx
//      xx.xBx.x.xx
//      xx.x.xCx.xx
//      xx.x.x.xDxx`,
//     // State @ t=3
//     `xx.x.xCx.xx
//      xx.x.x.x.xx
//      xx.x.x.x.xx
//      xxAxBx.x.xx
//      xx.x.x.x.xx
//      xx.x.x.xDxx`,
//     // State @ t=4
//     `xx.x.xCx.xx
//      xx.x.x.x.xx
//      xx.xBx.xDxx
//      xx.x.x.x.xx
//      xxAx.x.x.xx
//      xx.x.x.x.xx`,
//      // State @ t=5
//     `xx.x.xCx.xx
//      xx.x.x.xDxx
//      xx.x.x.x.xx
//      xx.x.x.x.xx
//      xxAxBx.x.xx
//      xx.x.x.x.xx`
// ];
// console.log(findElevatorPath({
//     states: elevatorStates,
//     start: "A",
//     final: "5-5"
// }));
//# sourceMappingURL=elevators.js.map