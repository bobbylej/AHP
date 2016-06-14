class Node {
  constructor(name) {
    this.name = name;
    this.parents = [];
    this.children = [];
  }

  addChild(...relations) {
    let that = this;
    relations.forEach(function(relation) {
      relation.node.parents.push(that);
      that.children.push(relation);
    });
  }

  addChildren(relations) {
    let that = this;
    relations.forEach(function(relation) {
      that.addChild(relation);
    });
  }
}

class Relation {
  constructor(node, value = 0) {
    this.node = node;
    this.value = value;
  }
}

class AHP {
  constructor(tree) {
    this.tree = tree;
    this.leaves = [];
  }

  createLeaves() {
    this.nextNodes(this.tree, 1);
  }

  nextNodes(relation, value) {
    let that = this;
    relation.node.children.forEach(function(relation) {
      let newValue = relation.value*value;
      that.nextNodes(relation, newValue);
    });
    //check if node is leaf
    if(!relation.node.children.length) {
      let leaf = this.getLeaf(relation.node);
      if(!leaf) {
        this.leaves.push({
          node: relation.node,
          value: relation.value*value
        });
      }
      else {
        leaf.value *= value;
      }
    }
  }

  hasLeaf(node) {
    let result = false;
    this.leaves.forEach(function(leaf) {
      if(leaf.node === node) {
        result = true;
      }
    });
    return result;
  }

  getLeaf(node) {
    let result = false;
    this.leaves.forEach(function(leaf) {
      if(leaf.node === node) {
        result = leaf;
      }
    });
    return result;
  }

  makeRanking() {
    this.createLeaves();
    this.leaves.sort(function(a, b) {
      return b.value - a.value;
    });
    return this.leaves;
  }
}
