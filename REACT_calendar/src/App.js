import './App.css';

const bg_class_validator = (num) => {
  return (
    (num===parseInt(new Date().getDate())) ? 
      ((num%2===0) ? "today_val evn_val" : "today_val odd_val") : ((num%2===0) ? "evn_val" : "odd_val")
  );
}

const month_retrieve = (month) => {
  switch(month) {
    case 1: return "January";
    case 2: return "February";
    case 3: return "March";
    case 4: return "April";
    case 5: return "May";
    case 6: return "June";
    case 7: return "July";
    case 8: return "August";
    case 9: return "September";
    case 10: return "October";
    case 11: return "November";
    default: return "December";
  }
}

const date_count_calculator = (date_obj) => {
  let month_first_day = 0;
  let month_last_date = 0;

  switch(date_obj.getMonth()) {
    case 0 : case 3 : case 5 : case 7 : case 9 : case 11 :
      month_last_date = 31;
    break;
    case 1 :
      month_last_date = (date_obj.getFullYear()%4===0) ? 29 : 28;
    break;
    default :
      month_last_date = 30;
  }

  const new_date_obj = new Date((date_obj.getFullYear()+','+(date_obj.getMonth()+1)+','+1).toString());
  month_first_day = new_date_obj.getDay();

  return [month_first_day,month_last_date];
}

const DateTile = ({ code, value }) => <div className={"date_tile "+code}>{value}</div>

const Calendar = ({cur_date}) => {
  let [ week_day, month_length ] = date_count_calculator(cur_date);
  let numeric_positive = (-1)*(month_length-(month_length+1));
  let week_days = ["MON", "TUS", "WED", "THU", "FRI", "SAT", "SUN"];
  let date_distribution = [];
   
  week_days.forEach(w_d => {
    date_distribution.push({val: w_d, class: "shrink"});
  });

  while(week_day>1) {
    date_distribution.push({val: '', class: "empty"});
    week_day--;
  }

  while(month_length>=2) {
    (numeric_positive===1) && date_distribution.push({val: numeric_positive, class: bg_class_validator(numeric_positive)});
    date_distribution.push({val: ++numeric_positive, class: bg_class_validator(numeric_positive)});
    month_length--;
  }

  return (
    <div className="calendar">
      {date_distribution.map((elm,index) => 
        <DateTile 
          code={elm['class']}
          value={elm['val']}
          key={index}
      />)}
    </div>
  );
}

const Header = ({cur_date}) => {
  return (
    <header>
      <h1>React Calender</h1>
      <p>{month_retrieve(cur_date.getMonth()+1)+' – '+cur_date.getFullYear()}</p>
    </header>
  );
}

function App() {
  const date_obj = new Date();

  return (
    <div className="App">
      <Header cur_date={date_obj}/>
      <Calendar cur_date={date_obj}/>
    </div>
  );
}

export default App;
