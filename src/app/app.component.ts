import {Component} from '@angular/core';
import * as firebase from "firebase";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  constructor() {
    let config = {
      apiKey: "AIzaSyAr3Bg2tJBrf_c9o6W0EK1B17RiHbu1hPw",
      authDomain: "budget-app-7f40c.firebaseapp.com",
      databaseURL: "https://budget-app-7f40c.firebaseio.com",
      storageBucket: "budget-app-7f40c.appspot.com",
      messagingSenderId: "792611408752"
    };

    firebase.initializeApp(config);

    let root = firebase.database().ref();
    root.on('value', function (snap) {
      console.log(snap.val())
    });
  }

  initDB() {
    let categories = firebase.database().ref('categories');
    let monthlyBudget = firebase.database().ref('monthly-budget');

    let budgetCategories = ['Mortgage/Rent', 'Electricity', 'Mobile Phone', 'Cable',
      'Groceries', 'Entertainment', 'Water/Sewer', 'Auto Loan', 'Dining Out',
      'Auto Ins', 'HO Ins', 'Rainy Day Fund', 'Vacation Fund', 'Retirement']
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    budgetCategories.forEach(category => {
      const categoryRef = categories.push({name: category});
      months.forEach(month => {
        monthlyBudget.push({
          month: month,
          amount: 0,
          category: categoryRef.key
        })
      })
    })
  }
}
