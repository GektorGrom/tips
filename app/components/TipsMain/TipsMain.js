import React from 'react';
import EmployeeList from '../EmployeeList/EmployeeList';

function formatCurrency(value) {
  return new Intl.NumberFormat('ca-En', {
    style: 'currency',
    currency: 'CAD',
  }).format(value);
}

function formatHours(value) {
  if (Number.isNaN(parseInt(value, 10))) {
    return '0';
  }
  const rtf1 = new Intl.RelativeTimeFormat('en', { style: 'long' });
  console.log(rtf1.formatToParts(value, 'hour').slice(1));
  return rtf1
    .formatToParts(value, 'hour')
    .map(({ value: v }) => v)
    .slice(1)
    .join(' ');
}

function TipsMain() {
  const [amount, setAmount] = React.useState(0);
  const [employees, setEmployees] = React.useState([]);
  return (
    <div>
      <form action="" className="uk-form-horizontal">
        <div>
          <label className="uk-form-label" htmlFor="totalAmount">
            <span>Tips Amount</span>
          </label>
          <div className="uk-form-controls">
            <input
              type="text"
              className="uk-input"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            />
          </div>
        </div>
      </form>
      <EmployeeList onChange={setEmployees} employees={[]} />
      {Array.isArray(employees)
        && employees.filter(
          ({ name, hours }) => name && !Number.isNaN(parseInt(hours, 10)),
        ).length > 0 && (
          <ul className="uk-list uk-list-striped">
            {employees.map(({ name, hours, id }) => (
              <li key={id}>
                <span className="uk-text-bold">{name}</span>
                <span className="">
                  (
                  {formatHours(hours)}
                  )
                </span>
                <span className="uk-margin-left">
                  {formatCurrency(
                    amount
                      * (hours
                        / employees.reduce((acc, next) => {
                          if (+next.hours > 0) {
                            return acc + +next.hours;
                          }
                          return acc;
                        }, 0)),
                  )}
                </span>
              </li>
            ))}
          </ul>
      )}
    </div>
  );
}

TipsMain.propTypes = {};
TipsMain.defaultProps = {};

export default TipsMain;
