const allElems = ["Bob",["Sam","Jenny","Joe"]];

function countElements (arr, item) {
  let cnt = 0;
  for (let i=0; i < arr.length; i++) {
    if (arr[i] instanceof Array) {
      cnt += countElements(arr[i], item);
    } else {
       cnt++;
    }
  }
  return cnt;
};

console.log(countElements(allElems,"Bob"));
