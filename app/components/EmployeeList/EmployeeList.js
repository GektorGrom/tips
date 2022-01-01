import { nanoid } from 'nanoid';
import { Form, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';
import PropTypes from 'prop-types';
import SpyEmployeeForm from '../SpyEmployeeForm/SpyEmployeeForm';

function EmployeeList({ onChange, employees }) {
  return (
    <Form
      onSubmit={() => {}}
      mutators={{
        // potentially other mutators could be merged here
        ...arrayMutators,
      }}
      subscription={{ values: true }}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <SpyEmployeeForm onChange={onChange} />
          <FieldArray name="employees">
            {({ fields }) => (
              <div>
                {fields.map((name, index) => (
                  <div key={name} className="uk-grid-small uk-grid">
                    <div className="uk-width-1-2@s">
                      <label htmlFor={`name_${index}`}>Name</label>
                      <Field
                        className="uk-input"
                        name={`${name}.name`}
                        component="input"
                        id={`name_${index}`}
                      />
                    </div>
                    <div className="uk-width-1-2 uk-width-1-3@s">
                      <label htmlFor={`hours_${index}`}>Hours</label>
                      <Field
                        name={`${name}.hours`}
                        component="input"
                        type="number"
                        className="uk-input"
                        id={`hours_${index}`}
                      />
                    </div>
                    <div
                      className="uk-child-width-auto@s uk-margin-auto-left"
                      style={{ alignSelf: 'flex-end' }}
                    >
                      <button
                        className="uk-button uk-button-danger"
                        type="button"
                        onClick={() => fields.remove(index)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  className="uk-button uk-button-default uk-margin-top"
                  onClick={() => fields.push({ name: '', hours: 0, id: nanoid() })}
                >
                  Add Employee
                </button>
              </div>
            )}
          </FieldArray>
        </form>
      )}
    />
  );
}

EmployeeList.propTypes = {
  onChange: PropTypes.func.isRequired,
  employees: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      hours: PropTypes.number,
    }),
  ),
};
EmployeeList.defaultProps = {
  employees: [],
};

export default EmployeeList;
