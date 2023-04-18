import React, { useState } from 'react'
import ApexCharts from 'apexcharts'
import { Button, Container, Table } from "react-bootstrap";
import { evaluate } from 'mathjs'
import axios from 'axios'
import {Onepoint} from "./calonepoint"

function OnePointIteration() {

  //input string function
  const [func, setfunc] = useState('')
  const [x1, setx1] = useState('')
  const [html, setHtml] = useState()
  //let ans 
   const [ans,setans]=useState(0)
  let ansx = []
  let anser = []
  let data =[]
  let round =[]

  const hangover =() =>{
    axios.get("http://localhost:3005/onepoint").then((answer)=>{ 
      
      let rannum = parseInt(Math.floor(Math.random()*answer.data.length))%answer.data.length
      console.log(answer.data[rannum]);
    //  console.log(answer.data[rannum]); //awser=object
    //   setall(answer.data)
        setfunc(answer.data[rannum].Fxx) //ใส่ค่าที่ขอไป
         setx1(answer.data[rannum].X1)
    //   setxr(answer.data[rannum].Xr)
    })
 }


  const print = () =>{
    return(
        <Container>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Iteration</th>
                        <th>x1</th>
                        <th>Er</th>        
                    </tr>
                </thead>
                <tbody>
                    {data.map((element)=>{
                        console.log(element)
                        return  (
                        <tr >
                            <td>{element.iteration+1}</td>
                            <td>{element.X1}</td>                            
                            <td>{element.Er}</td>                           
                        </tr>)
                    })}
                </tbody>
            </Table>
        </Container>
    );
  }
  const submit = () => {

    let X = parseFloat(x1);
    const {ansernew,datanew,ansxnew,ansnew} = Onepoint(func,X)
    anser=ansernew
    data=datanew
    ansx=ansxnew
    setans(ansnew)
    console.log(anser);
    console.log(data);
    console.log(ansx);
    console.log(ans);
    
//Onepoint(func,X)

    //MATH Graph
    var options = {
      series: [{
        name: "X1",
        data: ansx
    },
    {
      name: "Error",
      data: anser
  }
  ],
      chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    title: {
      text: 'X (Graph)',
      align: 'left'
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      },
    },
    xaxis: {
      categories: round
    }
    };
    setHtml(print())
    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render()
  }

  // function Onepoint(Func,X){
  //   let Err = 0.00001
  //   let Er = 100.0
  //   let xnew = 0
  //   let i=0
  //   let obj={}

  //  do{

  //     let scope = {x:X}
  //     console.log(Func)
  //     let fxx =  evaluate(Func,scope) 
  //     console.log(fxx);
  //     xnew = fxx

  //     Er = Math.abs((xnew-X)/xnew)*100.0
  //     anser.push(Er.toPrecision(6))
  //     X=xnew
  //     ansx.push(X.toPrecision(6))
      
  //     obj = {
  //       iteration:i,
  //       X1:X,
  //       Er:Er,
  //     }
  //     i++

  //     round.push(i)
  //     data.push(obj);
      
  //   }while(Er>Err)
    
  //   console.log(ansx)
  //   setans(X)
  // }

  return (
    <div className='onepointiteration'>
      <h1>One-Point Iteration Method</h1>
      <form>
        <label for="function">Enter function is here {'->'}</label>
        <input 
        name="function" 
        type="function" 
        onChange={event => setfunc(event.target.value)} 
        value={func} /><br/><br/>


        <label for="x1">Enter x is here {'->'}</label>
        <input 
        name="x1" 
        type="x1" 
        onChange={event => setx1(event.target.value)} 
        value={x1} /><br/><br/>
        <Button variant="dark" onClick={hangover}>Random</Button><br></br><br></br>
        <Button variant="dark" onClick={submit}>submit</Button>
      </form><br/><br/>    
      <h2>Answer = {ans.toPrecision(7)}</h2>
      {html}
      <p id='chart'></p>
    </div>
  )
}

export default OnePointIteration