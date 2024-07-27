import { useState } from 'react';
import './App.css';
import moment from 'moment';


function App() {
  const [list] = useState([
    {
      url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2017-07-31 13:24:00',
    },
    {
      url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2018-03-03 12:10:00',
    },
    {
      url: 'https://www.youtube.com/embed/xGRjCa49C6U?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2018-02-03 23:16:00',
    },
    {
      url: 'https://www.youtube.com/embed/RK1K2bCg4J8?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2018-01-03 12:10:00',
    },
    {
      url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2018-01-01 16:17:00',
    },
    {
      url: 'https://www.youtube.com/embed/TxbE79-1OSI?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2017-12-02 05:24:00',
    },
  ]);

  return <VideoList list={list} />;
}

function DateTime(props: { date: string }) {
  return <p className="date">{props.date}</p>;
}

function Video(props: { date: string; url: string }) {
  return (
    <div className="video">
      <iframe
        src={props.url}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
      ></iframe>
      <DateTimePretty date={props.date} />
    </div>
  );
}

function VideoList(props: { list: { date: string; url: string }[] }) {
  return props.list.map((item) => <Video url={item.url} date={item.date} />);
}

function DateTimePretty(props: { date: string }) {
  const prettyDate = getPrettyDate(props.date);
  return DateTime({ date: prettyDate });
}

function getPrettyDate(date: string) {
  const duration = moment.duration(moment().diff(moment(date)));
  if (duration.asMinutes() < 60) {
    const val = Math.floor(duration.asMinutes());
    if ((val % 10) === 1 ) {
      return `${val} минуту назад`;
    }
    if ((val % 10) > 1 && (val % 10) < 5) {
      return `${val} минуты назад`;
    }
    if ((val % 10) >= 5 || (val % 10) === 0) {
      return `${val} минут назад`;
    }
  }
  if (duration.asHours() < 24) {
    const val = Math.floor(duration.asHours());
    if ((val % 10) === 1 ) {
      return `${val} час назад`;
    }
    if ((val % 10) > 1 && (val % 10) < 5) {
      return `${val} часа назад`;
    }
    if ((val % 10) >= 5 || (val % 10) === 0) {
      return `${val} часов назад`;
    }
  }
  if (duration.asDays() < 30) {
    const val = Math.floor(duration.asMonths());
    if ((val % 10) === 1 ) {
      return `${val} месяц назад`;
    }
    if ((val % 10) > 1 && (val % 10) < 5) {
      return `${val} месяца назад`;
    }
    if ((val % 10) >= 5 || (val % 10) === 0) {
      return `${val} месяцев назад`;
    }
  }
  const val = Math.floor(duration.asYears());
  if ((val % 10) === 1 ) {
    return `${val} год назад`;
  }
  if ((val % 10) > 1 && (val % 10) < 5) {
    return `${val} года назад`;
  }
  if ((val % 10) >= 5 || (val % 10) === 0) {
    return `${val} лет назад`;
  }
  return 'неизвестно';
}

export default App;
