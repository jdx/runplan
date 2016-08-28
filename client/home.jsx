'use strict'

const React = require('react')
const moment = require('moment')

const plan = [
  {
    start: new Date(2016, 7, 20),
    total: {planned: 25, actual: 28.7},
    days: [
      {planned: 0},
      {planned: 3},
      {planned: 5},
      {planned: 3},
      {planned: 0},
      {planned: 3},
      {planned: 8}
    ]
  }
]

class Home extends React.Component {
  render () {
    const planHtml = plan.map(week => {
      const days = week.days.map((day, i) => {
        const date = moment(week.start).add(i, 'days')
        return <td key={i}>
          <h4>{date.format(date.date() === 1 ? 'MMM D' : 'D')}</h4>
          <div>Planned: {day.planned}</div>
        </td>
      })
      return <tr key={week.start}>
        <td>
        Actual: {week.total.actual}<br />
        Planned: {week.total.planned}
        </td>
        {days}
      </tr>
    })
    return <div className='container'>
      <table className='table'>
        <thead>
          <tr>
            <td></td>
            <td>Monday</td>
            <td>Tuesday</td>
            <td>Wednesday</td>
            <td>Thursday</td>
            <td>Friday</td>
            <td>Saturday</td>
            <td>Sunday</td>
          </tr>
        </thead>
        <tbody>
          {planHtml}
        </tbody>
      </table>
    </div>
  }
}

module.exports = Home
