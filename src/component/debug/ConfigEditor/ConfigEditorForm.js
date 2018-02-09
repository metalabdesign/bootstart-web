// =============================================================================
// Import modules.
// =============================================================================
import {
  compose,
  filter,
  pipe,
  fromPairs,
  map,
  sortBy,
  toPairs,
} from 'ramda';
import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector, createSelector} from 'reselect';
import {FormattedMessage} from 'react-intl';
import {Field, FieldArray, reduxForm} from 'redux-form';

// =============================================================================
// Import components.
// =============================================================================
import Input from '/component/base/form/input';
import Button from '/component/base/button';
import Icon from '/component/base/icon';

// =============================================================================
// Import selectors.
// =============================================================================
import {setFeatures, getFeatures} from '/feature';

// =============================================================================
// Import styles.
// =============================================================================
import {
  TABLE,
  TABLE_HEADING,
  ACTIONS,
  ADD_VALUE,
  REMOVE_CELL,
} from './form.css';

const normalize = (val) => val.toUpperCase().replace(/\s+/g, '_');

export const Row = ({name, onRemove}) => (
  <tr>
    <td>
      <Field
        name={`${name}.key`}
        component={Input}
        placeholder=''
        normalize={normalize}
      />
    </td>
    <td>
      <Field
        name={`${name}.value`}
        component={Input}
        placeholder=''
      />
    </td>
    <td className={REMOVE_CELL}>
      <Button fakelink onClick={onRemove}>
        <Icon name='close'/>
      </Button>
    </td>
  </tr>
);

export const Rows = ({fields}) => (
  <div>
    <table className={TABLE}>
      <thead>
        <tr>
          <th className={TABLE_HEADING}>Key</th>
          <th className={TABLE_HEADING}>Value</th>
        </tr>
      </thead>
      <tbody>
        {fields.map((name, index) => (
          <Row name={name} key={index} onRemove={() => fields.remove(index)}/>
        ))}
      </tbody>
    </table>
    <div className={ADD_VALUE}>
      <Button onClick={() => fields.push({})} fakelink>
        <Icon name='plus'/> Add value
      </Button>
    </div>
  </div>
);

export const Form = ({handleSubmit, onCancel}) => (
  <form onSubmit={handleSubmit}>
    <FieldArray name='values' component={Rows}/>
    <div className={ACTIONS}>
      <Button onClick={onCancel} inverse>
        <FormattedMessage
          id='modal/config/CANCEL'
          defaultMessage='Cancel'
          description='Form cancel button'
        />
      </Button>{' '}
      <Button type='submit' primary>
        <FormattedMessage
          id='modal/config/SAVE'
          defaultMessage='Save'
          description='Form save button'
        />
      </Button>
    </div>
  </form>
);

export default compose(
  connect(
    createStructuredSelector({
      initialValues: createStructuredSelector({
        values: createSelector(
          getFeatures,
          pipe(
            toPairs,
            map(([key, value]) => ({key, value})),
            sortBy('key'),
          ),
        ),
      }),
    }),
    {setFeatures},
  ),
  reduxForm({
    form: 'debug-features',
    onSubmit: ({values = []} = {}, dispatch, {setFeatures, onSuccess}) => {
      pipe(
        filter(({key, value}) => key && value),
        map(({key, value}) => [key, value]),
        fromPairs,
        setFeatures,
      )(values);
      onSuccess();
    },
  }),
)(Form);
