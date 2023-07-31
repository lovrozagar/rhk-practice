import { Form, Input } from 'antd'
import { ReactNode } from 'react'
import { Controller, FieldValues } from 'react-hook-form'
import { ControllerProps } from '../types/ControllerProps'

interface FormInputProps<T extends FieldValues> extends ControllerProps<T> {
  label?: string
  helperText?: string
  containerClassName?: string
  inputClassName?: string
  children?: ReactNode
}

const FormInput = <T extends FieldValues>({
  name,
  rules,
  control,
  label,
  inputClassName,
  containerClassName,
  helperText,
  children,
}: FormInputProps<T>) => {
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
              <Input className={inputClassName} allowClear {...field} value={field.value} />
              {children}
            </span>
          </Form.Item>
        )}
      />
    </div>
  )
}

export default FormInput
