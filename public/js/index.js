const registerForm = document.getElementById('register-form');
const registerModal = new bootstrap.Modal('#register-modal');
const loginForm = document.getElementById('login-form');
const session = localStorage.getItem('session');
let logged = sessionStorage.getItem('logged');

checkLogged();

// Criar conta
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

// Fazer login
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('email-input').value;
  const password = document.getElementById('password-input').value;
  const checkSession = document.getElementById('check-input').checked;

  const user = getAccount(email);

  if (!user || password !== user.password) {
    alert('Verifique o usuário ou a senha.');
    return;
  }

  saveSession(email, checkSession);
  window.location.href = './home.html';
});

function saveAccount(data) {
  localStorage.setItem(data.login, JSON.stringify(data));
}

function getAccount(key) {
  const account = localStorage.getItem(key);
  return account ? JSON.parse(account) : null;
}

function saveSession(data, saveSession) {
  if (saveSession) {
    localStorage.setItem('session', data);
  }
  sessionStorage.setItem('logged', data);
}

function checkLogged() {
  if (session) {
    sessionStorage.setItem('logged', session);
    logged = session;
  }

  if (logged) {
    saveSession(logged, session);
    window.location.href = './home.html';
  }
}