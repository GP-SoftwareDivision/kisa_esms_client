import { useState } from 'react'
import {
  NativeSelectField,
  NativeSelectRoot,
} from '@/components/ui/native-select.tsx'

export const useLogicalSelect = () => {
  const [logicalValue, setLogicalVale] = useState<string>('')

  const RenderLogicalSelect = () => (
    <NativeSelectRoot size='xs' variant='plain' width='auto' me='-1'>
      <NativeSelectField
        defaultValue='&&'
        fontSize='sm'
        value={logicalValue}
        onChange={(e) => setLogicalVale(e.currentTarget.value)}
      >
        <option value='&&'>AND</option>
        <option value='!'>NOT</option>
      </NativeSelectField>
    </NativeSelectRoot>
  )
  return { RenderLogicalSelect, logicalValue }
}
