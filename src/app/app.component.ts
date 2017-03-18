import {Component} from '@angular/core';
import * as firebase from "firebase";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  budgetData: any;

  constructor() {
    let config = {
      apiKey: "AIzaSyAr3Bg2tJBrf_c9o6W0EK1B17RiHbu1hPw",
      authDomain: "budget-app-7f40c.firebaseapp.com",
      databaseURL: "https://budget-app-7f40c.firebaseio.com",
      storageBucket: "budget-app-7f40c.appspot.com",
      messagingSenderId: "792611408752"
    };

    firebase.initializeApp(config);
    this.getBudget();
  }

  initDB() {
    let categories = firebase.database().ref('categories');
    let budgetCategories = ['Mortgage', 'Electricity', 'Mobile Phone', 'Cable',
      'Groceries', 'Entertainment', 'Water', 'Auto Loan', 'Dining Out',
      'Auto Ins', 'HO Ins', 'Rainy Day Fund', 'Vacation Fund', 'Retirement'];
    budgetCategories.forEach(category => {
      const categoryRef = categories.push({
        name: category, jan: 0, feb: 0, mar: 0,
        apr: 0, may: 0, jun: 0, jul: 0, aug: 0,
        sep: 0, oct: 0, nov: 0, dec: 0
      });
    })

  }

  getBudget() {

    let budget = firebase.database().ref('categories');
    this.budgetData = [];
    budget.on('child_added', (snap) => {
      let item = snap.val();
      item.key = snap.key;
      this.budgetData.push(item)
    });
    budget.on('child_changed', (snap) => {
      let item = snap.val();
      item.key = snap.key;
      let index = this.budgetData.findIndex(category => {
        return category.key === item.key;
      });
      this.budgetData[index] = item;
    });
  }

  updateData(event) {
    let category = event.data.name;
    let field = event.column.field;
    let item = this.budgetData.filter(function (c) {
      return c.name === category;
    });

    let update = {};
    update[field] = parseInt(item[0][field], 10);
    firebase.database().ref(`categories/${event.data.key}`).update(update)

  }
}
