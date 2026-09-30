const validateData = (data) => {
  if (!data.name || data.name.length < 3) return false;
  if (data.message.length < 50) return false;

  return true;
};

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded callback!");
  const form = document.getElementById("contact-form");

  form.addEventListener("submit", (event) => {
    event.preventDefault(); 

    const fieldsElements = form.getElementsByClassName("field");
    // console.log(fieldsElements);

    const data = {
      name: form.querySelector("#name")?.value.trim() || "",
      email: form.querySelector("#email")?.value.trim() || "",
      phone: form.querySelector("#phone")?.value.trim() || "",
      message: form.querySelector("#message")?.value.trim() || "",
    };
    console.log(data);

    let isValid = validateData(data);
    const formValidateResult = form.querySelector(
      ".contact-form_sending-result",
    );
    console.log(formValidateResult);

    if (!isValid) {
      formValidateResult.classList.add("errorText", "show");
      formValidateResult.textContent =
        "При обработке формы произошла ошибка ❌!";

      setTimeout(() => {
        formValidateResult.classList.remove("show");
        setTimeout(() => {
          formValidateResult.classList.remove("errorText");
          formValidateResult.textContent = "";
        }, 400);
      }, 3000);

      return;
    }

    formValidateResult.textContent = `✅ Спасибо, ${data.name}! Ваше сообщение было отправлено`;
    formValidateResult.classList.add("successText");

    if (formValidateResult.classList.contains("errorText")) {
      formValidateResult.classList.remove("errorText");
    }

    if (!formValidateResult.classList.contains("show")) {
      formValidateResult.classList.toggle("show");
    }

    form.reset();
  });
});