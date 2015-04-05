# directed-graph-to-dag

Given a directed graph, return a number of edges that may be required to remove
all cycles from the graph.

```
const toDAG = require('directed-graph-to-dag')
const digraph = require('digraph-tag')

const graph = digraph`
  A -> B
  B -> C
  C -> D
  D -> A
`

toDAG(graph) // Set([C -> D])
```

## API

##### `Map<Vertex → Set<Edge>> → Edges`

A `Map` from `Vertex` (whatever type you provide) to `Edge` will be defined as `Edges`.

##### `Set<Vertex> → VS`

A set containing vertices are known as `VS`.

##### `toDAG(vertices: VS, in: Edges, out: Edges[, src: fn][, dst: fn]) → Set<Edge>`

Given a graph defined by `vertices`, incoming edges `in`, outgoing edges `out`, and optional
type-casting functions `src` and `dst`, return a set of edges that may be required to
turn the graph into a DAG.

Note: the only guarantee is that a cyclical graph will become acyclical by
reversing the resulting edges, not that an existing acyclical graph will have no edges
recommended for reversal.

## License

MIT
