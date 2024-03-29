import React from 'react'
import classnames from 'classnames'
import propTypes from 'prop-types'

const TextFieldGroup = ({
  name,
  placeholder,
  value,
  label,
  error,
  info,
  disabled,
  type,
  onChange
})=> {
  return (
    <div className="form-group">
        <input
          type={type}
          className={classnames("form-control form-control-lg", {
          "is-invalid": error
           })}
           placeholder={placeholder}
           name={name}
           value={value}
           onChange={onChange}
           disabled={disabled}
        />
        {info && <small className="form-text text-muted">{info}</small>}
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
  )
}
TextFieldGroup.propTypes={
  name:propTypes.string.isRequired,
  placeholder:propTypes.string,
  value:propTypes.string.isRequired,
  label:propTypes.string,
  error:propTypes.string,
  info:propTypes.string,
  disabled:propTypes.string,
  type:propTypes.string.isRequired,
  onChange:propTypes.func.isRequired
}
TextFieldGroup.defaultProps={
  type:'text'
}
export default TextFieldGroup