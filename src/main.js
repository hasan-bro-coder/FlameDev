import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Aos from "aos";
import "aos/dist/aos.css";
import Lenis from "lenis";
import SplitType from "split-type";

let txt = new SplitType("#flame");
let dev = new SplitType("#last");

Aos.init();
gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis();

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

document.querySelectorAll('a[href^="#"]').forEach((el) => {
  el.onclick = (e) => {
    e.preventDefault();
    const id = el.getAttribute("href")?.slice(1);
    if (!id) return;
    const target = document.getElementById(id);
    if (target) {
      lenis.scrollTo(target);
    }
  };
});

document
  .querySelectorAll(".download")
  .forEach((el) => (el.onclick = () => lenis.scrollTo(".download-con")));

gsap.to(".overlay", {
  y: -150,
  ease: "none",
  scrollTrigger: {
    trigger: "main",
    start: "top",
    // endTrigger: ".overlay",
    end: "bottom center",
    scrub: true,
  },
});
gsap.to("#first", {
  y: -200,
  ease: "none",
  scrollTrigger: {
    trigger: "main",
    start: "top",
    // endTrigger: ".overlay",
    end: "bottom center",
    scrub: true,
  },
});

gsap.to("#second", {
  y: 100,
  ease: "none",
  scrollTrigger: {
    trigger: "main",
    start: "top",
    // endTrigger: ".overlay",
    end: "bottom center",
    scrub: true,
  },
});
gsap.to("main .fire-con", {
  y: -50,
  ease: "none",
  scrollTrigger: {
    trigger: "main",
    start: "top",
    end: "bottom center",
    scrub: true,
  },
});

let hidden = false;
lenis.on("scroll", () => {
  if (window.scrollY < window.innerHeight - 250) {
    return 0;
  }
  if (lenis.direction == 1 && !hidden) {
    hidden = true;
    console.log("yo", hidden, window.scrollY);

    gsap.to("nav", {
      y: -60,
      duration: 0.1,
      ease: "none",
    });
  } else if (hidden && lenis.direction == -1) {
    hidden = false;
    console.log("yo", hidden, window.scrollY);
    gsap.to("nav", {
      y: 0,
      duration: 0.1,
    });
  }
});

let open = false;
document.querySelector(".hamburger").onclick = () => {
  if (!open) {
    document.querySelector(".sidebar").style.display = "flex";
  }
  open = true;
};

document.querySelector(".close").onclick = () => {
  document.querySelector(".sidebar").style.display = "none";
  open = false;
};

document.querySelector(".last").onclick = () => {
  lenis.scrollTo(0, {
    duration: 8,
    lock: true,
    easing: (x) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2),
  });
};

// const coords = { x: 0, y: 0 };
// const circles = document.querySelectorAll(".circle");

// const colors = [
//   ...Array.from(
//     { length: 30 },
//     (_, i) => `hsl(${Math.round((i / 30) * 60)}, 100%, 50%)`
//   ),
// ];

// circles.forEach(function (circle, index) {
//   circle.x = 0;
//   circle.y = 0;
//   // circle.style.backgroundColor =
//   // "#ffffff";
//   // colors[index % colors.length];
// });

// window.addEventListener("mousemove", function (e) {
//   coords.x = e.clientX;
//   coords.y = e.clientY;
// });

// function animateCircles() {
//   let x = coords.x;
//   let y = coords.y;

//   circles.forEach(function (circle, index) {
//     circle.style.left = x - 10 + "px";
//     circle.style.top = y - 10 + "px";

//     circle.style.scale = (circles.length - index) / circles.length;

//     circle.x = x;
//     circle.y = y;

//     const nextCircle = circles[index + 1] || circles[0];
//     x += (nextCircle.x - x) * 0.2;
//     y += (nextCircle.y - y) * 0.2;
//   });

//   requestAnimationFrame(animateCircles);
// }

// animateCircles();

window.onload = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  gsap.to(".char", {
    y: 0,
    stagger: 0.15,
    delay: 0.2,
    duration: 0.2,
    ease: "power1.out",
    onComplete: async () => { 
      await new Promise((resolve) => setTimeout(resolve, 2000));
      gsap.to(".loader", {
        duration: 2,
        clipPath: "circle(0% at 100% 100%)",
      });
    }
  });
  };

//   // let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
//   // let el = document.querySelector("#flame");
//   // let text = el.innerText;
//   // let timeDone = 0;
//   // let intervel = setInterval(async () => {
//   //   el.innerText = el.innerText
//   //     .split("")
//   //     .map((char, index) => {
//   //       if (timeDone > index) {
//   //         return text[index];
//   //       }
//   //       return letters[Math.floor(Math.random() * letters.length)];
//   //     })
//   //     .join("");
//   //   if (timeDone >= el.innerText.length) {
//   //     clearInterval(intervel);
//   //     await new Promise((resolve) => setTimeout(resolve, 2000));
//   //     gsap.to(".loader", {
//   //       duration: 2,
//   //       clipPath: "circle(0% at 100% 100%)",
//   //     });
//   //   }
//   //   timeDone += 1 / 4;
//   // }, 50);
// };
