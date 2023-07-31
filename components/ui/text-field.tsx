import { Form, Input } from 'antd'
import { Controller, ControllerFieldState, useFormContext } from 'react-hook-form'

interface TextFieldProps {
  name: string
  characters: number
  charactersUntilHelperText?: number
  helperText?: {
    startTypingPrefix?: string
    beginning?: string
    singularBeginning?: string
    end?: string
    singularEnd?: string
  }
  // character length shown between beginning and end strings, if end strings are not needed pass them as empty string
}

const TextField = ({ name, characters, helperText, charactersUntilHelperText }: TextFieldProps) => {
  const { control } = useFormContext()

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
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <Form.Item
            name={name}
            validateStatus={fieldState.invalid ? 'error' : undefined}
            help={handleHelperText(fieldState)}
          >
            <Input {...field} value={field.value} />
          </Form.Item>
        )}
      />
    </div>
  )
}

export default TextField
