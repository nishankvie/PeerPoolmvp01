/**
 * Card Component
 * 
 * Flexible container component with consistent styling.
 * Supports hover effects and click interactions.
 * 
 * Props:
 * - padding: none, sm, md, lg
 * - hover: boolean for hover effect
 * - onClick: optional click handler
 */
import { forwardRef } from 'react'

const paddings = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

const Card = forwardRef(({
  children,
  className = '',
  padding = 'md',
  hover = false,
  onClick,
  as: Component = 'div',
  ...props
}, ref) => {
  const baseClasses = `
    bg-white rounded-md border border-gray-100 shadow-sm
    ${hover ? 'hover:shadow-md hover:border-gray-200 transition-all duration-200 cursor-pointer' : ''}
    ${onClick ? 'cursor-pointer' : ''}
  `
  
  return (
    <Component
      ref={ref}
      className={`${baseClasses} ${paddings[padding]} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      {...props}
    >
      {children}
    </Component>
  )
})

Card.displayName = 'Card'

// Card Header subcomponent
export const CardHeader = ({ children, className = '' }) => (
  <div className={`mb-4 ${className}`}>
    {children}
  </div>
)

// Card Body subcomponent
export const CardBody = ({ children, className = '' }) => (
  <div className={className}>
    {children}
  </div>
)

// Card Footer subcomponent
export const CardFooter = ({ children, className = '' }) => (
  <div className={`mt-4 pt-4 border-t border-gray-100 ${className}`}>
    {children}
  </div>
)

export default Card


