const logOutButton = document.getElementById('logout-button');
const transactionForm = document.getElementById('transaction-form');
const transactionModal = new bootstrap.Modal('#transaction-modal');
const session = localStorage.getItem('session');
let logged = sessionStorage.getItem('logged');
let data = { transactions: [] };

checkLogged();

logOutButton.addEventListener('click', logout);

// Adicionar lançamento
transactionForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const value = parseFloat(document.getElementById('value-input').value);
  const description = document.getElementById('description-input').value;
  const date = document.getElementById('date-input').value;
  const type = document.querySelector('input[name="type-input"]:checked').value;
  
  data.transactions.unshift({
    value,
    type,
    description,
    date
  });

  saveData(data);
  e.target.reset();
  transactionModal.hide();
  alert('Lançamento adicionado com sucesso!');
});

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

function saveData(data) {
  localStorage.setItem(data.login, JSON.stringify(data));
}