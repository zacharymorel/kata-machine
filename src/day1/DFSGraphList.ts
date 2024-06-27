function walk(
    graph: WeightedAdjacencyList,
    curr: number,
    needle: number,
    seen: boolean[],
    path: number[],
): boolean {
    // pre && base cases
    //
    // we've already seen this and we don't want to be here.
    if (seen[curr]) {
        return false;
    }

    // We've now seen current
    seen[curr] = true;

    // Add to the path so we record the path we took.
    path.push(curr);
    // console.log("PATH PUSH| vertex: ", path[path.length - 1]);

    // WE FOUND IT
    if (curr === needle) {
        console.log("found needle path: " + curr, path);
        return true;
    }

    // recurse
    const edges = graph[curr];
    // edges is an arraylist of objects "edges" that has a to and weight.
    for (let i = 0; i < edges.length; i++) {
        const edge = edges[i];

        if (walk(graph, edge.to, needle, seen, path)) {
            // we found the needle.
            console.log("recurse found needle path: " + curr, path);
            return true;
        }
    }

    // post
    // console.log("PATH POPPED| vertex: ", path[path.length - 1]);
    console.log("post path: " + curr, path);
    path.pop();

    return false;
}

export default function dfs(
    graph: WeightedAdjacencyList,
    source: number,
    needle: number,
): number[] | null {
    const seen: boolean[] = new Array(graph.length).fill(false);
    const path: number[] = new Array();

    walk(graph, source, needle, seen, path);

    if (path.length === 0) return null;
    console.log("END path: ", path);
    return path;
}
