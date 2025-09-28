import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import { Label } from '../ui/label'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { cn } from '@renderer/lib/utils'

type Option = {
  label: string
  value: string
}

interface ControlledRadioProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  label?: string
  options: Option[]
  classes?: {
    group?: string
    item?: string
  }
  id?: string
}

export function ControlledRadio<T extends FieldValues>({
  control,
  name,
  label,
  options,
  classes,
  id
}: ControlledRadioProps<T>) {
  const { group, item } = classes || {}

  return (
    <div className="space-y-2 ">
      {label && <Label className="font-medium">{label}</Label>}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <RadioGroup
            onValueChange={field.onChange}
            value={field.value}
            className={cn('space-y-2 flex rtl-justify', group)}
          >
            {options.map((option) => (
              <div
                key={option.value}
                className={cn('flex items-center justify-end  space-x-2', item)}
              >
                <RadioGroupItem
                  className="w-6 h-6"
                  id={`${name}-${option.value}-${id}`}
                  value={option.value}
                />
                <Label htmlFor={`${name}-${option.value}-${id}`}>{option.label}</Label>
              </div>
            ))}
          </RadioGroup>
        )}
      />
    </div>
  )
}
