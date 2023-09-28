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
    stringifyData(content),
    'application/json',
    `${filename.replace(/\W/g, '_')}.json`
  )
}

/**
 * Prompts the user to select a JSON file and returns a Promise that resolves
 * with the parsed JSON data.
 * @returns A Promise that resolves with the parsed JSON data.
 */
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

/**
 * Creates a deep copy of the provided object or array.
 * @param source The object or array to copy.
 * @returns A deep copy of the provided object or array.
 */
function deepCopy<T, U = T extends Array<infer V> ? V : never>(source: T): T {
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

/**
 * Returns a JSON string representation of the provided data object.
 * If the object is empty, returns an empty object string.
 * Modifies the original data object by flattening certain nested arrays.
 * @param data - The data object to stringify.
 * @returns A JSON string representation of the provided data object.
 */
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
