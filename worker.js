importScripts('brainfree.js');

onmessage = function(e){
    const code = e.data;
    const bf = brainFreeToBF(parseCells(code));
    const output = runBrainfuck(bf);
    postMessage(output);
};
