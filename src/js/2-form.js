const STORAGE_KEY = 'feedback-form-state';
const formEl = document.querySelector('.feedback-form');

const formData = { email: '', message: '' };

const saved = localStorage.getItem(STORAGE_KEY);

if (saved) {
  try {
    const parsed = JSON.parse(saved);

    formData.email = (parsed.email ?? '').trim();
    formData.message = (parsed.message ?? '').trim();

    formEl.elements.email.value = formData.email;
    formEl.elements.message.value = formData.message;
  } catch (e) {
    localStorage.removeItem(STORAGE_KEY);
  }
}

formEl.addEventListener('input', event => {
  const { name, value } = event.target;

  if (name !== 'email' && name !== 'message') return;

  formData[name] = value.trim();

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

formEl.addEventListener('submit', event => {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log({ ...formData });

  localStorage.removeItem(STORAGE_KEY);

  formData.email = '';
  formData.message = '';

  formEl.reset();
});
