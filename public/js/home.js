const logOutButton = document.getElementById('logout-button');
const transactionsButton = document.getElementById('transactions-button');
const transactionForm = document.getElementById('transaction-form');
const transactionModal = new bootstrap.Modal('#transaction-modal');
const session = localStorage.getItem('session');
let logged = sessionStorage.getItem('logged');
let data = { transactions: [] };

checkLogged();

logOutButton.addEventListener('click', logout);

transactionsButton.addEventListener('click', () => {
  window.location.href = './transactions.html';
});

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
  updatePage();
  alert('Lançamento efetuado com sucesso!');
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
  updatePage();
}

function logout() {
  sessionStorage.removeItem('logged');
  localStorage.removeItem('session');
  window.location.href = './index.html';
}

function saveData(data) {
  localStorage.setItem(data.login, JSON.stringify(data));
}

function updatePage() {
  getTotal();
  getCashIn();
  getCashOut();
}

function getTotal() {
  let total = 0;

  data.transactions.forEach(transaction => {
    transaction.type === '1'
      ? total += transaction.value 
      : total -= transaction.value;
  });

  const totalElement = document.getElementById('total');
  totalElement.innerText = `R$ ${total.toFixed(2)}`;

  totalElement.classList.forEach(className => {
    if (className.startsWith('text')) {
      totalElement.classList.remove(className);
    }
  });

  if (total !== 0) {
    const textColor = total > 0 ? 'text-success' : 'text-danger';
    totalElement.classList.add(textColor);
  }
}

function getCashIn() {
  const cashIn = data.transactions.filter(item => item.type === '1');
  
  if (cashIn.length) {
    let cashInHtml = '';
    const limit = cashIn.length < 5 ? cashIn.length : 5;

    for (let i = 0; i < limit; i++) {
      cashInHtml += `
        <div class="row mb-4">
          <div class="col-12">
            <h3 class="fs-2">R$ ${cashIn[i].value.toFixed(2)}</h3>
            <div class="container p-0">
              <div class="row">
                <div class="col-12 col-md-8">
                  <p>${cashIn[i].description}</p>
                </div>
                <div class="col-12 col-md-3 d-flex justify-content-end">
                  ${cashIn[i].date}
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }
    document.getElementById('cash-in-list').innerHTML = cashInHtml;
  }
}

function getCashOut() {
  const cashOut = data.transactions.filter(item => item.type === '2');
  
  if (cashOut.length) {
    let cashOutHtml = '';
    const limit = cashOut.length < 5 ? cashOut.length : 5;

    for (let i = 0; i < limit; i++) {
      cashOutHtml += `
        <div class="row mb-4">
          <div class="col-12">
            <h3 class="fs-2">R$ ${cashOut[i].value.toFixed(2)}</h3>
            <div class="container p-0">
              <div class="row">
                <div class="col-12 col-md-8">
                  <p>${cashOut[i].description}</p>
                </div>
                <div class="col-12 col-md-3 d-flex justify-content-end">
                  ${cashOut[i].date}
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }
    document.getElementById('cash-out-list').innerHTML = cashOutHtml;
  }
}