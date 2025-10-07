importScripts('brainfree.js'); // import shared code

onmessage = function(e){
    const code = e.data;
    const bf = brainFreeToBF(parseCells(code));
    const output = runBrainfuck(bf);
    postMessage(output);
};
