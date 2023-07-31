import { Checkbox, Form, Input } from 'antd'
import { ReactNode } from 'react'
import { Controller, FieldValues } from 'react-hook-form'
import { ControllerProps } from '../types/ControllerProps'

interface FormCheckboxProps<T extends FieldValues> extends ControllerProps<T> {
  label?: string
  helperText?: string
  containerClassName?: string
  inputClassName?: string
  children?: ReactNode
}

const FormCheckbox = <T extends FieldValues>({
  name,
  rules,
  control,
  label,
  inputClassName,
  containerClassName,
  helperText,
  children,
}: FormCheckboxProps<T>) => {
  return (
    <div>
      <Controller
        shouldUnregister
        name={name}
        rules={rules}
        control={control}
        render={({ field, fieldState }) => (
          <Form.Item
            label={label}
            validateStatus={fieldState.invalid ? 'error' : undefined}
            help={fieldState.error ? fieldState.error?.message : helperText}
          >
            <span className={containerClassName}>
              <Checkbox className={inputClassName} {...field} checked={field.value} />
              {children}
            </span>
          </Form.Item>
        )}
      />
    </div>
  )
}

export default FormCheckbox
