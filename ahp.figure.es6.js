$.fn.graph = function(nodes, radius, onRank) {
  let size = nodes.length;
  let points = [];
  let radiansDifference = Math.PI*2/size;
  $(this).html('');

  $(this).append(`<div class="figure" style="width:${radius*2.5}px; height:${radius*2.5}px"></div>`);
  $(this).find(`.figure`).append(`<div class="radius-bg" style="width:${radius*2}px; height:${radius*2}px; border-radius:${radius}px; margin-left:-${radius}px; margin-top:-${radius}px;"></div>`);
  let center = new Point(0, 0);
  $(this).find(`.figure`).append(`<div class="point center" id="point-0"></div>`);
  for(let i=0; i<size; i++) {
    let top = Math.cos(radiansDifference*(i)) * radius;
    let left = Math.sin(radiansDifference*(i)) * radius;
    points.push(new Point(left, top));
    $(this).find(`.figure .center`).append(`<div class="point" id="point-${i+1}" style="top:${top}px; left:${left}px"><p>${nodes[i].name}</p></div>`);
  }

  //pointer
  let pointerPosition = {x:0, y:0};
  $(this).find(`.figure .center`).append(`<div class="point draggable" id="pointer" style="top:0; left:0"></div>`);
  $(this).find(`.figure .center .draggable`).draggable({
    stop() {
      let position = $(this).position();
      let x = position.left;
      let y = position.top;

      let weights = countWeights({x, y}, points);
      let ranking = makeMatrixRanking(weights);
      onRank(ranking);
    },

    drag() {
      let position = $(this).position();
      let x = position.left;
      let y = position.top;
      let point = new Point(x, y);
      if(distance(point, center) >= radius) {
        $(this).css('left', pointerPosition.x);
        $(this).css('top', pointerPosition.y);
        return false;
      }
      else {
        pointerPosition = {x, y};
      }
      // TODO: How to check if point is still in figure?
    }
  });

  let position = $(`.figure .center .draggable`).position();
  let x = position.left;
  let y = position.top;

  let weights = countWeights({x, y}, points);
  let ranking = makeMatrixRanking(weights);
  onRank(ranking);
}

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

// did not work as I expect
/*
var pointOnLine = (point, point1, point2) => {
  if( parseInt(point2.x - point1.x)*(point.y - point1.y) === parseInt(point2.y - point1.y)*(point.x - point1.x) ) {
    return true;
  }
  return false;
}
*/

var countWeights = (pointer, points) => {
  let weights = [];
  for(let i=0; i<points.length; i++) {
    weights[i] = [];
    let distance1 = distance(pointer, points[i]);
    for(let j=0; j<points.length; j++) {
      let distance2 = distance(pointer, points[j]);
      let allDistance = distance1 + distance2;
      let weight = toAHPWeight(Math.round((distance2/allDistance)*8));
      weights[i][j] = weight;
    }
  }
  return weights;
}

var makeMatrixRanking = (weights) => {
  let ci = [];
  for(let i=0; i<weights.length; i++) {
    for(let j=0; j<weights.length; j++) {
      if(ci[j]) {
        ci[j] += weights[i][j];
      }
      else {
        ci[j] = weights[i][j];
      }
    }
  }
  let ranking = [];
  for(let i=0; i<weights.length; i++) {
    for(let j=0; j<weights.length; j++) {
      weights[i][j] /= ci[j];
      if(ranking[i]) {
        ranking[i] += weights[i][j];
      }
      else {
        ranking[i] = weights[i][j];
      }
    }
  }

  for(let i=0; i<ranking.length; i++) {
    ranking[i] /= ranking.length;
  }

  return ranking;
}

var toRadians = (angle) => {
  return angle * (Math.PI / 180);
}

var distance = (point1, point2) => {
  let distanceX = point1.x - point2.x;
  let distanceY = point1.y - point2.y;
  return Math.sqrt(distanceX*distanceX + distanceY*distanceY);
}

var toAHPWeight = (weight) => {
  switch (weight) {
    case 0:
      return 1/9;
      break;
    case 1:
      return 1/7;
      break;
    case 2:
      return 1/5;
      break;
    case 3:
      return 1/3;
      break;
    case 4:
      return 1;
      break;
    case 5:
      return 3;
      break;
    case 6:
      return 5;
      break;
    case 7:
      return 7;
      break;
    case 8:
      return 9;
      break;
  }
}
