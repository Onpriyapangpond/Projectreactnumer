import React,{ useState } from 'react'
import ApexCharts from 'apexcharts'
import { Button, Container, Table } from "react-bootstrap";
import { evaluate } from 'mathjs'

function Secant() {
  
  //input string function
  const [func, setfunc] = useState('x^2-7')
  const [x0, setx0] = useState('2')
  const [x1, setx1] = useState('3')
  const [html, setHtml] = useState()
  const [ans, setans] = useState(0)
  const anser = [] //Arary eror
  const ansx1 = [] //Array x1
  const ansx =[] //Array xold
  const round = []
  const data =[]

  const print = () =>{
    return(
        <Container>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Iteration</th>
                        <th>xold</th> 
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
                            <td>{element.Xold}</td>     
                            <td>{element.X1}</td>                            
                            <td>{element.Er}</td>                           
                        </tr> )
                    })} 
                </tbody>
            </Table>
        </Container>
    );
  }

  const submit = () => {

    let xx0 = parseFloat(x0);
    let xx1 = parseFloat(x1);
    Seca(func,xx0,xx1)
    
    //MATH Graph
    var options = {
      series: [{
        name: "Value",
        data: anser
    },
    {
      name: "Xold",
      data: ansx
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
  
  function Seca(Func,X0,X1){
    let Er = 100.0
    let Err = 0.00001
    let xnew = 0
    let i=0
    let obj ={}

    
    do{
     ansx.push(X0.toFixed(7))
    let scope = {x:X0}
    let fxx0 = evaluate(Func,scope)
      
    let scope1 = {x:X1}
    let fxx1 = evaluate(Func,scope1)
      

      xnew = X0-((fxx0*(X0-X1))/(fxx0-fxx1))
      Er = Math.abs((xnew-X1)/xnew)*100.0
      X0=X1
      X1=xnew
      ansx1.push(X1)
      anser.push(Er)

      obj = {
        iteration:i,
        Xold:X0,
        X1:xnew,
        Er:Er,
        
      }
      i++
      round.push(i)
      data.push(obj);
      
    }while(Er>Err)

    console.log("error",anser)
    console.log(typeof(ans))
    setans(X1)
  }
  
  return (
    <div className='secant'>
      <h1>Secant Method</h1>
      <form>
        <label for="function">Enter function is here {'->'}</label>
        <input 
        name="function" 
        type="function" 
        onChange={event => setfunc(event.target.value)} 
        value={func} /><br/><br/>

        
        <label for="x0">Enter x0 is here {'->'}</label>
        <input 
        name="x0" 
        type="number"
        onChange={event => setx0(event.target.value)} 
        value={x0} /><br/><br/>
        
        <label for="x1">Enter x1 is here {'->'}</label>
        <input 
        type="number"
        name="x1" 
        onChange={event => setx1(event.target.value)} 
        value={x1} /><br/><br/>

      <Button variant="dark" onClick={submit}>submit</Button>
      </form><br/><br/>    
      <h2>Answer = {ans.toFixed(7)}</h2>
      {html}
      <p id='chart'></p>
    </div>
  )
}

export default Secant