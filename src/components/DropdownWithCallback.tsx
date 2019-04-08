import React, { FunctionComponent, useRef, useState, useEffect } from 'react'
import '../dropdown.css'

interface IDropdownProps {
  options: string[]
  value?: string
  placeholder?: string
  onChange: (selectedValue: string) => void
  show?: boolean
}

export const useClickOutside = (callback: EventListener) => {
  const container: React.RefObject<any> = useRef(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (container.current && e.target !== null) {
        if (!container.current.contains(e.target as Node)) {
          callback(e)
        }
      }
    }

    document.addEventListener('mousedown', handleClick, false)

    return () => {
      document.removeEventListener('mousedown', handleClick, false)
    }
  }, [])

  return container
}

export const Dropdown: FunctionComponent<IDropdownProps> = ({
  options,
  value,
  placeholder,
  onChange,
  show,
  ...rest
}) => {
  const [open, setOpen] = useState(show)
  const container = useClickOutside(() => setOpen(false))

  const handleChange = (selectedValue: string) => {
    setOpen(false)
    onChange(selectedValue)
  }

  console.log('DropdownWithCallback - render')
  return (
    <div className="dropdown">
      <button className="dropdown-toggler" onClick={e => setOpen(!open)}>
        {value || placeholder}
      </button>
      {open && (
        <ul className="dropdown-menu" ref={container}>
          {options.map((opt: string, index: number) => (
            <li
              key={index}
              className="dropdown-menu-item"
              onClick={e => handleChange(opt)}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

Dropdown.defaultProps = {
  show: false
}

export default Dropdown
