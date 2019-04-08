import React, { FunctionComponent, useRef, useState, useEffect } from 'react'
import '../dropdown.css'

interface IDropdownProps {
  options: string[]
  value?: string
  placeholder?: string
  onChange: (selectedValue: string) => void
  show?: boolean
}

export const Dropdown: FunctionComponent<IDropdownProps> = ({
  options,
  value,
  placeholder,
  onChange,
  show,
  ...rest
}) => {
  const container: React.RefObject<HTMLUListElement> = useRef(null)
  const [open, setOpen] = useState(show)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (container.current && e.target !== null) {
        if (!container.current.contains(e.target as Node)) {
          setOpen(false)
        }
      }
    }

    document.addEventListener('mousedown', handleClick, true)

    return () => {
      document.removeEventListener('mousedown', handleClick, true)
    }
  }, [])

  const handleChange = (selectedValue: string) => {
    setOpen(false)
    onChange(selectedValue)
  }

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
