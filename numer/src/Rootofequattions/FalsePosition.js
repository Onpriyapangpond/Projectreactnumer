import React, { useState } from 'react'
import { Button, Container, Table } from "react-bootstrap";
import { evaluate } from 'mathjs'
import ApexCharts from 'apexcharts'

function FalsePosition() {
  //input string function
  const [html, setHtml] = useState()
  const [func, setfunc] = useState('2x-1')
  const [xl, setxl] = useState('0')
  const [xr, setxr] = useState('10')
  const [ans, setans] = useState(0) //answerfinal
  const anser = [] //Array error
  const ansx1 = [] //Array x1
  const ansxl = [] //Array xl
  const ansxr = [] //Array xr
  const round = []
  const data = []
  

  const print = () =>{
    return(
        <Container>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Iteration</th>
                        <th>XL</th>
                        <th>XR</th>
                        <th>x1</th> 
                        <th>Error</th>        
                    </tr>
                </thead>
                <tbody>
                    {data.map((element,index)=>{
                         if(index<100){
                          console.log(element)
                        return  (
                        <tr >
                            <td>{element.iteration}</td>
                            <td>{element.Xl}</td>                           
                            <td>{element.Xr}</td>
                            <td>{element.X1}</td>
                            <td>{element.Er}</td>
                        </tr>)
                         }
                    })}
                </tbody>
            </Table>
        </Container>
    );
  }
  const submit = () => {
    let L = parseFloat(xl);
    let R = parseFloat(xr);
    falsep(func,L,R)

    //MATH Graph
    var options = {
      series: [{
        name: "Error",
        data: anser
    },
    {
      name: "Xl",
      data: ansxl
    },
    {
      name: "Xr",
      data: ansxr
    },
    {
      name: "X1",
      data: ansx1
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
      text: 'Graph',
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
 

  function falsep(Func,Xl,Xr){
    let Err = 0.00001
    let Er = 100.0 //กำหนด Er ครั้งแรก
    let xnew = 0
    let i=1
    let obj={}
    let scope2 = {x:Xl}
    let fxl =  evaluate(Func,scope2)
    let scope = {x:Xr}
    let fxr =  evaluate(Func,scope)
    let x1 = ((Xl*fxr)-(Xr*fxl))/(fxr-fxl);
    obj = {
      iteration:i,
      Xl:Xl,
      Xr:Xr,
      X1:x1,
      
  }
  i++
  data.push(obj);
  
  
    do{
      xnew = x1
      let scope3 = {x:x1}
      let fx1 = evaluate(Func,scope3)
      
      if((fxr*fx1)<0){
        Xl=x1
      }
      else{ 
        Xr=x1 
      }
      ansxl.push(Xl)
      ansxr.push(Xr)

      scope = {x:Xr}
      fxr =  evaluate(Func,scope) 

      scope2 = {x:Xl}
      fxl =   evaluate(Func,scope2)

      x1 = ((Xl*fxr)-(Xr*fxl))/(fxr-fxl);
      ansx1.push(x1.toFixed(6))

      Er = Math.abs((x1-xnew)/x1)*100.0
      anser.push(Er.toFixed(6))
      console.log(anser)
      round.push(i)

      obj = {
        iteration:i,
        Xl:Xl,
        Xr:Xr,
        X1:x1,
        Er:Er,
      }
      i++
      
      data.push(obj);
    
    }while(Er>Err)
    
    console.log(data);
    setans(x1)
    console.log(typeof(ans))

  }

  return (
    <div className='falseposition'>
      <h1>FalsePosition Method</h1>
      <form>
        <label for="function">Enter function is here {'->'}</label>
        <input name="function" type="function" data-testid="Equation" onChange={event => setfunc(event.target.value)} value={func} /><br/><br/>

        <label for="xl">Enter xl is here {'->'}</label>
        <input name="xl" type="xl" data-testid="xl" onChange={event => setxl(event.target.value)} value={xl} /><br/><br/>

        <label for="xr">Enter xr is here {'->'}</label>
        <input name="xr" type="xr" data-testid="xr" onChange={event => setxr(event.target.value)} value={xr} /><br/><br/>
        <Button variant="dark" data-testid="btn" onClick={submit}>submit</Button>
      </form><br/><br/>
      <h2 data-testid="ans">Answer = {ans.toFixed(7)}</h2>
      {html}
      <p id='chart'></p>
    </div>
  )
}

export default FalsePosition