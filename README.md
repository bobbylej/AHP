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
let amount = 3;
let nodes = []
for(let i=0; i<amount; i++) {
  nodes.push({
    name: 'node'+i
  });
}
let radius = 200;
$('#graph').graph(nodes, radius, (ranking) => {
  console.log(ranking);
});
```

### AHP
```js
let node = new Node('name');
let relation = new Relation(node, value);
let ahp = new AHP(relation);
// get ranking
let ranking = ahp.makeRanking();
```
**Ranking** have ordered by value objects with attributes:
- **leaf**
  - **node**
  - **value**
- **status** - it tells if this leaf is OK or BAD

#### Example
```js
let parent = new Node('parent');

// create children for parent
let children = [];
for(let i=0; i<3; i++) {
  let childNode = new Node(`child-${i}`);
  let child = new Relation(childNode, Math.random());
  children.push(child);
}
// add children to parent
parent.addChildren(children);

// add grandchildren for children
let grandChildrenNodes = [];
for(let i=0; i<4; i++) {
  let grandChildNode = new Node(`grandChild-${i}`);
  grandChildrenNodes.push(grandChildNode);
}
// add to all children the same childrens with different values
children.forEach((child) => {
  let grandChildren = [];
  grandChildrenNodes.forEach((grandChildNode) => {
    grandChildren.push(new Relation(grandChildNode, Math.random());
  });
  child.node.addChildren(grandChildren);
});

// create AHP with relation with node parent as a root
let ahp = new AHP(new Relation(parent, 1));
// display ranking
console.log(ahp.makeRanking());
```
