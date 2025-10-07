importScripts('brainfree.js'); // keep parser & brainfuck runner functions

let pendingInputResolve = null;
let tape, p, pc, codeStr, jumpStack, jumps;

onmessage = async function(e) {
    if(e.data.type === "run") {
        codeStr = brainFreeToBF(parseCells(e.data.code));
        tape = Array(30000).fill(0);
        p = 0;
        pc = 0;
        jumps = {};
        jumpStack = [];

        // Precompute jumps
        for(let i=0;i<codeStr.length;i++){
            if(codeStr[i]==='[') jumpStack.push(i);
            else if(codeStr[i]===']'){ let j=jumpStack.pop(); jumps[i]=j; jumps[j]=i; }
        }

        let output = "";
        while(pc < codeStr.length){
            let ch = codeStr[pc];
            if(ch==='>') p++;
            else if(ch==='<') p--;
            else if(ch==='+') tape[p]=(tape[p]+1)%256;
            else if(ch==='-') tape[p]=(tape[p]-1+256)%256;
            else if(ch==='.'){ output+=String.fromCharCode(tape[p]); }
            else if(ch===','){
                // pause and request input
                const inp = await new Promise(resolve => {
                    pendingInputResolve = resolve;
                    postMessage({type:"needInput"});
                });
                tape[p] = inp.charCodeAt(0);
            }
            else if(ch==='[' && tape[p]===0) pc=jumps[pc];
            else if(ch===']' && tape[p]!==0) pc=jumps[pc];
            pc++;
        }
        postMessage({type:"done", output});
    } else if(e.data.type === "input") {
        if(pendingInputResolve) pendingInputResolve(e.data.value);
    }
};
