function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function startStopwatch(callback, interval) {
  var count = 0;

  for (;;) {
    await sleep(interval*1000);
    count++;
    if (!callback(count)) {
      return;
    }
  }
}

// Expected: 1, 2, 3, 4, 5 with 50ms interval.
startStopwatch(callback,5);

function callback(counter) {
  console.log(counter);
  return counter < 5;
}
