import React, {useState} from 'react'
import ApexCharts from 'apexcharts'
import { Button, Container, Table } from "react-bootstrap";
import { evaluate,derivative,factorial,string } from 'mathjs'
import axios from 'axios' //ตัวกลาง

function Taylor() {
  //input string function
  const [func, setfunc] = useState('')
  const [x, setx] = useState('')
  const [x0, setx0] = useState('')
  const [n, setn] = useState('')
  const [ans, setans] = useState(0)
  const [html, setHtml] = useState()
  const anser = []
  const anssum =[] //Array xold
  const round = []
  const data=[]
  
  
  const print = () =>{
    return(
        <Container>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Iteration</th>
                        <th>Fx</th> 
                        <th>Er</th>        
                    </tr>
                </thead>
                <tbody>
                    {data.map((element)=>{
                        console.log(element)
                        return  (
                        <tr >
                            <td>{element.iteration+1}</td>
                            <td>{element.Sum}</td>                             
                            <td>{element.Error}</td>                           
                        </tr> )
                    })} 
                </tbody>
            </Table>
        </Container>
    );
  }
  const hangover =() =>{
     axios.get("http://localhost:3005/j").then((answer)=>{  //ยิงไปที่port3005 path j ยิงๆไปapi method get
      console.log(answer.data); //awser=object
       setfunc(answer.data) //ใส่ค่าที่ขอไป
     })
  }



  const submit = () => {
    let X = parseFloat(x);
    let X0 = parseFloat(x0);
    let num = parseFloat(n);
    Taylorseries(func,X,X0,num)
    
   
  axios.post("http://localhost:3005/j",{Fxxx:func}) //รับฟังก์ชั่นไปเพิ่มในตาราง
    
    
    //MATH Graph
    var options = {
      series: [{
        name: "Fx",
        data: anssum
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
      text: 'Fx',
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

  function Taylorseries(func,X,X0,num){
        let sum=0
        let derfunc =""
        let scope = {x:X0}
        let obj ={}
        let scope1 = {x:X}
        let factEr = evaluate(func,scope1)
        for(let i=0;i<num;i++){
          if(i===0){
            sum = evaluate(func,scope)
            anssum.push(sum.toPrecision(5))
            derfunc = string(derivative(func,'x'))
            console.log(sum);
            console.log(derfunc);

            obj = {
              iteration:i,
              Sum:sum,
              Error: factEr
            }
            data.push(obj)
            anser.push(factEr.toPrecision(5))

          }else{
            console.log("derfunc",i,derfunc);
            if(derfunc !=='0'&& derfunc.search('Infinity')=== -1){
            sum = parseFloat(sum + Math.pow((X-X0),i)/(factorial(i)) * evaluate(derfunc,scope))
            anssum.push(sum.toPrecision(5))

            derfunc = string(derivative(derfunc,'x'))

            let Er = Math.abs(factEr-sum)*100.0
            anser.push(Er.toPrecision(5))
            console.log(Er);

            obj = {
              iteration:i,
              Sum:sum,
              Error:Er
            }
            data.push(obj)
            
            console.log(derfunc);
            console.log(sum);
            console.log(i);
            if(Er < 0.00001){
              break
            }
            }
            else{
             break;
            }
         }
         
       }
    setans(sum)
  }


  return (
    <div className='Taylor'>
      <h1>Taylor Method</h1>
      <form>
        <label >Enter function is here {'->'}</label>
        <input 
        name="function" 
        type="function" 
        onChange={event => setfunc(event.target.value)} 
        value={func} /><br/><br/>

        <label >Enter x is here {'->'}</label>
        <input 
        name="x" 
        type="x" 
        onChange={event => setx(event.target.value)} 
        value={x} /><br/><br/>

        <label >Enter x0 is here {'->'}</label>
        <input 
        name="x0" 
        type="x0" 
        onChange={event => setx0(event.target.value)} 
        value={x0} /><br/><br/>

        <label >Enter n is here {'->'}</label>
        <input 
        name="n" 
        type="n" 
        onChange={event => setn(event.target.value)} 
        value={n} /><br/><br/>

        <Button variant="dark" onClick={hangover}>Random</Button><br></br><br></br>
       <Button variant="dark" onClick={submit}>submit</Button>
      </form><br/><br/>    
      <h2>Answer = {ans.toPrecision(7)}</h2>
      {html}
      <p id='chart'></p>
    </div>
  )
}

export default Taylor