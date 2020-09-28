# going-up-sir
Elevator traversal

https://youtu.be/20lcB9c-Qa0

# How to run/start/test
```yarn test``` or ```npm test```

# Just running yarn start
```yarn start``` or ```npm start```
You'll need to uncomment the end of elevators.ts
if you just want to run through a single state. Or you can edit the tests
and run ```yarn test```


## The Elevator Problem

Elevator Problem

The following diagram (given as a multi-line string) is an elevator state – the state of an elevator system at a given point in time.  Dots represent an elevator shaft.  Letters (specifically A-Z) represent an elevator – for example, elevator A is on the 1st floor (1-indexed), and the following elevator state has 6 floors:

 xx.x.x.xDxx
 xx.x.x.x.xx
 xx.x.x.x.xx
 xx.xBx.x.xx
 xx.x.xCx.xx
 xxAx.x.x.xx


Goal: Take as input a series of elevator states from an array, representing successive states of the elevator system from time t = {1,2,3…}.  Valid elevators are specified by the characters A-Z.

Write a function that takes an array of elevator states, the starting elevator, and the final destination (floor) desired by the user.  Your function should be similar to:

findElevatorPath(elevatorStates, startingElevator, finalDestination)


Where <finalDestination> is a string specified as <floor>-<time>, e.g. “3-2”, indicating that the final destination is the 3rd floor at time t=2.


At t=1, you begin in the elevator specified by <startingElevator>, e.g. “A”.

In a given time period, you can board an elevator or stay on the elevator you are on. In any time period, you can only board any elevator on the same floor as the elevator that you are currently on (including t=1).


The goal is to find a series of legal actions that lead to you being at the final destination – the right floor at the right time.  The set of actions should be returned from the function as a series of actions in a single string. An action is defined as the elevator you board (or stay on) at time t, eg:


“AABDD”


Indicates that you were on (or switched to) A at t=1, stayed on A at t=2, switched to B at t=3, and switched to D at t=4, and stayed on D at t=5.

If there is a solution, the solution string is the *only* thing that should be returned by the function.  If there is no solution, return something appropriate (e.g., “NO SUCCESSFUL ROUTE”).


Sample Input:


elevatorStates = [
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

startingElevator = "A"
finalDestination = "5-5"

Sample Output:
"AABDD"


## Quick representation of what our positions object looks like
{
  A: [ 1, 4, 3, 2, 2 ],
  B: [ 3, 3, 3, 4, 2 ],
  C: [ 2, 2, 6, 6, 6 ],
  D: [ 6, 1, 1, 4, 5 ]
}


## Pitfalls and additions with more time
**Does not handle the case of 3 elevators being on the same floor at the same time.
I would need to write additional logic to check all matches for overlap with the final elevator and then make a decision about that.

Order of magnitude is linear but somewhat high for this considering the use of nested loops and that we have to sometimes check against all other indicies of the positions array. I think we end up at O(3n) for our Big-O 

Floor mapping is not as dynamic as I would've liked, the mapFloor method is hardcoded against the cleaned up elevator states. Improvements could be made here to make the overall method more flexible and handle any array (using some marker for new floors such as the newline that already exists in our examples here.)