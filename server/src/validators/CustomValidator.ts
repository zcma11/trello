import { registerDecorator, ValidationOptions } from 'class-validator'

export function IsSameValue(
  property: string,
  options?: ValidationOptions
): PropertyDecorator {
  return (target: object, propertyName: string) => {
    registerDecorator({
      propertyName,
      target: target.constructor,
      constraints: [property],
      options,
      validator: {
        validate(value, args) {
          return value === (args && (args?.object as any)[property])
        }
      }
    })
  }
}
