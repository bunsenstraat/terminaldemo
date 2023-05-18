import './index.css';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';
import { FitAddon } from 'xterm-addon-fit';

const term = new Terminal();
const fitAddon = new FitAddon();
term.loadAddon(fitAddon);
term.open(document.getElementById('terminal'));
fitAddon.fit();

window.addEventListener('message', (event) => {
    console.log("incoming data");
    console.log(event.data);
    term.write(event.data);
}
);

term.onData((data) => {
    (window as any).api.send("terminal.keystroke", data);
}
);


