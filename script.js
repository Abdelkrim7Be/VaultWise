'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// VaultWise APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// VaultWise APP

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////

const displayMovements = function (movements, sort = false) {
  // But we should empty the entire continer , and only then, we should start adding new elements :
  containerMovements.innerHTML = '';
  // textContent = 0;
  // innerHTML is like textContent, the differenece is textContent returns the text inside the wanted element
  // and innerHTML returns you everythings including the html

  // sorting the array of movements
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (movement, index) {
    const type = movement > 0 ? 'deposit' : 'withdrawal';

    const html = ` <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      index + 1
    } ${type}</div>
          <div class="movements__value">${movement.toFixed(2)}€</div>
        </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

console.log(containerMovements.innerHTML);
/**<div class="movements__row">
          <div class="movements__type movements__type--deposit">8 deposit</div>
          <div class="movements__value">1300</div>
        </div> */

/**So with beforeend, the order of the movements would be inverted. And that's because each new element would 
simply be added after the previous one. So at the end of the container, right?
And so that's after all the child elements that are already in there.
And that's why I wanted it to be the other way around
because like this (using 'afterbegin'), it will always be basically appended
to all the other children. So any new child element will appear before all the other child elements
that were already there. */

const createUsernames = function (accs) {
  // to mutate the original array => forEach()
  // to return a new array without modifying the new one => map()
  accs.forEach(account => {
    account.username = account.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};


const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  // labelBalance.textContent = balance + "";
  labelBalance.textContent = `${acc.balance.toFixed(2)} €`;
  // Label is something we wanna put a text in it
  // we use in it oftently textContent f label
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;

  const interests = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      console.log(arr); //[2.4, 5.4, 36, 0.84, 15.6]
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  /**.reduce((acc, int) => {
      if (int >= 1) {
        return acc + int;
      } else {
        return acc;
      }
    }, 0); */
  labelSumInterest.textContent = `${interests.toFixed(2)}€`;
};

createUsernames(accounts);
accounts.forEach(acc => {
  console.log(acc.username);
});
// js
// jd
// stw
// ss
// That is for displaying the balance of the account that logged in


//////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////
// LECTURES
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// The find() method

// find() method is to retrieve one element from the array based on an condition
// the find() method also loops over an array and execute its callback function in every iteration of it

// find() method returns the FIRST element that satisty the condition
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(firstWithdrawal);

// So now, with the help of the find() method , we can find the account based on a property of it
console.log(accounts);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);
// Object { owner: "Jessica Davis", movements: (8) […], interestRate: 1.5, pin: 2222, username: "jd" }

// Using the FOR OF loop
let acct = {};
for (const acc of accounts) {
  if (acc.owner === 'Jessica Davis') {
    acct = acc;
  }
}
console.log(acct);
// Object { owner: "Jessica Davis", movements: (8) […], interestRate: 1.5, pin: 2222, username: "jd" }

// Implementing the login

// Event Handelers
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // console.log("LOGIN"); //it gives us this clg and it reloads
  // the button in html is for reloading the page

  //This will prevent this form from submitting
  e.preventDefault();
  console.log('LOGIN');
  // The cool thing about forms , is that when you are on focus on some input and u click enter
  // it submits, which is cool

  // username is a property created with help of the function createUsernames()
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);
  // in case of 'js', it gives me :
  // { owner: 'Jonas Schmedtmann', movements: Array(8), interestRate: 1.2, pin: 1111, username: 'js' }
  // 7.20

  // to check if currentAccount exists, (in some cases, the login username is wrong so we get an erreur for the currentAccount being undefined and then the pin give us an error)

  // if (currentAccount && currentAccount.pin === Number(inputLoginPin.value)) {
  if (currentAccount?.pin === +inputLoginPin.value) {
    // (inputLoginPin.value) is always be a string

    //Display UI and a welcome message
    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(' ')[0]
    }!`;
    containerApp.style.opacity = 100;

    // Clear input fields, and lose the focus on them
    inputLoginPin.value = inputLoginUsername.value = ''; //because the reading and assignment is from the right
    inputLoginPin.blur();

    updateUI(currentAccount);

    console.log('Login');
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAccount = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  inputTransferAmount.value = inputTransferTo.value = '';
  if (
    amount > 0 &&
    receiverAccount &&
    currentAccount.balance >= amount &&
    receiverAccount?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiverAccount.movements.push(amount);

    updateUI(currentAccount);
    // displayMovements(currentAccount.movements);
    // calcDisplayBalance(currentAccount);
    // calcDisplaySummary(currentAccount);
  }
});



btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  const closingUsername = inputCloseUsername.value;
  const closingPin = +inputClosePin.value;
  if (
    closingPin === currentAccount.pin &&
    closingUsername === currentAccount.username
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    // console.log(index);
    // the findIndex() method will return the index of the first element that matches the condition, it is like the indexOf()
    // method but indexOf just verifies if a certain element exists in the  array or not but the findIndex() method verifies
    //  a complex boolean expression to find the index and return it

    // the splie() method actually mutates the actual array , so we dont have to sauvegarde the result

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
    // console.log(accounts);
  }
  inputCloseUsername.value = inputClosePin.value = '';
  inputClosePin.blur();
});


// SOME method------------------------------

// EQUALITY
console.log(movements.includes(-130));
// CONDITION
console.log(movements.some(mov => mov === -130));

// CONDITION
const anyDeposits = movements.some(mov => mov > 0);
console.log(anyDeposits);

// if the 'any' word matches the logic of ur work, u should use the 'some' method then
// Requesting LOAN
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  // const amount = +inputLoanAmount.value;
  // we are gonna round down the loan value cuz its weird to have it decimal
  const amount = Math.floor(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add the movement
    currentAccount.movements.push(amount);

    // Update the UI
    updateUI(currentAccount);

    // Clear the input field
  }
  inputLoanAmount.value = '';
});

// EVERY : if only all the elements in the array verifies the condition in the callback function, then , the 'every' method returns true

console.log(movements.every(mov => mov > 0)); //false
console.log(account2.movements.every(mov => mov > 0)); //true
