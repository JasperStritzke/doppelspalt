import feather from "feather-icons";
import "./style.css";
import { randomIntFromInterval, runTaskBetween, runTaskTimes } from "./util";

feather.replace();

let b = false;
let initialTime = new Date().getTime();

document.body.addEventListener("click", (e: MouseEvent) => tap(e.pageX));

function tap(pageX: number) {
  if (!b) {
    b = true;
    try {
      document.body.requestFullscreen();
      return;
    } catch (e) {}
  }

  if (new Date().getTime() - initialTime < 3000) return;

  const right = pageX > window.innerWidth / 2;

  const func = right ? next : back;

  const success = func();

  const div = document.createElement("div");
  div.className = `rounded-full ${success ? "bg-white" : "bg-red-800"} p-2 transition-all opacity-50 fixed fade-away ${right ? "right" : "left"} flex justify-center items-center`;
  div.style.width = "128px";
  div.style.height = "128px";
  div.style.left = `${window.innerWidth - window.innerWidth / 4 - 64}px`;
  if (!right) {
    div.style.left = `${window.innerWidth / 4 - 64}px`;
  }
  div.style.top = `${window.innerHeight / 2 - 64}px`;

  div.innerHTML = right ? arrowRight : arrowLeft;

  document.body.appendChild(div);

  setTimeout(() => div.remove(), 5000);
}

const arrowLeft = '<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>';
const arrowRight = '<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>';

let currentPage = 1;
const maxPage = 8;

function updatePageCounter() {
  document.querySelector("#page")!.innerHTML = `${currentPage}`;
}

const pageMutations: any = {
  1: firstToSecond,
  2: secondToThird,
  3: thirdToFourth,
  4: fourthToFifth,
  5: fifthToSixth,
  6: sixthToSeventh,
  7: seventhToEight,
};

function next(): boolean {
  if (currentPage == maxPage) {
    return false;
  }

  try {
    pageMutations[currentPage]();
  } catch (e) {
    console.error(e);
    return false;
  }

  currentPage++;
  updatePageCounter();

  return true;
}

function back(): boolean {
  return false;
}

function firstToSecond() {
  const page1 = document.querySelector("#p1");

  page1!.classList.add("fly-up");

  setTimeout(() => {
    const page2 = document.querySelector("#p2");
    page2?.classList.remove("hidden");

    setTimeout(() => {
      page2?.classList.add("opacity-100");

      const interf = document.querySelector("#interferenz");

      const steps = 5;
      const stepWidth = 20;

      const middle = document.createElement("div");
      middle.style.width = stepWidth * 1.5 + "px";
      middle.style.height = "100%";
      middle.style.backgroundColor = `rgba(255,0,0,1)`;
      middle.setAttribute("data-max", "0");

      interf?.appendChild(middle);

      runTaskTimes(
        (i) => {
          const left = document.createElement("div");
          left.style.width = stepWidth + "px";
          left.style.height = "100%";
          left.style.backgroundColor = `rgba(255,0,0,${(6 - i) / steps})`;
          left.setAttribute("data-max", `${-i}`);

          interf?.prepend(left);

          const right = document.createElement("div");
          right.style.width = stepWidth + "px";
          right.style.height = "100%";
          right.style.backgroundColor = `rgba(255,0,0,${(steps - (i - 1)) / steps})`;
          right.setAttribute("data-max", `${i}`);
          interf?.append(right);
        },
        steps,
        50
      );
    }, 200);
  }, 500);

  setTimeout(() => page1?.remove(), 1000);
}

function secondToThird() {
  const headline1 = document.querySelector("[data-headline='p2-1']");
  const headline2 = document.querySelector("[data-headline='p2-2']");

  headline1!.innerHTML = "";
  headline2!.innerHTML = "";

  runTaskBetween(
    (n) => {
      if (n == 0 || n == 2 || n == -2) return;
      document.querySelector(`[data-max='${-n}']`)?.remove();
      document.querySelector(`[data-max='${n}']`)?.remove();
    },
    -5,
    5,
    200
  );
}

let interval: number;
function thirdToFourth() {
  const headline1 = document.querySelector("[data-headline='p2-1']");
  const headline2 = document.querySelector("[data-headline='p2-2']");

  headline1!.innerHTML = "Einzelphoton am Doppelspalt";
  headline2!.innerHTML = "Durch die Graufilter passiert nun 1 Photon pro Sekunde den Doppelspalt";

  for (let i = -2; i <= 2; i += 2) {
    const element = document.querySelector(`[data-max="${i}"]`);
    element?.classList.add("opacity-0");
    element?.classList.add("transition-opacity");
  }
  interval = setInterval(() => {
    const randomInt = randomIntFromInterval(0, 3);

    let element: any;
    switch (randomInt) {
      case 0:
        element = document.querySelector("[data-max='-2']");
        break;
      case 1:
        element = document.querySelector("[data-max='2']");
        break;
      default:
        element = document.querySelector("[data-max='0']");
    }

    element?.classList.add("opacity-100");

    setTimeout(() => element!.classList.remove("opacity-100"), 500);
  }, 1000);
}

