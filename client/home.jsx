'use strict'

const React = require('react')
const moment = require('moment')
const reqwest = require('reqwest')
const events = require('./events')

class Loading extends React.Component {
  render () {
    return <div className='container'>
      Loading...
    </div>
  }
}

class Calendar extends React.Component {
  constructor () {
    super()
    events.addListener('plan_updated', () => this.reload())
  }

  render () {
    if (!this.state) return <Loading />
    let plan = this.state.plan
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
            <td />
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

  componentDidMount () {
    this.reload()
  }

  reload () {
    console.log('reloading plan')
    reqwest('/api/plan')
    .then(plan => this.setState({plan}))
  }
}

class AddRace extends React.Component {
  constructor () {
    super()
    this.state = {}
  }
  render () {
    if (!this.state.adding) {
      return <div>
        <button onClick={() => this.setState({adding: true})} className='btn btn-default'>Add Race</button>
      </div>
    }

    const disabled = this.state.disabled ? 'disabled' : ''
    return <div>
      <input type='date' disabled={disabled} onChange={e => this.setState({date: e.target.value})} />
      <button onClick={() => this.add()} disabled={disabled} className='btn btn-default'>Add Race</button>
    </div>
  }

  add () {
    let {date} = this.state
    if (!date) return
    this.setState({disabled: true})
    reqwest({
      url: '/api/plan',
      method: 'POST',
      data: {date}
    }).then(() => {
      events.emit('plan_updated')
      this.setState({adding: false, date: null, disabled: false})
    })
  }
}

class Home extends React.Component {
  render () {
    return <div>
      <div className='container'>
        <br />
        <AddRace />
      </div>
      <Calendar />
    </div>
  }
}

module.exports = Home
