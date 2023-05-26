// login form
const form = document.querySelector('.loginForm');
const emailError = document.querySelector('.email.error');
const passwordError = document.querySelector('.password.error');

form.addEventListener('submit', async (e) => {
    e.preventDefault()
  // reset errors
  emailError.textContent = '';
  passwordError.textContent = '';
  // get values from the form
  const email = form.email.value;
  const password = form.password.value;
  try {
    const res = await window.fetch('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {'Content-Type': 'application/json'}
    });
    const data = await res.json();
    console.log(data);
    if (data.errors) {
      emailError.textContent = data.errors.email;
      passwordError.textContent = data.errors.password;
    }
    if (data.user) {
      window.location.assign('/user-dashboard');
    }
    if(data.admin){
      window.location.assign('/admin-panel');
    }
  }
  catch (err) {
    console.log(err);
  }
});




