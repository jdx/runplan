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
    const today = moment().startOf('day')
    const planHtml = plan.weeks.map(week => {
      const days = week.days.map(day => {
        const date = moment(day.date).startOf('day')
        let relative = ''
        if (date.isBefore(today)) relative = ' before'
        if (date.isSame(today)) relative = ' today'
        let run = day.planned === 0 ? day.type : `${day.planned}mi ${day.type}`
        return <td className={'day' + relative} key={day.date}>
          <div className='date'>{date.format(date.date() === 1 ? 'MMM D' : 'D')}</div>
          <div className={'planned ' + day.type}>{run}</div>
        </td>
      })
      return <tr key={week.days[0].date}>
        <td className='summary'>
          {today.isSameOrAfter(week.days[0].date) ? week.total.actual + '/' : '' }
          {week.total.planned}mi
        </td>
        {days}
      </tr>
    })
    return <div className='container'>
      <table id='calendar' className='table table-bordered table-condensed'>
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
    reqwest('/api/plan')
    .then(plan => this.setState({plan}))
  }
}

class AddRace extends React.Component {
  constructor () {
    super()
    this.state = this.defaults
  }
  get defaults () {
    return {
      type: 'Marathon',
      date: moment().add(3, 'months').format('YYYY-MM-DD'),
      adding: false,
      disabled: false
    }
  }
  render () {
    if (!this.state.adding) {
      return <div>
        <button onClick={() => this.setState({adding: true})} className='btn btn-default'>Add Race</button>
      </div>
    }

    const disabled = this.state.disabled ? 'disabled' : ''
    return <div className='form-group form-inline'>
      <select className='form-control' defaultValue={this.state.type} onChange={e => this.setState({type: e.target.value})}>
        <option>5K</option>
        <option>10K</option>
        <option>Half Marathon</option>
        <option>Marathon</option>
      </select>
      <input className='form-control' type='date' disabled={disabled} onChange={e => this.setState({date: e.target.value})} defaultValue={this.state.date} />
      <button onClick={() => this.add()} disabled={disabled} className='btn btn-default'>Add Race</button>
    </div>
  }

  add () {
    let {date, type} = this.state
    if (!date) return
    this.setState({disabled: true})
    reqwest({
      url: '/api/plan',
      method: 'POST',
      data: {date, type}
    }).then(() => {
      events.emit('plan_updated')
      this.setState(this.defaults)
    })
  }
}

class Home extends React.Component {
  render () {
    return <div>
      <div className='container'>
        <h1>Jeff's Training Plan</h1>
        <AddRace />
      </div>
      <Calendar />
    </div>
  }
}

module.exports = Home
