import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

//styles
import s from './FormContainer.mod.scss';

//decorators
import { form } from 'react-inform';

//constants and utils
import {FIELD_TYPE_TO_RENDERER} from 'components/atoms/FormFields';

//returns true only when forceValidate is toggled from false to true
function hasSetForceValidate(nextProps, currentProps) {
	return nextProps.forceValidate && !currentProps.forceValidate;
}

function renderField(fieldConfig) {
	const {type, placeholder, fieldName, label, options} = fieldConfig,
		Renderer = FIELD_TYPE_TO_RENDERER.get(type),
		{fieldValues, fieldClass} = this,
		propsOfSelectedField = fieldValues[fieldName];

	return (<Renderer
    fieldClass={fieldClass}
    fieldProps={propsOfSelectedField.props}
    label={label}
    placeholder={placeholder}
    id={fieldName}
    key={fieldName}
    error={propsOfSelectedField.error}
    options={options}
  />);
}


/**
 * generic component wrapped with react-inform that provides dynamic ability to validate the form
 * Parent only needs to pass the names of field and config for the same, rest all handling is handled by this form renderer
 *
 * This is used for both employee details form and filter form and can be used to render any type of form in the system
 */
class FormContainer extends PureComponent {
	componentWillReceiveProps(nextProps) {
		const props = this.props;
		hasSetForceValidate(nextProps, props) && props.form.forceValidate();
	}

	render () {
		const {
      config,
      fields,
      containerClassName,
      columns = 2,
    } = this.props;
		const fieldClass = columns === 1 ? s.fullWidthField : s.halfWidthField;
		return (
      <div className={`${s.formFieldsContainer} ${containerClassName}`} >
        {Object.values(config).map(renderField, {fieldValues: fields, fieldClass})}
      </div>
		);
	}
}

FormContainer.propTypes = {
	form: PropTypes.object,
	config: PropTypes.object,
	containerClassName: PropTypes.string,
	columns: PropTypes.number,
	size: PropTypes.string,
	enableReset: PropTypes.bool,
	fields: PropTypes.array,
};

export default function getFormRenderer(fields, validate) {
	return form({fields, validate})(FormContainer);
}
