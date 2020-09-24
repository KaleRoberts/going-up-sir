// import { findElevatorPath } from '../../src/elevators';
/*
    Make unit tests in here
*/
import { findElevatorPath } from "../../src";

describe('Elevator path finder functionality', () => {

    it('should find the path given valid states, start and final parameters', () => {
        const start="A";
        const final="5-5";
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
             xx.x.x.x.xx`,
           ]

        const params = {
            states: elevatorStates,
            start,
            final
        }

        expect(findElevatorPath(params)).toEqual("AABBCCDD");

    })
})