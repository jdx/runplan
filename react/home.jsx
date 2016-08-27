'use strict'

const React = require('react')

const plan = [
  {
    total: {planned: 25, actual: 28.7}
  }
]

class Home extends React.Component {
  render () {
    let planHtml = plan.map(week => {
      return <tr>
        <td>
        Actual: {week.total.actual}<br />
        Planned: {week.total.planned}
        </td>
        <td>
        Actual: {week.total.actual}<br />
        Planned: {week.total.planned}
        </td>
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
