function showUserFeedback(elemClass) {
  $(this).find("." + elemClass).addClass("animated");

  window.setTimeout(() => {
    $(this).find("." + elemClass).removeClass("animated");
  }, 4000);
};

function toggleButton(disabled) {
  $(this).find("button").attr("disabled", disabled);
};

module.exports = function() {
  emailjs.init("user_r6T8DtnUdMhI2VMtQVwYV");

  $("form").on("submit", function(event) {
    event.preventDefault();
    const showFeedback = showUserFeedback.bind(this);
    const toggleSubmit = toggleButton.bind(this);

    toggleSubmit(true);

    emailjs.send("default_service", "work", {
      title: document.getElementById("title").value,
      sender: document.getElementById("from").value,
      mail: document.getElementById("mail").value
    }).then(resp => {
      $(this).find("input").not("#to").val('');
      $(this).find("textarea").val('');

      toggleSubmit(false);
      showFeedback("feedback");
    }).catch(e => {
      toggleSubmit(false);
      showFeedback("error-message");
    });
  });
};
