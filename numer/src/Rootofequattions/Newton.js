import React, {useState} from 'react'
import ApexCharts from 'apexcharts'
import { Button, Container, Table } from "react-bootstrap";
import { evaluate,derivative } from 'mathjs'

function NewtonRaphson() {
  //input string function
  const [func, setfunc] = useState('x^2-7')
  const [x1, setx1] = useState('2')
  const [ans, setans] = useState(0)
  const [html, setHtml] = useState()
  const anser = []
  const ansx1 = [] //Array x1
  const ansx =[] //Array xold
  const round = []
  const data=[]
  
  
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
    let X = parseFloat(x1);
    Newtonrap(func,X)
    
    //MATH Graph
    var options = {
      series: [{
        name: "Error",
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

  function Newtonrap(Func,X){
  
    let Err = 0.00001
    let Er = 100.0
    let xnew = 0
    let i=0
    let obj ={}

    do{
 
      ansx.push(X.toFixed(7))
      console.log("Xold ", X)
      

      let scope = {x:X}
      let fxx = evaluate(Func,scope)
      console.log("fx",fxx)

      let Dx = derivative(func,'x').evaluate({x: X})
      console.log("F'x ",Dx)

      xnew = X-(fxx/Dx)
      Er = Math.abs((xnew-X)/xnew)*100.0
      anser.push(Er.toFixed(6))
      ansx1.push(xnew.toFixed(7))
      

      obj = {
        iteration:i,
        Xold:X,
        X1:xnew,
        Er:Er.toPrecision(7),
        
      }
      i++
      round.push(i)
      data.push(obj);

      X=xnew       
      console.log("X1 :",xnew)    

    }while(Er>Err)
    
  
   console.log("Xold :",ansx)
   console.log("error",anser)
   setans(X)
   console.log(typeof(ans))
  }


  return (
    <div className='newtonraphson'>
      <h1>Newton-Raphson Method</h1>
      <form>
        <label >Enter function is here {'->'}</label>
        <input 
        name="function" 
        type="function" 
        data-testid="Equation"
        onChange={event => setfunc(event.target.value)} 
        value={func} /><br/><br/>

        <label >Enter x is here {'->'}</label>
        <input 
        name="x1" 
        type="x1" 
        data-testid="X1"
        onChange={event => setx1(event.target.value)} 
        value={x1} /><br/><br/>

       <Button variant="dark"    data-testid="btn" onClick={submit}>submit</Button>
      </form><br/><br/>    
      <h2    data-testid="ans">Answer = {ans.toFixed(7)}</h2>
      {html}
      <p id='chart'></p>
    </div>
  )
}

export default NewtonRaphson