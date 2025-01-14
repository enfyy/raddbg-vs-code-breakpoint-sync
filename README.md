# Breakpoint Sync of Vs Code => The Rad Debugger
Uses the --ipc command line interface of raddbg and sends a "toggle_breakpoint" command whenever a breakpoint is set/removed in VS Code.

- Enable/Disable it with the `Raddbg: Toggle Breakpoint Sync` command.

![showcase](gif.gif)

## Usage
- The RAD debugger needs to be running for this to work
- Make sure to enable the extension by using the "Raddbg: Toggle Breakpoint Sync" command 

## Install
- Download the .vsix from the release section
- go to the extensions tab in vs code
- press the button with the three dots
- select "Install from VSIX..." and pick the downloaded file.
