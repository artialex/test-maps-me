import React from 'react'

interface ProvidersProps {
  components: Array<React.JSXElementConstructor<React.PropsWithChildren<any>>>
  children: React.ReactNode
}

export const Providers = (props: ProvidersProps) => {
  const { components = [], children } = props

  return (
    <>
      {components.reduceRight(
        (acc, Component) => (
          <Component>{acc}</Component>
        ),
        children
      )}
    </>
  )
}
