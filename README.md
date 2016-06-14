# AHP
AHP method with graph to compare elements

## Getting started
To import algorithm to your projects write
```bash
git clone https://github.com/bobbylej/AHP.git

```
or download zip.

## Using
### Graphs
```js
  $('#graph').graph(nodes, radius, onStopDrag);
```
- **nodes** - list of nodes that need to be compare on graph, it should be JSON object with attribute **name**
```json
{
  name: 'NameOfNode',
}
```
- **radius** - radius of the graph
- **onStopDrag** - function that is trigger on stop event for drag point, it can have attribute **ranking**

#### Example
```js
var amount = 3;
var nodes = []
for(var i=0; i<amount; i++) {
  nodes.push({
    name: 'node'+i
  });
}
var radius = 200;
$('#graph').graph(nodes, radius, function(ranking) {
  console.log(ranking);
});
```
