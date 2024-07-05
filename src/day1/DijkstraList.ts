// hasUnvisited() {
//     lo = getLowestOneUnseen()
//     seen[lo] = true

//     // walk through it's children and find the shortest distance to the source node or current node.
//     for edge in lo {
//         if seen[edge] continue
//         dist = dists[lo] + edge.weight
//         if dist < dists[edge] {
//             prev[edge] = lo
//             dists[edge] = dist
//         }
//     }
// }

function hasUnvisited(seen: boolean[], dists: number[]): boolean {
    // Walk through seen indices and see if they've all be seen?
    return seen.some((s, i) => !s && dists[i] < Infinity);
}

function getLowestUnvisited(seen: boolean[], dists: number[]): number {
    let idx = -1;
    let lowestDistance = Infinity;

    // Walk through all our distances and see what is the lowest distance AND it has to be an unseen node.
    for (let i = 0; i < seen.length; i++) {
        if (seen[i]) continue;

        if (lowestDistance > dists[i]) {
            // found the new lowest distance
            lowestDistance = dists[i];
            idx = i;
        }
    }

    return idx;
}

export default function dijkstra_list(
    source: number,
    sink: number,
    graph: WeightedAdjacencyList,
): number[] {
    // wrong data structure, I imagine map is better for seen.
    const seen = new Array(graph.length).fill(false);
    const prev = new Array(graph.length).fill(-1);
    const dists = new Array(graph.length).fill(Infinity);

    // Smallest distance possible. We are already at the source.
    dists[source] = 0;

    while (hasUnvisited(seen, dists)) {
        const curr = getLowestUnvisited(seen, dists);

        seen[curr] = true;

        const adjs = graph[curr];
        for (let i = 0; i < adjs.length; i++) {
            const edge = adjs[i];

            if (seen[edge.to]) {
                continue;
            }

            // keep going until we have nothing left we have to look at.
            const dist = dists[curr] + edge.weight;
            if (dist < dists[edge.to]) {
                dists[edge.to] = dist;
                prev[edge.to] = curr;
            }
        }
    }

    const out: number[] = [];
    let curr = sink;
    while (prev[curr] !== -1) {
        out.push(curr);
        curr = prev[curr];
    }

    out.push(source);
    return out.reverse();
}
