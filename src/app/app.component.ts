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
  chartData: any;
  chartOptions: any;
  selectedRow: any;

  constructor() {
    this.chartOptions = {
      responsive: false,
      maintainAspectRatio: false
    }

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

  updateData(event,chart) {
    let category = event.data.name;
    let field = event.column.field;
    let item = this.budgetData.filter(function (c) {
      return c.name === category;
    });

    let update = {};
    update[field] = parseInt(item[0][field], 10);
    firebase.database().ref(`categories/${event.data.key}`).update(update)
    this.updateChart(event, chart)
  }

  updateChart(event, chart) {
    if (this.selectedRow !== event.data) {
      this.selectedRow = event.data;

      let labels = ['jan', 'feb', 'mar', 'apr', 'may', 'june',
        'jul', 'aug', 'sep', 'oct', 'nov', 'dec'
      ];

      let data = {
        labels: labels,
        datasets: [
          {
            data: [event.data.jan,
              event.data.feb,
              event.data.mar,
              event.data.apr,
              event.data.may,
              event.data.jun,
              event.data.jul,
              event.data.aug,
              event.data.sep,
              event.data.oct,
              event.data.nov,
              event.data.dec
            ],
            backgroundColor: [
              "#E60012",
              "#F39800",
              "#FFF100",
              "#8FC31F",
              "#009944",
              "#009E96",
              "#00A0E9",
              "#0068B7",
              "#1D2088",
              "#920783",
              "#E4007F",
              "#E5004F"
            ],
            hoverBackgroundColor: [
              "#E60012",
              "#F39800",
              "#FFF100",
              "#8FC31F",
              "#009944",
              "#009E96",
              "#00A0E9",
              "#0068B7",
              "#1D2088",
              "#920783",
              "#E4007F",
              "#E5004F"
            ]
          }]
      };

      this.chartData = Object.assign({}, data);
      setTimeout(() => {
        chart.reinit();
      }, 100);
    }
  }
}
