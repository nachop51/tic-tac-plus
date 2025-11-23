import { HeroUIProvider, type HeroUIProviderProps } from '@heroui/react'

interface ProvidersProps {
  children: React.ReactNode
}

const heroUIConfig: Omit<HeroUIProviderProps, 'children'> = {
  labelPlacement: 'outside',
}

export default function Providers({ children }: ProvidersProps) {
  return <HeroUIProvider {...heroUIConfig}>{children}</HeroUIProvider>
}
