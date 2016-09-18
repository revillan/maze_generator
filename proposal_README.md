## Prim's Maze Generator

This will generate a maze on a randomly weighted grid using
Prim's algorithm.

### Functionality and MVP

The user will be able to click inside a box to begin the generation of maze
starting from where the user clicked. The maze will be illustrate Prim's
algorithm by showing edge cells (cells in the priority queue) in a different
color

### Wireframes

![wireframes](./maze.png)

### Technologies

This project will use
- Vanilla JavaScript and `jquery` for logic within each iteration of the algorithm
- `HTML5 Canvas` for rendering the maze at each iteration.
- webpack to bundle scripts

Additionally, the project will involve these scripts:

`queue.js`: which will handle the logic of keeping track of edge cells in the grid

`prims.js`: which will execute the logic of prims algorithm

`maze.js`: which will use `Canvas` to render the maze

### Implementation Timeline

**Day 1**

- [ ] configure webpack
- [ ] write skeleton for remaining files
- [ ] re-familiarize myself with Canvas

**Day 2**

- [ ] write code to implement a priority queue for edge cells
- [ ] start writing code to implement Prim's algorithm and generate weighted grid

**Day 3**
- [ ] finish implementing Prim's algorithm
- [ ] add a listener for user's click

### Bonus
- slider to change the speed of the animation
- solve the maze after generating it
