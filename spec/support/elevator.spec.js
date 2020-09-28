"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../../src");
describe('Elevator path finder functionality', () => {
    const displayCleanStates = (states) => {
        const cleanUp = /[' ']/gis;
        // Display states nicely as well out the states
        return states.map((state) => {
            return state.replace(cleanUp, '');
        });
    };
    it(`should find the path given valid states, starting and final parameters`, () => {
        const elevatorTests = [
            {
                start: "A",
                final: "5-5",
                states: [
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
                ],
                expectation: "AABDD"
            },
            {
                start: "C",
                final: "3-5",
                states: [
                    // State @ t=1
                    `xx.x.x.xDxx
                     xx.x.x.x.xx
                     xx.x.x.x.xx
                     xx.xBx.x.xx
                     xx.x.xCx.xx
                     xxAx.x.x.xx`,
                    // State @ t=2
                    `xx.x.xCx.xx
                     xx.x.x.x.xx
                     xxAx.x.x.xx
                     xx.xBx.x.xx
                     xx.x.x.x.xx
                     xx.x.x.xDxx`,
                    // State @ t=3
                    `xxAx.xCx.xx
                     xx.x.x.x.xx
                     xx.x.x.x.xx
                     xx.xBx.x.xx
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
                    `xx.x.x.x.xx
                     xx.x.x.x.xx
                     xx.x.x.xDxx
                     xxAx.x.x.xx
                     xx.xBx.x.xx
                     xx.x.x.x.xx`
                ],
                expectation: "CCAAA"
            },
            {
                start: "B",
                final: "1-5",
                states: [
                    // State @ t=1
                    `xx.x.x.xDxx
                     xx.x.x.x.xx
                     xx.x.x.x.xx
                     xx.xBx.x.xx
                     xx.x.xCx.xx
                     xxAx.x.x.xx`,
                    // State @ t=2
                    `xx.x.xCx.xx
                     xx.x.x.x.xx
                     xxAx.x.x.xx
                     xx.xBx.x.xx
                     xx.x.x.x.xx
                     xx.x.x.xDxx`,
                    // State @ t=3
                    `xxAx.xCx.xx
                     xx.x.x.x.xx
                     xx.x.x.x.xx
                     xx.xBx.x.xx
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
                    `xx.x.x.x.xx
                     xx.x.x.x.xx
                     xx.x.x.x.xx
                     xxAx.x.x.xx
                     xx.xBx.x.xx
                     xx.x.x.xDxx`
                ],
                expectation: "BBBDD"
            },
            {
                start: "B",
                final: "1-5",
                states: [
                    // State @ t=1
                    `xx.x.x.xDxx
                     xx.x.x.x.xx
                     xx.x.x.x.xx
                     xx.xBx.x.xx
                     xx.x.xCx.xx
                     xxAx.x.x.xx`,
                    // State @ t=2
                    `xx.x.xCx.xx
                     xx.x.x.x.xx
                     xxAx.x.x.xx
                     xx.xBx.x.xx
                     xx.x.x.x.xx
                     xx.x.x.xDxx`,
                    // State @ t=3
                    `xxAx.xCx.xx
                     xx.x.x.x.xx
                     xx.x.x.x.xx
                     xx.xBx.x.xx
                     xx.x.x.x.xx
                     xx.x.x.xDxx`,
                    // State @ t=4
                    `xx.x.xCx.xx
                     xx.x.x.x.xx
                     xxAxBx.xDxx
                     xx.x.x.x.xx
                     xx.x.x.x.xx
                     xx.x.x.x.xx`,
                    // State @ t=5
                    `xx.x.x.x.xx
                     xx.x.x.x.xx
                     xx.x.x.x.xx
                     xxAx.x.x.xx
                     xx.xBx.x.xx
                     xx.x.x.xDxx`
                ],
                expectation: "BBBDD"
            }
        ];
        elevatorTests.forEach(test => {
            console.log(`Starting elevator is ${test.start}`);
            console.log(`Ending floor and time is ${test.final}`);
            console.log(`Testing the following elevator states:`);
            console.log(displayCleanStates(test.states));
            expect(src_1.findElevatorPath(test)).toEqual(test.expectation);
        });
    });
    it(`should NOT be able to find a valid path given a starting and final parameter`, () => {
        const negativeElevatorTets = [
            {
                start: "C",
                final: "4-4",
                states: [
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
                ],
                expectation: "NO SUCCESSFUL ROUTE"
            },
            {
                start: "B",
                final: "6-5",
                states: [
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
                    `xx.x.x.x.xx
                 xx.x.x.xDxx
                 xx.x.xCx.xx
                 xx.x.x.x.xx
                 xxAxBx.x.xx
                 xx.x.x.x.xx`,
                ],
                expectation: "NO SUCCESSFUL ROUTE"
            },
            {
                start: "D",
                final: "6-5",
                states: [
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
                    `xx.x.x.x.xx
                 xx.x.x.xDxx
                 xx.x.xCx.xx
                 xx.x.x.x.xx
                 xxAxBx.x.xx
                 xx.x.x.x.xx`,
                ],
                expectation: "NO SUCCESSFUL ROUTE"
            }
        ];
        negativeElevatorTets.forEach(test => {
            console.log(`Starting elevator is ${test.start}`);
            console.log(`Ending floor and time is ${test.final}`);
            console.log(`Testing the following elevator states:`);
            console.log(displayCleanStates(test.states));
            expect(src_1.findElevatorPath(test)).toEqual(test.expectation);
        });
    });
});
//# sourceMappingURL=elevator.spec.js.map