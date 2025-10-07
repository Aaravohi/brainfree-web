// ---------------- BrainFree Parser ----------------
function parseCells(code){
    let tokens = [], i=0;
    while(i<code.length){
        if(code[i]==='{'){
            let depth=1,j=i+1;
            while(j<code.length && depth>0){
                if(code[j]==='{') depth++;
                else if(code[j]==='}') depth--;
                j++;
            }
            tokens.push({type:'loop',body:parseCells(code.slice(i+1,j-1))});
            i=j;
        } else if(code[i]==='['){
            let j=i+1;
            while(j<code.length && code[j]!==']') j++;
            let parts = code.slice(i+1,j).split(':');
            tokens.push({type:'cell',cell:parts[0]?.trim()||'',value:parts[1]?.trim()||'',func:parts[2]?.trim()||''});
            i=j+1;
        } else { i++; }
    }
    return tokens;
}

// ---------------- BrainFree -> Brainf*** ----------------
function brainFreeToBF(tokens){
    let bf='';
    for(let tok of tokens){
        if(tok.type==='cell'){
            let m = tok.cell.match(/cell([+-]?\d+)?/);
            if(m && m[1]) bf += (parseInt(m[1])>0 ? '>'.repeat(parseInt(m[1])) : '<'.repeat(-parseInt(m[1])));
            let v = tok.value.match(/([+-]?\d+)?/);
            if(v && v[1]) bf += (parseInt(v[1])>0 ? '+'.repeat(parseInt(v[1])) : '-'.repeat(-parseInt(v[1])));
            if(tok.func==='out') bf += '.';
            else if(tok.func==='in') bf += ',';
        } else if(tok.type==='loop') bf += '[' + brainFreeToBF(tok.body) + ']';
    }
    return bf;
}

// ---------------- Run Brainf*** ----------------
function runBrainfuck(code){
    let tape = Array(30000).fill(0), p=0, pc=0, out='';
    let stack=[], jump={};
    for(let i=0;i<code.length;i++){
        if(code[i]==='[') stack.push(i);
        else if(code[i]===']'){ let j=stack.pop(); jump[i]=j; jump[j]=i; }
    }
    while(pc<code.length){
        let ch = code[pc];
        if(ch==='>') p++;
        else if(ch==='<') p--;
        else if(ch==='+') tape[p]=(tape[p]+1)%256;
        else if(ch==='-') tape[p]=(tape[p]-1+256)%256;
        else if(ch==='.'){ out+=String.fromCharCode(tape[p]); }
        else if(ch===','){ let inp=prompt("Input a char:"); tape[p]=inp?inp.charCodeAt(0):0; }
        else if(ch==='[' && tape[p]===0) pc=jump[pc];
        else if(ch===']' && tape[p]!==0) pc=jump[pc];
        pc++;
    }
    return out;
}