function fourthToFifth() {
  const headline1 = document.querySelector("[data-headline='p2-1']");
  const headline2 = document.querySelector("[data-headline='p2-2']");

  headline1!.innerHTML = "Einzelphoton am Doppelspalt";
  headline2!.innerHTML = "Durch die Graufilter passiert nun 1 Photon pro Sekunde den Doppelspalt";

  clearInterval(interval);

  for (let i = -2; i <= 2; i += 2) {
    const element: any = document.querySelector(`[data-max="${i}"]`);
    element?.classList.remove("opacity-0");
    element?.classList.remove("transition-opacity");
    element?.classList.add("show-labels");
    element?.classList.add("transition-all");
    element?.setAttribute("data-hits", "0");
  }

  const stats: any = {
    links: 0,
    mitte: 0,
    rechts: 0,
    get max(): number {
      let currentMax = -1;
      for (let key in this) {
        if (key == "max") continue;

        if (this[key] > currentMax) {
          currentMax = this[key];
        }
      }

      return currentMax;
    },
  };

  interval = setInterval(() => {
    const randomInt = randomIntFromInterval(0, 3);

    const left: HTMLDivElement | null = document.querySelector("[data-max='-2']");
    const right: HTMLDivElement | null = document.querySelector("[data-max='2']");

    const middle: HTMLDivElement | null = document.querySelector("[data-max='0']");

    switch (randomInt) {
      case 0:
        stats.links++;
        left?.setAttribute("data-hits", `${stats.links}`);
        break;
      case 1:
        stats.rechts++;
        right?.setAttribute("data-hits", `${stats.rechts}`);
        break;
      default:
        stats.mitte++;
        middle?.setAttribute("data-hits", `${stats.mitte}`);
        break;
    }

    //update proportions
    left!.style.height = `${Math.min(100 * (stats.links / stats.max), 100)}%`;
    right!.style.height = `${Math.min(100 * (stats.rechts / stats.max), 100)}%`;
    middle!.style.height = `${Math.min(100 * (stats.mitte / stats.max), 100)}%`;
  }, 1000);
}

const finalStats: any = {
  links: 0,
  mitte: 0,
  rechts: 0,
  get max(): number {
    let currentMax = -1;
    for (let key in this) {
      if (key == "max") continue;

      if (this[key] > currentMax) {
        currentMax = this[key];
      }
    }

    return currentMax;
  },
};
function fifthToSixth() {
  const headline1 = document.querySelector("[data-headline='p2-1']");
  const headline2 = document.querySelector("[data-headline='p2-2']");

  headline1!.innerHTML = "Einzelphoton am Doppelspalt (stark beschleunigt)";

  const updatePhotonCount = (x: number) => (headline2!.innerHTML = `Gesamt haben ${x} Photonen den Schirm getroffen.`);
  updatePhotonCount(0);

  clearInterval(interval);

  for (let i = -2; i <= 2; i += 2) {
    const element: any = document.querySelector(`[data-max="${i}"]`);
    element?.setAttribute("data-hits", "0");
  }

  interval = setInterval(() => {
    const randomInt = randomIntFromInterval(0, 3);

    const left: HTMLDivElement | null = document.querySelector("[data-max='-2']");
    const right: HTMLDivElement | null = document.querySelector("[data-max='2']");

    const middle: HTMLDivElement | null = document.querySelector("[data-max='0']");

    switch (randomInt) {
      case 0:
        finalStats.links++;
        left?.setAttribute("data-hits", `${finalStats.links}`);
        break;
      case 1:
        finalStats.rechts++;
        right?.setAttribute("data-hits", `${finalStats.rechts}`);
        break;
      default:
        finalStats.mitte++;
        middle?.setAttribute("data-hits", `${finalStats.mitte}`);
        break;
    }

    //update proportions
    left!.style.height = `${Math.min(100 * (finalStats.links / finalStats.max), 100)}%`;
    right!.style.height = `${Math.min(100 * (finalStats.rechts / finalStats.max), 100)}%`;
    middle!.style.height = `${Math.min(100 * (finalStats.mitte / finalStats.max), 100)}%`;

    let count;
    if ((count = finalStats.links + finalStats.rechts + finalStats.mitte) >= 10000) {
      clearInterval(interval);
    }
    updatePhotonCount(count);
  }, 2);
}

function sixthToSeventh() {
  clearInterval(interval);

  const headline1 = document.querySelector("[data-headline='p2-1']");
  const headline2 = document.querySelector("[data-headline='p2-2']");

  headline1!.innerHTML = "Einzelphoton am Doppelspalt";
  headline2!.innerHTML = `Simulationsresultat mit ${finalStats.links + finalStats.rechts + finalStats.mitte} Photonen`;
}

function seventhToEight() {
  document.querySelectorAll("#interferenz div.show-labels").forEach((e) => e.remove());

  const interf: any = document.querySelector("#interferenz");
  interf.style.width = null;
  interf.style.height = null;
  interf.classList.remove("relative");
  interf.classList.remove("fixed");
  interf.classList.remove("bottom-0");
  interf.classList.remove("top-0");
  interf.classList.remove("right-0");
  interf.classList.remove("left-0");
  interf.classList.remove("flex-row");
  interf.classList.add("flex-col");

  const headline1: any = document.querySelector("[data-headline='p2-1']");
  const headline2: any = document.querySelector("[data-headline='p2-2']");
  headline1.style.top = null;
  headline1.classList.toggle("absolute");

  headline2.style.top = null;
  headline2.classList.toggle("absolute");

  headline1.innerHTML = "Das wars :)";
  headline2.innerHTML = "Danke für eure Aufmerksamkeit.";
}

let currentlyDeveloping = 1;

const ready = document.createElement("span");
ready.className = "fixed left-0 bottom-0 bg-orange-700 w-2 h-2 rounded-full animate-pulse";

document.body.appendChild(ready);

function slowNext() {
  setTimeout(() => {
    if (currentlyDeveloping != currentPage) {
      slowNext();
      next();
    } else {
      ready.classList.toggle("bg-orange-700");
      ready.classList.toggle("animate-pulse");
      ready.classList.toggle("bg-green-700");
    }
  }, 1000);
}

slowNext();
