export default function bfs(
    graph: WeightedAdjacencyMatrix,
    source: number,
    needle: number,
): number[] | null {
    // What we need to know:
    // 1. We need to know where we are starting from "source".
    // 2. We need to know what we are looking for "needle".
    // 3. We want to be able to return the path we took.
    // IN a graph, when we are doing a search, we often want to know the path associated with it.

    const seen = new Array(graph.length).fill(false);
    const prev = new Array(graph.length).fill(-1);

    seen[source] = true;
    const q: number[] = [source];

    do {
        const curr = q.shift() as number;
        if (curr === needle) {
            break;
        }
        const adjs = graph[curr];
        for (let i = 0; i < graph.length; i++) {
            // walk through and grap each edge
            if (adjs[i] === 0) {
                // if no edge
                continue;
            }

            if (seen[i]) {
                // we've already seen the edge before
                continue;
            }

            seen[i] = true;
            prev[i] = curr;
            q.push(i);
        }
        seen[curr] = true;
    } while (q.length);

    // Build it backwards
    let curr = needle;
    const out: number[] = [];
    // Walk back until we hit -1 for path
    while (prev[curr] !== -1) {
        out.push(curr);
        curr = prev[curr];
    }

    if (out.length) {
        return [source].concat(out.reverse());
    }

    // prev[needle] === -1
    return null;
}
