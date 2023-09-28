import { createAjv } from '@jsonforms/core'
import { materialCells, materialRenderers } from '@jsonforms/material-renderers'
import { JsonForms } from '@jsonforms/react'
import Button from '@mui/material/Button'
import { Fragment, useState } from 'react'
import './App.css'
import { downloadJson, uploadJson } from './fileHandling'
import schema from './schema.json'
import uischema from './uischema.json'

const renderers = [...materialRenderers]
const handleDefaultsAjv = createAjv({ useDefaults: true })

const App = () => {
  const [data, setData] = useState<any>({})
  const [errors, setErrors] = useState<any>({})

  const clearData = () => {
    setData({})
  }

  return (
    <Fragment>
      <div className='div-instructions'>
        <h1>VMI Train Configurations</h1>
        <p>
          This form will allow you to configure rooms for the VMI train
          experiment. To start, click on the "Add room" button at the top right.
          This will add a new room to the list. You can then click on the room
          to edit it. You can add as many rooms as you like. Once you're done,
          simply click on the "Export JSON" button to download the configuration
          file. If you already have a configuration file, you can click on the
          "Import JSON" button to load and edit it.
        </p>
      </div>
      <div className='div-button'>
        <Button onClick={clearData} color='primary' variant='contained'>
          Clear data
        </Button>
        <Button
          variant='contained'
          onClick={async () => {
            const json = await uploadJson()
            if (json) {
              setData(json)
            }
          }}
        >
          Import JSON
        </Button>
        <Button
          variant='contained'
          onClick={() => {
            if (Object.keys(errors).length > 0) {
              alert('Please fix all errors before exporting')
              return
            }
            downloadJson(data, 'roomConfig')}
          }
        >
          Export JSON
        </Button>
      </div>
      <div className='div-form'>
        <JsonForms
          schema={schema}
          uischema={uischema}
          data={data}
          renderers={renderers}
          cells={materialCells}
          onChange={({ errors, data }) => {
            setData(data)
            setErrors(errors)
          }}
          ajv={handleDefaultsAjv}
        />
      </div>
    </Fragment>
  )
}

export default App
