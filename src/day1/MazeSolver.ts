const direction = [
    [-1, 0], // left
    [1, 0], // right
    [0, -1], // down
    [0, 1], // up
];

function walk(
    maze: string[],
    wall: string,
    curr: Point,
    end: Point,
    seen: boolean[][],
    path: Point[],
): boolean {
    // 1. Base Case off the map?
    if (
        curr.x < 0 ||
        curr.x >= maze[0].length ||
        curr.y < 0 ||
        curr.y >= maze[0].length
    )
        return false;

    // 2D array, first maze is an array of strings and you can use array constant selector to get value at a position in a string
    // 2. Base case are we on a wall?
    if (maze[curr.y][curr.x] === wall) return false;

    // 3. are we at the end of the path?
    if (curr.x === end.x && curr.y === end.y) {
        path.push(end);
        return true;
    }

    // 4. If we've already seen it?
    if (seen[curr.y][curr.x]) return false;

    // 3 steps to the recurse case
    // Pre
    seen[curr.y][curr.x] = true;
    // For every tile we recurse over that GETS PAST OUR BASE CASE, we add to our path array and we set that positions spot in the seen2D array as seen.
    path.push(curr);

    // Recurse
    for (let i = 0; i < direction.length; i++) {
        const [x, y] = direction[i];
        if (
            walk(
                maze,
                wall,
                {
                    x: curr.x + x,
                    y: curr.y + y,
                },
                end,
                seen,
                path,
            )
        ) {
            // IF WALK IS SUCCESSFUL
            // console.log("Recurse success curr: ", curr);
            return true;
        }
    }

    // Post - THIN OF POST AS THE CLEAN UP STEP.
    // THESE Pops are for when we reach a dead end and we're retracting our steps backwards. We remove out the elements from the PATH array, because they are already seen, until we get one where the next recursive function returns true
    path.pop();
    return false;
}

export default function solve(
    maze: string[],
    wall: string,
    start: Point,
    end: Point,
): Point[] {
    const seen: boolean[][] = [];
    const path: Point[] = [];
    for (let i = 0; i < maze.length; i++) {
        seen.push(new Array(maze[0].length).fill(false));
    }

    console.log("MAZE: ", maze);
    walk(maze, wall, start, end, seen, path);
    return path;
}
