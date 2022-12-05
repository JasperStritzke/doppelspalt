function runTaskTimes(task: (n: number) => void, times: number, delay: number = 500) {
  let n = 0;
  const i = setInterval(() => {
    n++;

    task(n);

    if (n >= times) clearInterval(i);
  }, delay);
}

function runTaskBetween(task: (n: number) => void, from: number, to: number, delay: number = 500) {
  let n = from;
  const i = setInterval(() => {
    task(n);
    if (n >= to) clearInterval(i);
    n++;
  }, delay);
}

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export { runTaskTimes, runTaskBetween, randomIntFromInterval };
