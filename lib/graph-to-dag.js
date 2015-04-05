'use strict'


module.exports = graphToDAG


function graphToDAG(vertices, incoming, outgoing, getFrom, getTo) {
  getFrom = getFrom || defaultGetFrom
  getTo = getTo || defaultGetTo

  vertices     = new Set(vertices)
  const toFlip = new Set()
  const lhs    = new Set()
  const rhs    = new Set()

  while (vertices.size) {
    removeSourceOrSink(vertices, outgoing, rhs, getTo)
    removeSourceOrSink(vertices, incoming, lhs, getFrom)
    if (vertices.size) {
      var max = -Infinity
      var maxVertex = null
      for (let vertex of vertices) {
        var diff = outgoing.get(vertex).size - incoming.get(vertex).size
        if (diff > max) {
          max = diff
          maxVertex = vertex
        }
      }
      vertices.delete(maxVertex)
      lhs.add(maxVertex)
    }
  }
  for (let vertex of lhs) {
    for (let edge of outgoing.get(vertex)) {
      if (rhs.has(getTo(edge))) {
        toFlip.add(edge)
      }
    }
  }

  return toFlip
}


function defaultGetFrom(edge) {
  return edge[0]
}


function defaultGetTo(edge) {
  return edge[1]
}


function removeSourceOrSink(vertices, incoming, into, getAttr) {
  for (var vertex of vertices) {
    var edges = incoming.get(vertex)
    if (!edges) {
      vertices.delete(vertex)
      into.add(vertex)
      continue
    }
    var ok = false
    for (var edge of edges) {
      if (vertices.has(getAttr(edge))) {
        ok = true
        break
      }
    }
    if (!ok) {
      vertices.delete(vertex)
      into.add(vertex)
      continue
    }
  }
}


