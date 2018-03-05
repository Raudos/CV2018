function showUserFeedback(elemClass) {
  $(this).find("." + elemClass).addClass("animated");

  window.setTimeout(() => {
    $(this).find("." + elemClass).removeClass("animated");
  }, 4000);
};

module.exports = function() {
  emailjs.init("user_r6T8DtnUdMhI2VMtQVwYV");

  $("form").on("submit", function(event) {
    event.preventDefault();
    const showFeedback = showUserFeedback.bind(this);

    emailjs.send("default_service", "work", {
      title: document.getElementById("title").value,
      sender: document.getElementById("from").value,
      mail: document.getElementById("mail").value
    }).then(resp => {
      $(this).find("input").not("#to").val('');
      $(this).find("textarea").val('');

      showFeedback("feedback");
    }).catch(e => {
      showFeedback("error-message");
    });
  });
};
