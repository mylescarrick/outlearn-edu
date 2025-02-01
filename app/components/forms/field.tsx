// Source: https://github.com/edmundhung/conform/edit/main/examples/shadcn-ui/src/components/Field.tsx

import { cn } from '~/lib/utils'

export const Field = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return <div className={cn('flex flex-col gap-2', className)}>{children}</div>
}

export const FieldError = ({ children }: { children: React.ReactNode }) => {
  return <div className="text-destructive text-xs">{children}</div>
}
