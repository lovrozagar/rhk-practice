import { Form, Input } from 'antd'
import { ReactNode } from 'react'
import { Controller, ControllerFieldState, FieldValues } from 'react-hook-form'
import { ControllerProps } from '../types/ControllerProps'

interface HelperText {
  startTypingPrefix?: string
  beginning?: string
  singularBeginning?: string
  end?: string
  singularEnd?: string
}

interface FormAutoCompleteProps<T extends FieldValues> extends ControllerProps<T> {
  label?: string
  characters: number
  charactersUntilHelperText?: number
  helperText?: HelperText
  containerClassName?: string
  inputClassName?: string
  children?: ReactNode
}

const FormAutoComplete = <T extends FieldValues>({
  name,
  rules,
  control,
  label,
  characters,
  inputClassName,
  containerClassName,
  helperText,
  charactersUntilHelperText,
  children,
}: FormAutoCompleteProps<T>) => {
  const handleHelperText = (fieldState: ControllerFieldState): string | null => {
    if (!helperText) return null
    let text: string | undefined = undefined

    // if error
    if (fieldState.invalid) {
      text = fieldState.error?.message
    }
    // if enough characters type and no error, hide helper text
    else if (charactersUntilHelperText && characters >= charactersUntilHelperText) {
      text = undefined
    }
    // if one character left, show singular text
    else if (charactersUntilHelperText && helperText && charactersUntilHelperText - characters === 1) {
      text = `${helperText.singularBeginning || ''} ${charactersUntilHelperText - characters} ${
        helperText.singularEnd || ''
      }`
    }
    // if no characters typed, show start typing text and plural text
    else if (charactersUntilHelperText && helperText && characters === 0 && helperText.startTypingPrefix) {
      text = `${helperText.startTypingPrefix || ''} ${helperText.beginning || ''} ${
        charactersUntilHelperText - characters
      } ${helperText.end || ''}`
      // if less than charactersUntilHelperText typed show plural text
    } else if (charactersUntilHelperText && helperText) {
      text = `${helperText.beginning || ''} ${charactersUntilHelperText - characters} ${helperText.end || ''}`
    }
    return text ? text.trim() : null
  }

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
            help={handleHelperText(fieldState)}
          >
            <span className={containerClassName}>
              <Input className={inputClassName} {...field} value={field.value} />
              {children}
            </span>
          </Form.Item>
        )}
      />
    </div>
  )
}

export default FormAutoComplete
