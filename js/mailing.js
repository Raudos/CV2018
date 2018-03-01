module.exports = function() {
  emailjs.init("user_r6T8DtnUdMhI2VMtQVwYV");

  $("form").on("submit", e => {
    e.preventDefault();

    emailjs.send("default_service", "work", {
      title: document.getElementById("title").value,
      sender: document.getElementById("from").value,
      mail: document.getElementById("mail").value
    });
  });
};
