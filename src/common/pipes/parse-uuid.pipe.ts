import { ParseUUIDPipe } from '@nestjs/common'

export const parseUUidPipe = new ParseUUIDPipe({ version: '4' })
