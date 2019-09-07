// @flow
import { promises } from 'fs'
import { basename, extname, resolve } from 'path'

import type { Stats } from 'fs'

import type { AcceptedFile } from '../components/Drop-zone'

export const recursiveGetFiles = async (path: string) => {
  const isFile = (await promises.stat(path)).isFile()
  if (isFile) return [path]

  const directoryFiles: string[] = await promises.readdir(path)
  const files = await Promise.all(
    directoryFiles.map(async (file) => {
      const resolvedFilePath = resolve(path, file)
      return (await promises.stat(resolvedFilePath)).isDirectory()
        ? recursiveGetFiles(resolvedFilePath)
        : resolvedFilePath
    })
  )

  return files
}

export const getFileDetails = async (path: string) => {
  const {
    size,
    mtimeMs,
    mtime,
    birthtimeMs,
    birthtime,
    ino
  }: Stats = await promises.stat(path)

  return {
    name: basename(path),
    path,
    type: extname(path),
    size,
    lastModifiedMS: mtimeMs,
    lastModifiedDate: mtime,
    createdMS: birthtimeMs,
    createdDate: birthtime,
    indexNode: ino
  }
}
