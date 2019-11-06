import Home from '../views/home';
import List from '../views/list';
import Overview from '../views/overview';
import Invite from '../views/invite';
import Welcome from '../views/welcome';
import Login from '../views/login';
import CreateAccount from '../views/createAccount';
import ForgottenPassword from '../views/forgottenPassword';
import SetNewPassword from '../views/forgottenPassword/setNewPassword';
import Account from '../views/account';
import ResetPassword from '../views/resetPassword';
import Transactions from '../views/transactions';
import Portfolio from '../views/portfolio';
import Investment from '../views/investment';

export default [
  {
    name: 'home',
    path: '/',
    component: Home,
    redirect: '/login'
  },
  {
    name: 'login',
    path: '/login',
    component: Login
  },
  {
    name: 'createAccount',
    path: '/create-account',
    component: CreateAccount
  },
  {
    name: 'forgottenPassword',
    path: '/forgotten-password',
    component: ForgottenPassword
  },
  {
    name: 'setNewPassword',
    path: '/forgotten/set-new-password',
    component: SetNewPassword
  },
  {
    name: 'browse',
    path: '/browse',
    component: List
  },
  {
    name: 'overview',
    path: '/overview/:id',
    component: Overview
  },
  {
    name: 'invite',
    path: '/invite',
    component: Invite
  },
  {
    name: 'welcome',
    path: '/welcome',
    component: Welcome
  },
  {
    name: 'account',
    path: '/account',
    component: Account
  },
  {
    name: 'resetPassword',
    path: '/reset-password',
    component: ResetPassword
  },
  {
    name: 'transactions',
    path: '/transactions',
    component: Transactions
  },
  {
    name: 'portfolio',
    path: '/portfolio',
    component: Portfolio
  },
  {
    name: 'investment',
    path: '/investment/:id',
    component: Investment
  }
];