// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts


import { contextBridge, ipcRenderer } from 'electron';



contextBridge.exposeInMainWorld('api', {
    send: (channel: string, data: any) => {
        // whitelist channels
        let validChannels = ['terminal.keystroke'];
        if (validChannels.includes(channel)) {
            ipcRenderer.send(channel, data);
        }
    }
});

ipcRenderer.on("terminal.incomingData", (event, data) => {
    console.log("incoming data");
    console.log(data);
    window.postMessage(data, "*");
}

);

