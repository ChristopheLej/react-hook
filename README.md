A sample project react hook (in typescript) to detect click events outside an element.

Many thanks at _Pitipat Srichairat_ for his [article](https://medium.com/@pitipatdop/little-neat-trick-to-capture-click-outside-with-react-hook-ba77c37c7e82).

Ths project contains 3 same dropdown element with a different implementation:

- **_DropdownNoneHooks_**: dropdown normal extends React.Component with state, ...
- **_DropdownWithHooks_**: dropdown with hook in the FunctionComponent and all hooks are integrated in the code
- **_DropdownWithCallback_**: dropdown with hook in the FunctionComponent but a generic hook (useClickOutside) is external of the function for reusing
