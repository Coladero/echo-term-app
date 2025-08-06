// components/ui/input.tsx

import * as React from 'react'
import { cn } from '../../lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        'flex h-10 w-full rounded-md border border-green-500 bg-black px-3 py-2 text-sm text-green-400 font-mono',
        'placeholder:text-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500',
        'disabled:cursor-not-allowed disabled:opacity-50 transition-colors',
        className
      )}
      {...props}
    />
  )
})

Input.displayName = 'Input'

export { Input }
