import React, { useState } from 'react'
import { Button } from "react-bootstrap";


function GaussJordan() {

  const [size, setsize] = useState('')
  const [matrix, setmatrix] = useState('')
  let sizeinput;
  const submit = e =>{
    sizeinput =e.target.value;
    setsize(sizeinput)
    genarate(sizeinput)
  }

  function genarate(sizeinput){
    let array = []
      for(let i=0 ; i<sizeinput ; i++){
        array[i] = [] //render jsx arr
        let temp = [] 
        for(let j=0 ; j<=sizeinput ; j++){ 
          temp.push(
          <input
          id={"column"+i+"row"+j}
          />
          )  
        }
        array[i].push(<div class='matrix a'>{temp}</div>)
        
      }

      setmatrix({a:array})
  }


  const cal = e =>{
    let calmatrix = []

    //setmatrix a&b
    for(let i=0 ; i<size ; i++){
      calmatrix[i] = []
      for(let j=0 ; j<=size ; j++){
        calmatrix[i].push(Number(document.getElementById('column'+i+'row'+j).value)) 
      }
    }
    //console.log(calmatrix)

    //Forward Elimination
    for(let i=0 ; i<=size ; i++){
      for(let j=i+1 ; j<size ; j++){
        let soltemp = calmatrix[j][i]/calmatrix[i][i]
        console.log(soltemp)
        for(let k=0 ; k<=size ; k++){
          let tem = (soltemp*calmatrix[i][k])
          calmatrix[j][k] -= tem
        }
      }
      console.log(calmatrix)
    }
    // console.log(calmatrix)


   for (let i = 0; i < size; i++) {
          let pivotValue = calmatrix[i][i];
          console.log(pivotValue);
     for (let j = 0; j <= size; j++) {
        calmatrix[i][j] = calmatrix[i][j]/pivotValue;
      }
    }
    // console.log(calmatrix)

//size = 3
    for(let i=size-1 ; i>=0; i--){
        for(let j=i-1 ; j>=0 ; j--){
          let anstemp = calmatrix[j][i]/calmatrix[i][i]
          console.log("",anstemp)
          for(let k=0 ; k<calmatrix[i].length ; k++){
            let tem = (anstemp*calmatrix[i][k])
            calmatrix[j][k] -= tem
          }
        }
      }

      let arrans = []
    arrans[size] = calmatrix[size-1][size]/calmatrix[size-1][size-1]

    for(let i=size-1 ; i>=1 ; i--){
      arrans[i] = calmatrix[i-1][size]
      for(let j=i+1 ; j<=size ; j++){
        let tempind = calmatrix[i-1][j-1]*arrans[j]
        console.log(tempind)
        arrans[i] -= tempind
        console.log(arrans)
      }
      arrans[i] = arrans[i]/calmatrix[i-1][i-1]
    }
    // console.log(calmatrix)
    console.log(arrans)
 
    //output on page
    let ans = []
    
    for(let i=0 ; i<calmatrix.length ; i++){
      ans.push(<div>x{i}={calmatrix[i][calmatrix[i].length-1].toFixed(6)}</div>)
    }
    setmatrix({a:matrix.a,b:ans})
  }

  return (
    <div className='gaussjordan'>
      <h1>Gauss-Jordan</h1>
      <form>
        <label for="size">Enter size is here {'->'}</label>
        <input 
        name="size" 
        type="size" 
        onChange={submit}/><br/><br/>
        
      </form><br/><br/>
      <div className='matrix f'>
        <div className='a'>      
        {
          matrix.a
        }
        </div>
      </div><br/><br/>
      <Button  variant="dark" onClick={cal}>Cal</Button><br/><br/>
      <div style={{fontWeight:"bold",fontSize:"25px"}}>
        {
          matrix.b
        }
      </div>
    </div>
  )
}

export default GaussJordan