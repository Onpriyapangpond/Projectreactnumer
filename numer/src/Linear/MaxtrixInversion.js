import React, { useState } from 'react'
import { Button } from "react-bootstrap";


function MaxtrixInversion() {

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


  const cal = () =>{
    let calmatrix = []
    let arrayi=[]
    for(let i=0 ; i<size ; i++){
      arrayi[i]=[]
      for(let j=0 ; j<size ; j++){
        if(i===j){
          arrayi[i].push(1)
        }
        else{
          arrayi[i].push(0)
        }
      }
      }
      console.log(arrayi);
    

    //setmatrix a&b
    let tempb =[]
    for(let i=0 ; i<size ; i++){
      calmatrix[i] = []
      for(let j=0 ; j<size ; j++){
        calmatrix[i].push(Number(document.getElementById('column'+i+'row'+j).value)) 
      }
      for(let k=0 ; k<size ; k++){
        if(i===k){
          calmatrix[i].push(1)
        }
        else{
          calmatrix[i].push(0)
        }
  
      }
      tempb.push(Number(document.getElementById('column'+i+'row'+size).value)) 
      
    }
    console.log(tempb);

    console.log(calmatrix.length);
    console.log(calmatrix)

    //Forward Elimination
    for(let i=0 ; i<size ; i++){
      for(let j=i+1 ; j < size; j++){
        let soltemp = calmatrix[j][i]/calmatrix[i][i]
        console.log(soltemp)
        for(let k=0 ; k<calmatrix[i].length  ; k++){
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
     for (let j = 0; j <calmatrix[i].length; j++) {
        calmatrix[i][j] = calmatrix[i][j]/pivotValue;
      }
    }
//     // console.log(calmatrix)
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
    
  console.log(calmatrix)
    let arryinver=[]
    let inver=[]
    console.log(calmatrix.length);
    for(let i=0 ; i < size; i++){
        arryinver[i]=[]

      for(let j= size ; j < calmatrix[i].length; j++){
        arryinver[i].push(calmatrix[i][j].toFixed(6))
      }
      // inver[i].push(arryinver[i])
  
    }

  // console.log(inver);
   let anser =[]
    for(let i=0 ; i < size; i++){
        let innn=[]
        // console.log(arryinver[i][j]);
        arryinver[i].map((item)=>{
          innn.push(<input value={item}/>)
      })
      anser.push(<div>{innn}</div>)
    
  }

    console.log(calmatrix)
    console.log(arryinver);

    let arrans=[]
    //Backward Subsitution
    for(let i=0 ; i < size ; i++){
      let sumarr =0
      console.log(tempb[i]);
      for(let j=0 ; j< size ; j++){
        console.log(arryinver[i]);
        sumarr += arryinver[i][j]*tempb[j]
        console.log(sumarr)
      }
      arrans.push(<div>x{i}={sumarr.toFixed(3)}</div>)
      // arrans.push(sumarr.toFixed(3))
    }
    console.log(arrans);

    setmatrix({a:matrix.a,b:arrans,i:anser})
  }

  return (
    <div className='gaussjordan'>
      <h1> MaxtrixInversion Method</h1>
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
      <div >
        
        Metrix Invers
        {
          matrix.i
        }
      </div><br/>
      <div style={{fontWeight:"bold",fontSize:"25px"}}>
        {
          matrix.b
        }
      </div>
    </div>
  )
}

export default  MaxtrixInversion