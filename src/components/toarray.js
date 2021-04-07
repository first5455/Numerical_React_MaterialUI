const toarray = (indata)=>{
    let output = []
    for(let i = 0; i< indata.length;i++){
        let temp = [];
        for(let j = 0 ;j< indata[0].length;j++){
            temp[j] = parseFloat(indata[i][j].value);
        }
        output[i]=temp;
    }
    return output;
}

export {toarray};