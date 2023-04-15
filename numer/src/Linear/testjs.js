import React, {useState} from 'react'
import { Button } from "react-bootstrap";
import { pow ,inv,multiply} from "mathjs";
import Plot from 'react-plotly.js';

function Testjs (){

    let size =0
    let result=0
    const [anser ,setanser] = useState()
    const [matrix, setmatrix] = useState('')
    

    const submit = e =>{
        size = e.target.value
        genarate(size)
    }
    
   console.log(typeof size);

   function genarate(sizeinput){
    let array = [] 
    let arrayb = []     
    let x=[]
        x.push(
            <div>
            <label for="size">Enter x is here {"->"}</label>
            <input id="x"/>
            </div>
            
        );

    for(let i=0 ; i<sizeinput ; i++){
  
        array.push(
            <div >
            <input
            id={"rowa"+i} 
            />
            </div>
        )
        

        arrayb.push(
            <div >
            <input
            id={"rowb"+i} 
            />
            </div>
        )

        
        // array[i].push(<div>{temp}</div>)
     
    }
   
    // arrayb.push(tempb)
    setmatrix({a:array,b:arrayb,c:x})
   }
   const cal = (e) => {
    e.preventDefault();
    let tempb = [];
    let tempa = [];
   let tempx

    //setmatrix a&b&x
    //seterror

    tempx = Number(document.getElementById("x").value);
    size = Number(document.getElementById("size").value);
    console.log(typeof size)
    console.log(size);
    for (let i = 0; i < size; i++) {

      tempa.push(Number(document.getElementById("rowa"+i).value));
      tempb.push(Number(document.getElementById("rowb"+i).value));
      
    }
   
    let sumx =[0,0]
    let sumy =[0,0]
    for (let i = 0; i < size; i++) {
        sumx[0] += tempa[i]
        sumx[1] += pow(tempa[i],2)
        sumy[0] += tempb[i]
        sumy[1] += tempa[i]*tempb[i]
       
    }
    console.log(sumx);
    console.log(sumy);

     let matttix =[[0,0],[0,0]]
     let matrixy =[0,0]
    for (let i = 0; i < 2; i++) {
        if(i=== 0){
          matttix[i][i]=size
        }
        for (let j = 0; j < i+1; j++) {
            if(i=== 0 ){
               continue
            }
            else{
                matttix[i][j]=sumx[j+i-1]
                 matttix[j][i]=sumx[j+i-1] 
            }
    }
   
  }
  matttix=inv(matttix)
  let ans = multiply(matttix,sumy)
  console.log(ans);

  
  for (let i = 0; i < ans.length; i++) {
    result+=ans[i]*pow(tempx,i)
  }

  let caly=[]
  for (let i = 0; i < tempb.length; i++) {
    let aa =0
    for (let j = 0; j < ans.length; j++) {
        aa+=ans[j]*pow(tempa[i],j)
    }
    caly.push(aa)
}
console.log(caly);

 console.log(result);
  console.log(matttix);

  var trace1 = {
    x: tempa,
    y: tempb,
    mode: 'markers',
    type: 'scatter'
  };
  
  var trace2 = {
    x: tempa,
    y: caly,
    mode: 'lines',
    type: 'scatter'
  };
  
  var trace3 = {
    x: [tempx],
    y: [result],
    mode: 'lines+markers',
    type: 'scatter',
    marker: { size: 15 }

  };
  
  var data = [trace1, trace2, trace3];


  setanser (
    <div>
        <Plot
        data={
            data
        }
        layout={ {width: 1000, height: 500, title: 'A Fancy Plot'} }
        />
    </div>
  )
  
}

    return(

            <div className='testjs'>

              <h1>Test</h1>
              <form>
                <label style={{marginRight:"10px"}} for="size">Enter size is here </label>
                <input id="size" name="size" type="size" onChange={submit}/><br/><br/>
              </form><br/><br/>
              <div class='matrixf' >
                <div class='matrixa' style={{marginRight:"20px"}}>
                {
                  matrix.a 
                }
                </div>
                <div class='matrixb' >
                {
                  matrix.b
                }
                </div>
            </div><br></br>
           
            <div >{matrix.c}</div><br></br>
            <Button variant="dark" onClick={cal}>
        Cal
      </Button>
      {anser}
      
            </div>
    )
            
}

export default Testjs



