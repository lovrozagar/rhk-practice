'use client'

import FormAutoComplete from '@/components/ui/HookForm/FormAutoComplete/FormAutoComplete'
import FormCheckbox from '@/components/ui/HookForm/FormCheckbox/FormCheckbox'
import FormInput from '@/components/ui/HookForm/FormInput/FormInput'
import FormSelect from '@/components/ui/HookForm/FormSelect/FormSelect'
import useInputLength from '@/components/ui/HookForm/hooks/useInputLength'
import formSchema from '@/components/ui/HookForm/schema'
import { Button, Form } from 'antd'
import { isEqual } from 'lodash'
import { useEffect, useRef, useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

type FormFields = {
  osnovniPodaci_example: string
  osnovniPodaci_exampleRequired: string
  osnovniPodaci_fullName: string
  osnovniPodaci_cbx: boolean
}

export default function Home() {
  const defaultValues = useRef<FormFields>({
    osnovniPodaci_example: '',
    osnovniPodaci_exampleRequired: '',
    osnovniPodaci_fullName: '',
    osnovniPodaci_cbx: false,
  })

  const form = useForm<FormFields>({
    defaultValues: defaultValues.current,
    mode: 'onSubmit',
  })
  const characters = useInputLength(form.control, 'osnovniPodaci_example')
  console.log('a')

  const onSubmit: SubmitHandler<FormFields> = () => {
    const currentValues = form.getValues()
    console.log(currentValues)
    const isChanged = !isEqual(currentValues, defaultValues.current)
    console.log(isChanged)
  }

  const [shouldValidateSelect, setShouldValidateSelect] = useState(true)

  useEffect(() => {
    if (characters === 0) {
      form.setValue('osnovniPodaci_exampleRequired', '')
    }
  }, [characters])

  return (
    <main className='flex justify-center gap-2'>
      <FormProvider {...form}>
        <Form className='grid gap-2 p-2' onFinish={form.handleSubmit(onSubmit)}>
          <FormAutoComplete
            {...formSchema.osnovniPodaci.example}
            containerClassName='flex gap-2'
            control={form.control}
            characters={characters}
            charactersUntilHelperText={3}
            helperText={{
              beginning: 'Potrebna jos',
              end: 'slova.',
              singularBeginning: 'Potrebno jos',
              singularEnd: 'slovo.',
            }}
          >
            <Button
              htmlType='button'
              onClick={() => {
                const currentValues = form.getValues()
                console.log(currentValues)
                const isChanged = !isEqual(currentValues, defaultValues.current)
                console.log(isChanged)
              }}
            >
              Go back
            </Button>
          </FormAutoComplete>
          <FormSelect
            {...formSchema.osnovniPodaci.exampleRequired}
            control={form.control}
            helperText='Click to show options'
          />
          <FormInput {...formSchema.osnovniPodaci.fullName} control={form.control} />
          <FormCheckbox {...formSchema.osnovniPodaci.cbx} control={form.control} />
          <Button htmlType='submit'>Submit</Button>
        </Form>
      </FormProvider>
    </main>
  )
}
