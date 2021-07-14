const signupForm = async (event) => {
  event.preventDefault();
  const email = document.querySelector('#registerEmail').value.trim();
  const username = document.querySelector('#regUsername').value.trim();
  const password = document.querySelector('#registerPassword').value;
  const confirmPassword = document.querySelector('#confirmPassword').value;

  if (email && password && username) {
    if (password === confirmPassword) {
      if (password.length >= 8) {
        const response = await fetch('/api/users', {
          method: 'POST',
          body: JSON.stringify({ username, email, password }),
          headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
          document.querySelector('#registerEmail').value = '';
          document.querySelector('#regUsername').value = '';
          document.querySelector('#registerPassword').value = '';
          document.location.replace('/');
        } else {
          let regFailed = document.querySelector('#register-failed');
          regFailed.className = 'fail'
        }
      } else {
        alert('Password must have 8 characters or more');
        document.querySelector('#registerPassword').value = '';
        document.querySelector('#confirmPassword').value = '';
      }
    } else {
      // let regFailed = document.querySelector('#register-failed');
      // regFailed.className = 'fail'
      alert('Passwords dont match');
      document.querySelector('#registerPassword').value = '';
      document.querySelector('#confirmPassword').value = '';
    }
  } else alert('Please fill the form');
};

document
  .querySelector('#register-Modal')
  .addEventListener('submit', signupForm);
