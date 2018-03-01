/*global TweenMax, TimelineMax, Power1, Power2*/

/*
author: Marco Barría
devDependencies:
  - GSAP TweenMax https://greensock.com/tweenmax (Necessary for animation.)
*/

// MOBILE DETECT, RANDOM FUNCTION
var Utils = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (Utils.Android() || Utils.BlackBerry() || Utils.iOS() || Utils.Opera() || Utils.Windows());
    },
    randomInRange: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
};

var colors = ['#df3891', '#fff78b', '#692286', '#c4a66b', '#ed95c0', '#6ac1b8'],
    nRombo = 46,
    timer = 0.8;

var setObj = function setObj(index) {
    const parent = document.getElementsByClassName("section")[index];
    const borders = parent.getElementsByClassName("border-inner");
    const main = parent.querySelector('.Main');

    var zoomLevel = document.documentElement.clientWidth / window.innerWidth;
    var heightIOs = window.innerHeight * zoomLevel;

    if (Utils.iOS()) {

        if (heightIOs > window.innerWidth) {
            main.style.height = heightIOs + 'px';
            main.style.minHeight = heightIOs + 'px';
        }

    }

    TweenMax.set(borders[0], {
        y: -32
    });
    TweenMax.set(borders[1], {
        y: 32
    });
    TweenMax.set(borders[2], {
        x: -32
    });
    TweenMax.set(borders[3], {
        x: 32
    });

};

var border = function border(index) {
    var tl = new TimelineMax();
    const borders = document.getElementsByClassName("section")[index].getElementsByClassName("border-inner");

    tl.to([].slice.call(borders, 0), 1.8, {
        x: 0,
        y: 0,
        force3D: true,
        ease: Power1.easeOut,
        onComplete: function() {
            document.body.classList.remove('overflow');
        }
    });

    return tl;
};

var romboInit = function romboInit(index) {
    const parent = document.getElementsByClassName("section")[index];
    const wrapperRombo = parent.getElementsByClassName('border-wrapper')[0];
    const rombos = parent.getElementsByClassName('rombo');
    const boxes = parent.getElementsByClassName('box');

    for (var i = 0; i < nRombo; i++) {

        var gridItem = document.createElement('div');
        var romboDiv = document.createElement('div');

        wrapperRombo.appendChild(gridItem);
        gridItem.className = "box";

        TweenMax.set(".box", {
            perspective: 600,
            transformOrigin: '50% 50%'
        });

        boxes[i].appendChild(romboDiv);
        romboDiv.className = "rombo";

        TweenMax.set(".rombo", {
            transformStyle: "preserve-3d"
        });

        if (Utils.any()) {

            TweenMax.set(rombos[i], {
                backgroundColor: colors[Math.floor(Math.random() * colors.length)],
                top: Utils.randomInRange(-40, 40),
                left: Utils.randomInRange(-40, 40),
                y: 0,
                scale: 0,
                opacity: 0,
                transformOrigin: '50% 50%',
                rotationY: Utils.randomInRange(-720, 720),
                rotation: Utils.randomInRange(-320, 320)
            });

        } else {

            TweenMax.set(rombos[i], {
                backgroundColor: colors[Math.floor(Math.random() * colors.length)],
                top: Utils.randomInRange(-180, 180),
                left: Utils.randomInRange(-180, 180),
                y: -100,
                scale: 0,
                opacity: 0,
                transformOrigin: '50% 50%',
                rotationY: Utils.randomInRange(-720, 720),
                rotation: Utils.randomInRange(-320, 320)
            });

        }

    };
};

var romboAnimation = function romboAnimation(index) {
    const parent = document.getElementsByClassName("section")[index];

    var romboTodo = [].slice.call(parent.getElementsByClassName('rombo'), 0);
    var tl = new TimelineMax();

    tl.staggerTo(romboTodo, 1.2, {
        y: 0,
        scale: 1,
        opacity: 0.6,
        rotationY: 0,
        rotation: '+=240',
        force3D: true,
        ease: Power2.easeOut
    }, 0.08);

    return tl;
};

var init = function init(index) {
  // https://imgur.com/gallery/YnjeY
  const actualIndex = index - 1;

  setObj(actualIndex);
  romboInit(actualIndex);

  // MASTER SCENES
  var master = new TimelineMax({
    delay: 0
  });

  master.add(border(actualIndex), "scene1")
      .add(romboAnimation(actualIndex), "-=1.8", "scene2");
  master.timeScale(timer);

  window.setTimeout(() => $(".section").eq(actualIndex).toggleClass("animate"), 2000)

  return master;
};

function play(master) {
  master.play();
  master.timeScale(timer);
};

function rewind(master) {
  [].slice.call(document.querySelectorAll('.box'), 0).forEach(node => node.remove())

  master.reverse();
  master.timeScale(0.1);
};

module.exports = {
  init: init,
  play: play,
  rewind: rewind
};
