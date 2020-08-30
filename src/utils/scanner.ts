import { Connection, KeyType } from '@/types'
import { runCommand } from './fetcher'

export async function scan(
  connection: Connection,
  match: string,
  cursor: string,
  keyType: KeyType | undefined,
): Promise<{
  next: string
  keys: { key: string; type: KeyType }[]
}> {
  const [next, keys] = await runCommand<[string, string[]]>(connection, [
    'scan',
    cursor,
    'match',
    match,
  ])
  const types = await Promise.all(
    keys.map((key) => runCommand<KeyType>(connection, ['type', key])),
  )
  return {
    next,
    keys: keys
      .map((key, index) => ({
        key,
        type: types[index],
      }))
      .filter(({ type }) => !keyType || type === keyType),
  }
}

export async function sscan(
  connection: Connection,
  key: string,
  match: string,
  cursor: string,
): Promise<{
  next: string
  keys: string[]
}> {
  const [next, keys] = await runCommand<[string, string[]]>(connection, [
    'sscan',
    key,
    cursor,
    'match',
    match,
  ])
  return {
    next,
    keys,
  }
}