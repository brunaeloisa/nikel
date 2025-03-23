const logOutButton = document.getElementById('logout-button');
const transactionModal = new bootstrap.Modal('#transaction-modal');
const session = localStorage.getItem('session');
let logged = sessionStorage.getItem('logged');
let data = { transactions: [] };

checkLogged();

logOutButton.addEventListener('click', logout);

function checkLogged() {
  if (session) {
    sessionStorage.setItem('logged', session);
    logged = session;
  }

  if (!logged) {
    window.location.href = './index.html';
  }

  const dataUser = localStorage.getItem(logged);

  if (dataUser) {
    data = JSON.parse(dataUser);
  }
}

function logout() {
  sessionStorage.removeItem('logged');
  localStorage.removeItem('session');
  window.location.href = './index.html';
}