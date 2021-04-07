import {React, useState} from 'react'
import ReactInputMatrix from 'react-input-matrix'
import {Button, TextField, Grid} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import {toarray} from "../toarray";
import Table from "../Table";
const math = require('mathjs')
const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    centerText: {
      textAlign: "center",
    },
    input: {
      color: "black",
    },
  });
const columns = [
    {
        field: "id",
        headerName: "Index",
        description: "ลำดับ",
        width: 100,
        sortable: false,
        headerAlign: "center",
      },
      {
        field: "ans",
        headerName: "X",
        description: "จำนวนรอบการวน",
        width: 100,
        sortable: false,
        headerAlign: "center",
      },
];
function Cramer() {
    const classes = useStyles();
    const [datainput, setDatainput] = useState([]);
    const [inputs,setInputs] = useState();
    const [ans,setAns] = useState([]);
    let bin =[];
    let field =[];
    const cramer_cal = ()=>{
        let arr = toarray(datainput);
        pushb()
        let A = math.matrix(arr);
        let B = math.matrix(bin);
        let X = [];
        for(let i =0;i<math.size(A)._data[0];i++){
            let changeA = math.clone(A);
            for(let j = 0 ;j < math.size(B)._data[0];j++){
                let temp =B.subset(math.index(j));
                changeA.subset(math.index(j,i),temp);
            }
            let solve = Math.round(math.det(changeA))/Math.round(math.det(A));
            X[i]={
                id: i+1,
                ans: solve,
            }
        }
        return X;
    }
    const pushb = () =>{
        for(let i =0; i<datainput[0].length;i++){
           bin.push(parseFloat(document.getElementById("B"+i).value)) 
        }
    }
    const controlInput = (event) =>{
        event.preventDefault();
        for(let i=0;i<datainput[0].length;i++){
            field[i]=(<Grid><TextField id={"B"+i} variant="outlined" label={"B"+i} InputProps={{ className: classes.input }}/></Grid>) 
        }
        setInputs(field);
    }
    const handle = (event)=>{
        setAns(cramer_cal());
    }
    return (
    <div>
        <ReactInputMatrix onMatrixChange={(data) => {
            setDatainput(data);
            }} />
        <Button variant="contained" onClick={controlInput} color="primary">Set Matrix B</Button>
        <Grid>{inputs}</Grid>
        <Button variant="contained" onClick={handle} color="primary">Cal</Button>
        <Table rows={ans} columns={columns}/>
    </div>
    );
}
export default Cramer;