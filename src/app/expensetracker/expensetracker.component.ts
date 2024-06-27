// expensetracker.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Expense {
  name: string;
  amount: number;
}

@Component({
  selector: 'app-expense',
  templateUrl: './expensetracker.component.html',
  styleUrls: ['./expensetracker.component.css']
})

export class ExpenseComponent {
  logoUrl: string = 'assets/logo.png'; // Path to your company logo image
  isLoggedIn: boolean = false;
  isexpenses: boolean = false;
  username: string = '';
  password: string = '';
  newExpense: Expense = { name: '', amount: 0 };
  expenses: Expense[] = [];

  // Array of user credentials and expenses (for demo purposes)
  users: { username: string, password: string, expenses: Expense[] }[] = [
    { username: 'sharan', password: 'sha1', expenses: [] },
    { username: 'gowtham', password: 'gow2', expenses: [] },
    { username: 'kasi', password: 'kas3', expenses: [] }
  ];

  constructor(private router: Router) {}

  login() {
    // Check if the entered username and password match any user in the array
    const user = this.users.find(u => u.username === this.username && u.password === this.password);

    if (user) {
      this.isLoggedIn = true;
      this.username = ''; // Clear username field
      this.password = ''; // Clear password field
      this.expenses = user.expenses; // Load user-specific expenses
    } else {
      alert('Invalid username or password');
    }
  }

  logout() {
    this.isLoggedIn = false;
    this.isexpenses = false;
    this.expenses = []; 
    this.router.navigateByUrl('/login');
  }

  addExpense() {
    if (this.newExpense.name && this.newExpense.amount > 0) {
      this.expenses.push({ name: this.newExpense.name, amount: this.newExpense.amount });
      this.newExpense.name = '';
      this.newExpense.amount = 0;
      // Update user's expenses in the array (for demo purposes)
      const currentUser = this.users.find(u => u.username === this.username);
      if (currentUser) {
        currentUser.expenses = this.expenses;
      }
    }
  }

  getTotalExpenses(): number {
    return this.expenses.reduce((total, expense) => total + expense.amount, 0);
  }
  expensess(){
    this.isexpenses = true;
  }
  home(){
    this.isexpenses = false;
  }
}
