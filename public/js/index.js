const registerForm = document.getElementById('register-form');
const registerModal = new bootstrap.Modal('#register-modal');

registerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const email = document.getElementById('register-email-input').value;
  const password = document.getElementById('register-password-input').value;

  if (email.length < 5) {
    alert('Preencha o campo com um e-mail válido.');
    return;
  }

  if (password.length < 4) {
    alert('A senha precisa ter no mínimo 4 dígitos.');
    return;
  }

  saveAccount({
    login: email,
    password: password,
    transactions: []
  });

  registerModal.hide();
  alert('Conta criada com sucesso!');
});

function saveAccount(data) {
  localStorage.setItem(data.login, JSON.stringify(data));
}