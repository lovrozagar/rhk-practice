import { Form, Select } from 'antd'
import { ReactNode } from 'react'
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form'
import { ControllerProps } from '../types/ControllerProps'

interface FormSelectProps<T extends FieldValues> extends ControllerProps<T> {
  label?: string
  helperText?: string
  containerClassName?: string
  inputClassName?: string
  children?: ReactNode
}

const FormSelect = <T extends FieldValues>({
  name,
  rules,
  control,
  label,
  inputClassName,
  containerClassName,
  helperText,
  children,
}: FormSelectProps<T>) => {
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
              <Select className={inputClassName} allowClear {...field} value={field.value}>
                {['option-1', 'option-2', 'option-3', 4].map((option) => (
                  <Select.Option key={option} value={option}>
                    {option}
                  </Select.Option>
                ))}
              </Select>
              {children}
            </span>
          </Form.Item>
        )}
      />
    </div>
  )
}

export default FormSelect
