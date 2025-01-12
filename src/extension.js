const vscode = require('vscode');

let raddbg_terminal = null;
let breakpointChangeListener = null;

function activate(context) {
  console.log("raddbg breakpoint sync extension activated")
  context.subscriptions.push(vscode.commands.registerCommand('raddbg-breakpoint-sync.syncBreakpoints', () => {
    if (breakpointChangeListener) {
      breakpointChangeListener.dispose();
      breakpointChangeListener = null;
    } else {
      breakpointChangeListener = vscode.debug.onDidChangeBreakpoints((event) => {
        event.added.forEach(onBreakpointChanged);
        event.removed.forEach(onBreakpointChanged);
      });
    }
  }));
}

function onBreakpointChanged(breakpoint) {
  if (breakpoint.location) {
    const fullpath = breakpoint.location.uri.fsPath;
    const lineNumber = breakpoint.location.range.start.line + 1;
    const toggle_command = `raddbg --ipc toggle_breakpoint ${fullpath}:${lineNumber}`;

    try {
      if (!raddbg_terminal) {
        raddbg_terminal = vscode.window.createTerminal({ name: "raddbg IPC", });
      }
      raddbg_terminal.sendText(toggle_command);
    } catch (error) {
      console.error("Make sure to have the newest version of raddbg in your %PATH:", error);
    }
  }
}

function deactivate() {
  if (raddbg_terminal) {
    raddbg_terminal.dispose();
  }
  if (breakpointChangeListener) {
    breakpointChangeListener.dispose();
  }
  console.log("raddbg breakpoint sync extension deactivated");
}

module.exports = {
  activate,
  deactivate,
};