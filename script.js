'use strict';

/////////////////////////////////////////////////
// Data

const account1 = {
    owner: 'Kelsy Watkins',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
};

const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
};

const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
};

const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
};

const accounts = [account1, account2, account3, account4];

/////////////////////////////////////////////////
// Elements

const labelWelcome = document.querySelector('.welcome');
const labelBalance = document.querySelector('.balance__value');
const btnLogin = document.querySelector('.login__btn');
const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements')


/////////////////////////////////////////////////
// Functions

// for each account, create username from initials
const createUsernames = function (accs) {
    accs.forEach(function (acc) {
        acc.username = acc.owner
            .toLowerCase()
            .split(' ')
            .map(name => name[0])
            .join('');
    });
};
createUsernames(accounts);

// calc balance
const calcDisplayBalance = function (acc) {
    acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
    labelBalance.textContent = `$${acc.balance}`;
};

// display and calc summary -- in, out, interest

// display movements -- deposits, withdrawls, value
const displayMovements = function(movements){
    containerMovements.innerHTML = ''; //Remove hardcoded values in HTML

    movements.forEach(function(mov, i){
        const type = mov > 0 ? 'deposit' : 'withdrawal'

        const html = `
        <div class="movements">
        <div class="movements__row">
        <div class="movements__type movements__type--${type}"> ${i + 1} ${type}</div>
        <div class="movements__value">${mov}</div>
        </div>
        `;

        containerMovements.insertAdjacentHTML('afterbegin', html);
    });
};
displayMovements(account1.movements);

const updateUI = function (acc) {
    // Display balance
    calcDisplayBalance(acc);

    // Display movements
    displayMovements(acc.movements);
};

// display movements -- date

// logout timer


/***************** todo: Event Handlers ***************************/
let currentAccount;

// login functionality
btnLogin.addEventListener('click', function (e) {
    // Prevent form from submitting
    e.preventDefault();

    currentAccount = accounts.find(
        acc => acc.username === inputLoginUsername.value
    );
    console.log(currentAccount);

    if (currentAccount?.pin === Number(inputLoginPin.value)) {
        // Display UI and message
        labelWelcome.style.color = 'black';
        labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]
            }!`;
        containerApp.style.opacity = 100;

        // Clear input fields
        inputLoginUsername.value = inputLoginPin.value = '';
        inputLoginPin.blur();
        updateUI(currentAccount);

    }
    else {
        labelWelcome.style.color = 'red';
        labelWelcome.textContent = `Account not found`;
    }
});
// start timer

// transfer money

// loan money

// close account

// hide main

// sort movements