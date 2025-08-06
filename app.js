const form = document.getElementById('signupForm');
const result = document.getElementById('result');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const data = {
    name: formData.get('name'),
    surname: formData.get('surname'),
    phone: formData.get('phone'),
    email: formData.get('email'),
    idNumber: formData.get('idNumber'),
  };

  try {
    const res = await fetch('http://192.168.0.36:3000/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const json = await res.json();

    if (json.success) {
      result.textContent = 'Member registered successfully! ID: ' + json.memberId;
      form.reset();
    } else {
      result.textContent = 'Error: ' + (json.error || 'Unknown error');
    }
  } catch (err) {
    result.textContent = 'Network error. Could not register.';
  }
});
