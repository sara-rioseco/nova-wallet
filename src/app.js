import Login from './pages/login.js';
import SignUp from './pages/signup.js';
import Home from './pages/home.js';
import Deposit from './pages/deposit.js';
import Transfer from './pages/transfer.js';
import Transactions from './pages/transactions.js';

const rootDiv = document.getElementById('root');

const routes = {
  '/': Login,
  '/signup': SignUp,
  '/home': Home,
  '/deposit': Deposit,
  '/transfer': Transfer,
  '/transactions': Transactions,
};

const onNavigate = pathname => {
  window.history.pushState({}, pathname, window.location.origin + pathname);
  while (rootDiv.firstChild) {
    rootDiv.removeChild(rootDiv.firstChild);
  }
  rootDiv.appendChild(routes[pathname](onNavigate));
};

window.onpopstate = () => {
  while (rootDiv.firstChild) {
    rootDiv.removeChild(rootDiv.firstChild);
  }
  rootDiv.appendChild(routes[window.location.pathname](onNavigate));
};
rootDiv.appendChild(routes[window.location.pathname](onNavigate));
