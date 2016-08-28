'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var moment = require('moment');

var plan = [{
  start: new Date(2016, 7, 20),
  total: { planned: 25, actual: 28.7 },
  days: [{ planned: 0 }, { planned: 3 }, { planned: 5 }, { planned: 3 }, { planned: 0 }, { planned: 3 }, { planned: 8 }]
}];

var Home = function (_React$Component) {
  _inherits(Home, _React$Component);

  function Home() {
    _classCallCheck(this, Home);

    return _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).apply(this, arguments));
  }

  _createClass(Home, [{
    key: 'render',
    value: function render() {
      var planHtml = plan.map(function (week) {
        var days = week.days.map(function (day, i) {
          var date = moment(week.start).add(i, 'days');
          return React.createElement(
            'td',
            { key: i },
            React.createElement(
              'h4',
              null,
              date.format(date.date() === 1 ? 'MMM D' : 'D')
            ),
            React.createElement(
              'div',
              null,
              'Planned: ',
              day.planned
            )
          );
        });
        return React.createElement(
          'tr',
          { key: week.start },
          React.createElement(
            'td',
            null,
            'Actual: ',
            week.total.actual,
            React.createElement('br', null),
            'Planned: ',
            week.total.planned
          ),
          days
        );
      });
      return React.createElement(
        'div',
        { className: 'container' },
        React.createElement(
          'table',
          { className: 'table' },
          React.createElement(
            'thead',
            null,
            React.createElement(
              'tr',
              null,
              React.createElement('td', null),
              React.createElement(
                'td',
                null,
                'Monday'
              ),
              React.createElement(
                'td',
                null,
                'Tuesday'
              ),
              React.createElement(
                'td',
                null,
                'Wednesday'
              ),
              React.createElement(
                'td',
                null,
                'Thursday'
              ),
              React.createElement(
                'td',
                null,
                'Friday'
              ),
              React.createElement(
                'td',
                null,
                'Saturday'
              ),
              React.createElement(
                'td',
                null,
                'Sunday'
              )
            )
          ),
          React.createElement(
            'tbody',
            null,
            planHtml
          )
        )
      );
    }
  }]);

  return Home;
}(React.Component);

module.exports = Home;