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
    console.log(relation.node, relation.value, relation.value*value);
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
    let ranking = [];
    let added = [];
    this.leaves.forEach(function(leaf) {
      let status = 'OK';
      for(var key in added) {
        if(leaf.node.name.indexOf(added[key]) != -1) {
          status = 'BAD';
        }
      }
      if(status === 'OK') {
        leaf.node.name.split('-').forEach(function(elem) {
          added.push(elem);
        })
      }
      ranking.push({ leaf, status });
    });
    return ranking;
  }
}
/*
let employees = ['P1', 'P2'];
let criteria = ['Jakość', 'Szybkość', 'Node'];
let tasks = ['Z1', 'Z2', 'Z3'];

let alternatives = [];
employees.forEach(function(employee) {
  tasks.forEach(function(task) {
    let name = `${employee}-${task}`;
    alternatives.push(new Node(name));
  });
});

let goal = new Node('AHP');
let pm = new Node('PM');
let employeesNodes = [];
employees.forEach(function(employee) {
  employeesNodes.push(new Node(employee));
});
let employeesGoalRelations = [];
employeesNodes.forEach(function(employee) {
  employeesGoalRelations.push(new Relation(employee, Math.random()));
});
goal.addChild(new Relation(pm, Math.random()));
goal.addChildren(employeesGoalRelations);

let criteriaNodes = [];
criteria.forEach(function(criterium) {
  criteriaNodes.push(new Node(criterium));
});
let criteriaPMRelations = [];
criteriaNodes.forEach(function(criterium) {
  criteriaPMRelations.push(new Relation(criterium, Math.random()));
});
pm.addChildren(criteriaPMRelations);

let tasksNodes = [];
tasks.forEach(function(task) {
  tasksNodes.push(new Node(task));
});
criteriaNodes.forEach(function(criterium) {
  let tasksCriteriaRelations = [];
  tasksNodes.forEach(function(task) {
    tasksCriteriaRelations.push(new Relation(task, Math.random()));
  });
  criterium.addChildren(tasksCriteriaRelations);
});

tasksNodes.forEach(function(task) {
  let taskAlternatives = alternatives.filter((alternative) => {
    return alternative.name.indexOf(task.name) != -1
  });
  let taskAlternativesRelations = [];
  taskAlternatives.forEach(function(alternative) {
    taskAlternativesRelations.push(new Relation(alternative, Math.random()));
  });
  task.addChildren(taskAlternativesRelations);
});

employeesNodes.forEach(function(employee) {
  let employeeAlternatives = alternatives.filter((alternative) => {
    return alternative.name.indexOf(employee.name) != -1
  });
  let employeeAlternativesRelations = [];
  employeeAlternatives.forEach(function(alternative) {
    employeeAlternativesRelations.push(new Relation(alternative, Math.random()));
  });
  employee.addChildren(employeeAlternativesRelations);
});

let ahp = new AHP(new Relation(goal, 1));
console.log('Ranking', ahp.makeRanking());
*/
