function walk(
    maze: string[],
    wall: string,
    curr: Point,
    end: Point,
    seen: boolean[][],
): boolean {
    // 1. Base Case off the map?
    if (
        curr.x < 0 ||
        curr.x >= maze[0].length ||
        curr.y < 0 ||
        curr.y >= maze[0].length
    )
        return false;

    // 2. Base case are we on a wall?
    if (maze[curr.y][curr.x] === wall) return false;

    // 3. are we at the end of the path?
    if (curr.x === end.x && curr.y === end.y) return true;

    // 4. If we've already seen it?
    if (seen[curr.y][curr.x]) return false;
}

export default function solve(
    maze: string[],
    wall: string,
    start: Point,
    end: Point,
): Point[] {}
