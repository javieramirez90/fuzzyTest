import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fuzzy-search',
  templateUrl: './fuzzy-search.component.html',
  styleUrls: ['./fuzzy-search.component.css']
})
export class FuzzySearchComponent implements OnInit {
  
  transactions:any = [
    { amount: 112.98, date: '27-01-2018T12:34', card_last_four: '2544' },
    { amount: 0.45, date: '01-12-2017T9:36', card_last_four: '4434' },
    { amount: 95.99, date: '23-11-2017T14:34', card_last_four: '3011' },
    { amount: 7774.32, date: '17-07-2017T03:34', card_last_four: '6051' },
    { amount: 1345.98, date: '22-06-2017T10:33', card_last_four: '0059' },
    { amount: 2850.70, date: '27-01-2018T12:34', card_last_four: '4444' },
    { amount: 45.00, date: '10-02-2018T02:34', card_last_four: '0110' },
    { amount: 1.00, date: '17-02-2018T18:34', card_last_four: '1669' },
    { amount: 4.69, date: '01-02-2018T02:34', card_last_four: '8488' },
    { amount: 1111.11, date: '15-01-2018T21:34', card_last_four: '9912' }
  ];
  otherTransactions = JSON.stringify(this.transactions);
  filtered = this.transactions;
  mySearch;
  charByChar;
  query;
  

  constructor() { }

  ngOnInit() {
    this.sortingDates();
  }

  createRegExp(input) {
    return `.*${input}`;
  }
  
  sortingDates(){
    
    for(var i = 0; i < this.transactions.length; i++){
      let nDate: any = this.transactions[i].date;
      console.log(nDate);
      let newformat: any = nDate.split("T")
      console.log(newformat);
      let dateOnly = newformat[0].split("-");
      let day = parseInt(dateOnly[0]);
      let month = parseInt(dateOnly[1]);
      let year = parseInt(dateOnly[2]);
      let completeHour = newformat[1].split(":");
      let hour = parseInt(completeHour[0]);
      let min = parseInt(completeHour[1]);
      
      let dateData: any = new Date(year, month - 1, day, hour, min, 0, 0);
      console.log(typeof(dateData));
      let pack = String(dateData);
      console.log(typeof(pack));

      this.transactions[i].date= dateData;
    }
    
    function compare(a,b) {
      if (a.date < b.date)
      return -1;
      if (a.date > b.date)
      return 1;
      return 0;
    }
    
    this.transactions.sort(compare);

    for(var i = 0; i < this.transactions.length; i++){
      let newDate = String(this.transactions[i].date);
      this.transactions[i].date = newDate;
    }
  
    console.log(this.transactions);
    console.log(typeof(this.transactions[0].date));
    return this.transactions;
    // this.transactions = JSON.stringify(this.transactions);
  };
  
  


  ///////////////////



  toFilter() {
    this.charByChar = this.mySearch.replace(/\ /g, '').toUpperCase().split('');
    let response = '';
    this.charByChar.map(input => {
      response += this.createRegExp(input);
    });
    response += '.*';
    return response;
  }

  bolding(text: any, input) {
    if (String(text).indexOf(input) !== -1) {
      const turnToArray = String(text).split('');
      turnToArray[String(text).indexOf(input)] = `<strong class="highlight">${input}</strong>`;
      text = turnToArray.join('');
     }
     return text;
  }

  fuzzy() {
    this.transactions = JSON.parse(this.otherTransactions);
    this.sortingDates();
    this.query = this.toFilter();
    const regexp = new RegExp(this.query);
    this.transactions = this.transactions.filter((transaction: any) => {
      this.charByChar = this.mySearch.replace(/\ /g, '').toUpperCase().split('');
      this.charByChar.forEach(input => {
        transaction.date = this.bolding(transaction.date, input);
        transaction.card_last_four = this.bolding(transaction.card_last_four, input);
        transaction.amount = this.bolding(transaction.amount, input);
      });
      //Tuve una complicación  con el método de acomodo de fecha una vez que hago la consulta
      // this.sortingDates();
      return regexp.test(String(transaction.amount)) || regexp.test(transaction.date) || regexp.test(transaction.card_last_four) ;
    });
  }
}