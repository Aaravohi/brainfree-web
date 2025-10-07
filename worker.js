importScripts('brainfree.js');

let inputQueue = [];

onmessage = async function(e){
    const msg = e.data;

    if(msg.type === 'run'){
        const code = msg.code;
        const bf = brainFreeToBF(parseCells(code));
        const output = await runBrainfuckAsync(bf);
        postMessage({type:'output', data: output});
    } else if(msg.type === 'input'){
        // receive input from main thread
        inputQueue.push(msg.data);
    }
};

// Async version of runBrainfuck to wait for input
function runBrainfuckAsync(code){
    return new Promise(resolve => {
        let tape = Array(30000).fill(0), p=0, pc=0, out='';
        let stack=[], jump={};
        for(let i=0;i<code.length;i++){
            if(code[i]==='[') stack.push(i);
            else if(code[i]===']'){ let j=stack.pop(); jump[i]=j; jump[j]=i; }
        }

        async function step(){
            while(pc < code.length){
                let ch = code[pc];
                if(ch==='>') p++;
                else if(ch==='<') p--;
                else if(ch==='+') tape[p]=(tape[p]+1)%256;
                else if(ch==='-') tape[p]=(tape[p]-1+256)%256;
                else if(ch==='.'){ out+=String.fromCharCode(tape[p]); }
                else if(ch===','){
                    if(inputQueue.length === 0){
                        // ask main thread for input
                        postMessage({type:'needInput'});
                        return setTimeout(step, 50);
                    } else {
                        tape[p] = inputQueue.shift().charCodeAt(0);
                    }
                } else if(ch==='[' && tape[p]===0) pc=jump[pc];
                else if(ch===']' && tape[p]!==0) pc=jump[pc];
                pc++;
            }
            resolve(out);
        }

        step();
    });
}
