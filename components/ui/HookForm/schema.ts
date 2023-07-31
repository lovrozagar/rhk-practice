import { Rules } from './types/ControllerProps'

type OptionalEntryData = {
  label?: string
  rules?: Rules
}

type OsnovniPodaciKeys = 'example' | 'exampleRequired' | 'fullName' | 'cbx'

type OsnovniPodaci = {
  [key in OsnovniPodaciKeys]: {
    name: `osnovniPodaci_${key}`
  } & OptionalEntryData
}

type Schema = {
  osnovniPodaci: OsnovniPodaci
}

const formSchema: Schema = {
  osnovniPodaci: {
    example: {
      name: 'osnovniPodaci_example',
      label: 'osnovniPodaci_example',
      rules: {
        maxLength: { value: 150, message: 'Maksimalan broj slova je 150.' },
      },
    },
    exampleRequired: {
      name: 'osnovniPodaci_exampleRequired',
      label: 'osnovniPodaci_exampleRequired',
      rules: {
        required: { value: true, message: 'Select je obavezan' },
      },
    },
    fullName: {
      name: 'osnovniPodaci_fullName',
      label: 'osnovniPodaci_fullName',
      rules: {
        required: { value: true, message: 'Input je obavezan!' },
      },
    },
    cbx: {
      name: 'osnovniPodaci_cbx',
      label: 'osnovniPodaci_cbx',
      rules: {
        required: { value: true, message: 'checkbox is a must' },
      },
    },
  },
}

export default formSchema
