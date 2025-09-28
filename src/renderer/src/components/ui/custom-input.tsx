import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@renderer/lib/utils'

const inputVariants = cva(
  'flex w-full border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 ease-in-out',
  {
    variants: {
      variant: {
        default:
          'rounded-lg border-black/20 hover:bg-accent/50 hover:border-slate-400 focus-visible:bg-accent/30 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 active:bg-accent/70 active:scale-[0.98] data-[error=true]:border-destructive data-[error=true]:bg-destructive/5 data-[error=true]:hover:border-destructive/70 data-[error=true]:focus-visible:border-destructive data-[error=true]:focus-visible:ring-destructive/20',
        ghost:
          'border-transparent bg-transparent rounded-lg hover:bg-accent hover:text-accent-foreground hover:shadow-sm focus-visible:bg-accent/50 focus-visible:ring-2 focus-visible:ring-primary/20 active:bg-accent/80 active:scale-[0.98] data-[error=true]:bg-destructive/5 data-[error=true]:hover:bg-destructive/10 data-[error=true]:focus-visible:bg-destructive/10 data-[error=true]:focus-visible:ring-destructive/20',
        outline:
          'border-2 border-border rounded-lg hover:border-primary/50 hover:bg-primary/5 hover:shadow-sm focus-visible:border-primary focus-visible:bg-primary/10 focus-visible:ring-2 focus-visible:ring-primary/20 active:bg-primary/15 active:scale-[0.98] data-[error=true]:border-destructive data-[error=true]:bg-destructive/5 data-[error=true]:hover:border-destructive/70 data-[error=true]:focus-visible:border-destructive data-[error=true]:focus-visible:ring-destructive/20',
        filled:
          'bg-muted border-transparent rounded-lg hover:bg-muted/80 hover:shadow-sm focus-visible:bg-background focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 active:bg-muted/60 active:scale-[0.98] data-[error=true]:bg-destructive/10 data-[error=true]:border-destructive data-[error=true]:hover:bg-destructive/15 data-[error=true]:focus-visible:border-destructive data-[error=true]:focus-visible:ring-destructive/20',
        underline:
          'border-0 border-b-2 border-border rounded-none bg-transparent px-0 hover:border-primary/60 hover:bg-primary/5 focus-visible:border-primary focus-visible:bg-primary/10 active:bg-primary/15 data-[error=true]:border-b-destructive data-[error=true]:hover:border-b-destructive/70 data-[error=true]:focus-visible:border-b-destructive'
      },
      size: {
        default: 'h-10 px-3 py-2',
        sm: 'h-8 px-2 py-1 text-xs',
        lg: 'h-12 px-4 py-3 text-base',
        xl: 'h-12 md:h-14 px-5 py-4 text-lg'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'xl'
    }
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  error?: boolean
  errorMessage?: string
  helperText?: string
  label?: string
  required?: boolean
}

const CustomInput = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      size,
      leftIcon,
      rightIcon,
      error = false,
      errorMessage,
      helperText,
      label,
      required = false,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id
    const hasError = error
    const displayErrorMessage = errorMessage

    const inputElement = (
      <input
        id={inputId}
        ref={ref}
        className={cn(
          inputVariants({ variant, size }),
          leftIcon && 'pl-10',
          rightIcon && 'pr-10',
          className
        )}
        data-error={hasError}
        aria-invalid={hasError}
        aria-describedby={
          displayErrorMessage ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
        }
        {...props}
      />
    )

    const content =
      leftIcon || rightIcon ? (
        <div className="relative h-fit group">
          {leftIcon && (
            <div
              className={cn(
                'absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-300',
                hasError
                  ? 'text-destructive'
                  : 'text-muted-foreground group-hover:text-foreground group-focus-within:text-primary'
              )}
            >
              {leftIcon}
            </div>
          )}
          {inputElement}
          {rightIcon && (
            <div
              className={cn(
                'absolute right-3 top-1/2 -translate-y-1/2 transition-colors duration-300',
                hasError
                  ? 'text-destructive'
                  : 'text-muted-foreground group-hover:text-foreground group-focus-within:text-primary'
              )}
            >
              {rightIcon}
            </div>
          )}

          
        </div>
      ) : (
        inputElement
      )

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
              hasError ? 'text-destructive' : 'text-foreground'
            )}
          >
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </label>
        )}
        {content}
        {displayErrorMessage && (
          <p
            id={`${inputId}-error`}
            className="text-sm text-destructive flex items-center gap-1"
            role="alert"
          >
            <svg
              className="h-4 w-4 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {displayErrorMessage}
          </p>
        )}
        {helperText && !displayErrorMessage && (
          <p id={`${inputId}-helper`} className="text-sm text-muted-foreground">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)
CustomInput.displayName = 'CustomInput'

export { CustomInput, inputVariants }
