import { materialCells, materialRenderers } from '@jsonforms/material-renderers'
import { JsonForms } from '@jsonforms/react'
import Button from '@mui/material/Button'
import { makeStyles } from '@mui/styles'
import { Fragment, useState } from 'react'
import './App.css'
import schema from './schema.json'

const useStyles = makeStyles({
  container: {
    padding: '1em',
    width: '100%'
  },
  title: {
    textAlign: 'center',
    padding: '0.25em'
  },
  dataContent: {
    display: 'flex',
    justifyContent: 'center',
    borderRadius: '0.25em',
    backgroundColor: '#cecece',
    marginBottom: '1rem'
  },
  resetButton: {
    margin: 'auto !important',
    display: 'block !important'
  },
  demoform: {
    margin: 'auto',
    padding: '1rem'
  }
})

const initialData = {
  rooms: [
    {
      seed: 42,
      width: 20,
      height: 20,
      durationSec: 20
    }
  ]
}

const renderers = [...materialRenderers]

const deepCopy = <T, U = T extends Array<infer V> ? V : never>(
  source: T
): T => {
  if (Array.isArray(source)) {
    return source.map(item => deepCopy(item)) as T & U[]
  }
  if (source instanceof Date) {
    return new Date(source.getTime()) as T & Date
  }
  if (source && typeof source === 'object') {
    return (Object.getOwnPropertyNames(source) as (keyof T)[]).reduce<T>(
      (o, prop) => {
        Object.defineProperty(
          o,
          prop,
          Object.getOwnPropertyDescriptor(source, prop)!
        )
        o[prop] = deepCopy(source[prop])
        return o
      },
      Object.create(Object.getPrototypeOf(source))
    )
  }
  return source
}

const stringifyData = (data: any) => {
  if (Object.keys(data).length === 0) {
    return '{ }'
  }
  const copyData: any = deepCopy(data)
  copyData.rooms.forEach((room: any) => {
    if (!room.path) {
      return
    }
    room.path = room.path.map((p: any) => [p.x, p.y]).flat()
  })
  copyData.rooms.forEach((room: any) => {
    if (!room.timepos) {
      return
    }
    room.timepos = room.timepos.map((p: any) => [p.time, p.position]).flat()
  })
  copyData.rooms.forEach((room: any) => {
    if (!room.occlusionStartStop) {
      return
    }
    room.occlusionStartStop = room.occlusionStartStop
      .map((p: any) => [p.start, p.stop])
      .flat()
  })

  return JSON.stringify(copyData, null, 2)
}

/** Utility function for downloading files in the browser */
function downloadTextFile (content: string, mimeType: string, filename: string) {
  const a = document.createElement('a')
  a.href = URL.createObjectURL(new Blob([content], { type: mimeType }))
  a.download = filename
  a.click()
  document.body.removeChild(a)
}

/**
 * Downloads a JSON file with the given name and content.
 *
 * @param content JSON content.
 * @param filename Download filename. Will be sanitized and .json appended.
 */
export function downloadJson (content: string, filename: string) {
  downloadTextFile(
    content,
    'application/json',
    `${filename.replace(/\W/g, '_')}.json`
  )
}

export function uploadJson (): Promise<any> {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = () => {
      if (input.files && input.files.length > 0) {
        const file = input.files[0]
        const reader = new FileReader()
        reader.onload = () => {
          try {
            const json = JSON.parse(reader.result as string)
            resolve(json)
          } catch (e) {
            reject(e)
          }
        }
        reader.readAsText(file)
      } else {
        reject('No file selected')
      }
    }
    input.click()
  })
}

const App = () => {
  const classes = useStyles()
  const [data, setData] = useState<any>(initialData)

  const clearData = () => {
    setData({})
  }

  return (
    <Fragment>
          <div className={classes.demoform}>
            <JsonForms
              schema={schema}
              data={data}
              renderers={renderers}
              cells={materialCells}
              onChange={({ errors, data }) => setData(data)}
            />
          </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: "80%", margin: "auto" }}>
            <Button onClick={clearData} color='primary' variant='contained'>
              Clear data
            </Button>
            <Button
              variant='contained'
              onClick={() =>
                downloadJson(stringifyData(data), 'roomConfig')
              }
            >
              Export JSON
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
          </div>
    </Fragment>
  )
}

export default App
