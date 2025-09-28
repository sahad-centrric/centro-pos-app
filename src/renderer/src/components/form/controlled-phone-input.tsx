'use client'

import 'react-phone-number-input/style.css'

import { FormControl, FormDescription, FormField, FormItem, FormLabel } from '../ui/form'
import type { Control } from 'react-hook-form'

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { cn } from '@renderer/lib/utils'

type ControlledPhoneInputProps = {
  name: string
  control: Control<any, any>
  label?: string
  rtl?: boolean
  description?: string
  // defaultCountry?: string;
  required?: boolean
}

const ControlledPhoneInput = ({
  name,
  control,
  label,
  description,
  required,
  rtl
  // defaultCountry = "AE",
}: ControlledPhoneInputProps) => {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const errorMsg = error ? String(error?.message) : undefined

        return (
          <FormItem>
            {label && (
              <FormLabel>
                {label}
                {required && <span className="text-destructive ml-1">*</span>}
              </FormLabel>
            )}
            <FormControl>
              <div className="relative ">
                <PhoneInput
                  {...field}
                  country={'ae'}
                  enableSearch
                  specialLabel=""
                  inputStyle={{
                    fontFamily: 'var(--default-font-family)'
                  }}
                  inputClass={cn(
                    '!border-none !bg-transparent !text-lg !w-full ',
                    rtl ? '!pl-3 ' : ''
                  )}
                  containerClass={cn(
                    'text-inherit flex w-full border border-input   bg-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 ease-in-out h-12 md:h-14 px-2 py-3  rounded-lg border-black/20 hover:bg-accent/50 hover:border-slate-400 focus-visible:bg-accent/30 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 active:bg-accent/70 active:scale-[0.98] data-[error=true]:border-destructive data-[error=true]:bg-destructive/5 data-[error=true]:hover:border-destructive/70 data-[error=true]:focus-visible:border-destructive data-[error=true]:focus-visible:ring-destructive/20',
                    // size === "lg" ? "h- px-4 py-3 text-base" : "",
                    error
                      ? 'border-destructive focus:border-destructive focus:ring-destructive'
                      : ''
                  )}
                  buttonClass=" !bg-transparent !p-0 !m-0 !border-none "
                />
              </div>
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            {errorMsg && <p className="text-destructive text-xs mt-1">{errorMsg}</p>}
          </FormItem>
        )
      }}
    />
  )
}

export { ControlledPhoneInput }
