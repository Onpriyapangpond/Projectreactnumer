import React, { useState } from 'react'
import ApexCharts from 'apexcharts'
import { Button, Container, Table } from "react-bootstrap";
import { evaluate } from 'mathjs'
import axios from 'axios'

function Bisection() {
  //input string function
  const [html, setHtml] = useState()
  const [func, setfunc] = useState('')
  const [xl, setxl] = useState('')
  const [xr, setxr] = useState('')
  const [ans, setans] = useState(0) //answerfinal
  const anser = [] //Array error
  const ansx1 = [] //Array x1
  const round = [] //รอบ
  const data =[] 
  const [dataall ,setall]= useState([])
   const [token,setToken]=useState('')
   const [adminname,setAdminname]=useState('')


const hangover =() =>{
    axios.get("http://localhost:3005/bisection",{headers: { authorization: `b ${token}`}}).then((answer)=>{ 
      console.log(answer);
      let rannum = parseInt(Math.floor(Math.random()*answer.data.length))%answer.data.length
      console.log(answer.data[rannum]); //awser=object
      setall(answer.data)
      setfunc(answer.data[rannum].Fxx) //ใส่ค่าที่ขอไป
      setxl(answer.data[rannum].Xl)
      setxr(answer.data[rannum].Xr)
    })
}



 
const getToken =()=>{
  axios.get(`http://localhost:3005/gettoken`).then((res)=>{
      setToken(res.data)
      console.log("token "+res.data);
  })
}


  const print = () =>{
    return(
        <Container >
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Iteration</th>
                        <th>XL</th>
                        <th>XR</th>
                        <th>x1</th>        
                    </tr>
                </thead>
                <tbody>
                    {data.map((element)=>{
                        console.log(element)
                        return  (
                        <tr >
                            <td>{element.iteration}</td>
                            <td>{element.Xl}</td>                            
                            <td>{element.Xr}</td>                           
                            <td>{element.X1}</td>
                        </tr>)
                    })}
                </tbody>
            </Table>
        </Container>
    );
  
  }

  const submit = () => {
    let L = parseFloat(xl);
    let R = parseFloat(xr);
    Bisec(func,L,R)

    let find = false
   if(dataall.length>0){
    let allfun = dataall.map((func )=>{
      console.log(func);
      return func["Fxx"]
    })
    
    console.log(allfun);
    for(let i=0;i<allfun.length;i++){
      if(allfun[i]==func){
       find =true
      }
    }
   }
    
    if(find==false){
      axios.post("http://localhost:3005/bisection",{Fxxx:func,Xl:xl,Xr:xr})
      console.log("yyy");
    }
    
    
    //MATH Graph
    var options = {
      series: [{
        name: "Error",
        data: anser
    },
    {
      name: "X1",
      data:  ansx1
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
 

  function Bisec(Func,Xl,Xr){
    let Err = 0.00001
    let Er = 100.0 //กำหนด Er ครั้งแรก
    let xnew = 0
    let i=1
    let obj={}
    let x1 = (Xl+Xr)/2.0;
   
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
      let scope = {x:Xr}
      let fxr =  evaluate(Func,scope) 
      let scope2 = {x:x1}
      let fx1 =  evaluate(Func,scope2)
      

      if((fxr*fx1)<0){
        Xl=x1
      }
      else{ 
        Xr=x1 
      }
      x1 = (Xl+Xr)/2.0;
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
    <div className='Bisection'>
      <h1>Bisection Method</h1>
     
      <input type="button" value={"Tokenha"} onClick={getToken}/>
      <form>
        <br></br>
        <label for="function">Enter function is here {'->'}</label>
        <input name="function" type="function" onChange={event => setfunc(event.target.value)} value={func} /><br/><br/>

        <label for="xl">Enter xl is here {'->'}</label>
        <input name="xl" type="xl" onChange={event => setxl(event.target.value)} value={xl} /><br/><br/>

        <label for="xr">Enter xr is here {'->'}</label>
        <input name="xr" type="xr" onChange={event => setxr(event.target.value)} value={xr} /><br/><br/>
      

        <Button variant="dark" onClick={hangover}>Random</Button><br></br><br></br>
        <Button variant="dark" onClick={submit}>submit</Button>
      </form><br/><br/>
      <h2>Answer = {ans.toFixed(7)}</h2>
      {html}
      <p id='chart'></p>
    </div>
  )
}

export default Bisection



