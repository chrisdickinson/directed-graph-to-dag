const toDAG = require('./lib/graph-to-dag.js')
const digraph = require('digraph-tag')
const test  = require('tape')

test('suggests removing an edge from a cycle', function(assert) {
  const graph = digraph`
    A -> B
    B -> C
    C -> D
    D -> A
  `

  const flippable = toDAG(graph.vertices, graph.incoming, graph.outgoing)
  assert.equal(flippable.size, 1)
  assert.deepEqual(flippable.values().next().value, ['C', 'D'])
  assert.end()
})
