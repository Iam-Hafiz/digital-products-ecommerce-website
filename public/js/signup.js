// Sign up form
const formSignUp = document.querySelector('.signupForm');
const emailErrorSignUp = document.querySelector('.emailError');
const passwordErrorSignUp = document.querySelector('.passwordError');

  formSignUp.addEventListener('submit', async (e) => {
    e.preventDefault();

    // reset errors
    emailErrorSignUp.textContent = '';
    passwordErrorSignUp.textContent = '';

    // get values
    const fieldsValues = {
      firstname: formSignUp.lname.value,
      lastname: formSignUp.fname.value,
      birthday: formSignUp.birthday.value,
      email: formSignUp.email.value,
      password: formSignUp.password.value,
      Address: formSignUp.adress.value,
      phoneNumber: formSignUp.phoneNumber.value,
      zipCode: formSignUp.zipCode.value,
      city: formSignUp.city.value,
      country: formSignUp.country.value
    }
    try {
      const res = await window.fetch('/signup', {
        method: 'POST',
        body: JSON.stringify(fieldsValues),
        headers: {'Content-Type': 'application/json'}
      });
      const data = await res.json();
      console.log(data);
      if (data.errors) {
        emailErrorSignUp.textContent = data.errors.email;
        passwordErrorSignUp.textContent = data.errors.password;
      }
      if (data.user) {
        window.location.assign('/login');
      }
    }
    catch (err) {
      console.log(err);
    }
  });
