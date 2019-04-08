import * as React from 'react'
import '../dropdown.css'

interface IDropdownProps {
  options: string[]
  value?: string
  placeholder?: string
  onChange: (selectedValue: string) => void
  show?: boolean
}

interface IDropdownState {
  open: boolean
}

export class Dropdown extends React.Component<IDropdownProps, IDropdownState> {
  private container: React.RefObject<HTMLUListElement> = React.createRef()
  static defaultProps = {
    show: false
  }
  constructor(props: IDropdownProps) {
    super(props)
    this.state = { open: this.props.show || false }
  }

  componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, true)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, true)
  }

  render() {
    const { value, placeholder, options } = this.props
    const { open } = this.state
    return (
      <div className="dropdown">
        <button className="dropdown-toggler" onClick={this.onOpenDropdown}>
          {value || placeholder}
        </button>
        {open && (
          <ul className="dropdown-menu" ref={this.container}>
            {options.map((opt: string, index: number) => (
              <li
                key={index}
                className="dropdown-menu-item"
                onClick={e => this.handleChange(opt)}
              >
                {opt}
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }

  handleChange = (selectedValue: string) => {
    this.setState({ open: false })
    if (this.props.onChange) {
      this.props.onChange(selectedValue)
    }
  }

  onOpenDropdown = () => {
    this.setState({ open: !this.state.open })
  }

  handleClick = (e: MouseEvent) => {
    if (this.container.current && e.target !== null) {
      if (!this.container.current.contains(e.target as Node)) {
        this.handleClickOutside()
      }
    }
  }

  handleClickOutside = () => {
    this.setState({ open: false })
  }
}
