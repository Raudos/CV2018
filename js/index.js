import addMailing from "./mailing";
import { play, rewind, init } from "./animation";


function handleRender() {
  $(".loader").fadeOut({duration: 1000});
  $("#fullpage").fadeIn({duration: 1000});

  addMailing()
};

function handleLoad(anchor, index) {
  if (!window.animationChecker || !window.animationChecker[index]) {
    window.animationChecker ? window.animationChecker[index] = true : window.animationChecker = {[index]: true};
    //window.animationMaster = init(index);
    init(index);
  }
};

function handleLeave(index, nextIndex, direction) {
  // if (window.animationMaster) {
  //   rewind(window.animationMaster);
  // }
};

$(document).ready(function() {
  $('#fullpage').fullpage({
      navigation: true,
			navigationPosition: 'right',
			navigationTooltips: ['Start', 'About me', 'Skills', 'Experience', "Contact"],
      anchors: ['start', 'about', 'skills', 'experience', 'contact'],
      afterRender: handleRender,
      afterLoad: handleLoad,
      onLeave: handleLeave,
      scrollOverflow: true
  });
});
