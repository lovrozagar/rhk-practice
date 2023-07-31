import { useEffect, useState } from 'react'
import { Control, FieldValues, Path, useWatch } from 'react-hook-form'

const useInputLength = <FormValues extends FieldValues>(control: Control<FormValues>, name: keyof FormValues) => {
  const [characters, setCharacters] = useState<number>(0)

  const inputValue: string | undefined = useWatch({
    control,
    name: name as Path<FormValues>,
  })

  useEffect(() => {
    if (inputValue !== undefined) {
      setCharacters(inputValue.length)
    }
  }, [inputValue])

  return characters
}

export default useInputLength
