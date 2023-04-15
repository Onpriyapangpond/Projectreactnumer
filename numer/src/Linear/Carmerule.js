import React, {useState} from 'react'
import { Button } from "react-bootstrap"
import {det,multiply} from 'mathjs';

function CramerRule() {
  const [size, setsize] = useState('')
  const [matrix, setmatrix] = useState('')
  let sizeinput;

  const submit = e =>{
    sizeinput =e.target.value;
    setsize(sizeinput)
    genarate(sizeinput)
  }
   //create input value matrix
   function genarate(sizeinput){
    let array = [] //array for create input feilds matrixa
    let arrayb = [] //array for create input feilds matrixb       
    let tempb = [] //template input feild for matrix b

    for(let i=0 ; i<sizeinput ; i++){
      array[i] = [] //render jsx arr
      tempb.push(
        <div >
          <input
        id={"rowb"+i} 
        />
        </div>
      )
      console.log(tempb)
      console.log(array);
      let temp = [] //ค่าmatrixA
      for(let j=0 ; j<sizeinput; j++){
        let id = "row"+i+"column"+j//ค่าแต่ละแถว 3ค่า
        console.log(id)
       temp.push(<input id={id}/>)   
        console.log(temp)
      }
      array[i].push(<div>{temp}</div>)
      console.log("array i",array[i])
    }
    
    arrayb.push(tempb)
    console.log(arrayb)
      
    //setmatrix hook
    setmatrix({a:array,b:arrayb})
   }

  const cal = () =>{
    let calmatrix = []
    let tempb = []

    //setmatrix a&b ใส่ค่าลงmatrix
    for(let i=0 ; i<size ; i++){
      calmatrix[i] = [] //ค่าทีละแถว
      tempb.push(Number(document.getElementById('rowb'+i).value))
      console.log(Number(document.getElementById('rowb'+i).value)) //ค่าB
      for(let j=0 ; j<size ; j++){
        calmatrix[i].push(Number(document.getElementById('row'+i+'column'+j).value))
        console.log(calmatrix[i]) //ใส่ค่าทีละแถว 
      }
      console.log(calmatrix[i])
    }console.log(calmatrix)


    //calculator
    let detref = det(calmatrix)

    let deti = []
    let temparr = calmatrix.map(a=>a.slice()) // array คืนค่ากลับ

   
    console.log(calmatrix)
    for(let i=0 ; i<size ; i++){
      console.log(temparr)
      console.log(calmatrix)
      calmatrix = temparr.map(a=>a.slice())  //ทำให้เมทริกปกติคืนค่า จากบรรทัด55
      console.log(calmatrix) //เอาค่า B มาแทนทีละrowเอาไปคำนวน
      for(let j=0 ; j<size ; j++){
        calmatrix[j][i] = tempb[j] //ค่าB
        console.log(calmatrix[j][i])
        console.log(calmatrix) //แถวเปลี่ยน
      }
      console.log(calmatrix) //แถวเปลี่ยนเอามาคิด
      deti[i] = det(calmatrix)/detref //คำนวนก่อน
      console.log("คำตอบ:",deti[i]) //คำตอบ
    }
    // console.log(deti(calmatrix))


    //output on page
    let tempans = [] //คำตอบ
    for(let i=0 ; i<deti.length ; i++){
      tempans.push(<div>X{i+1} = {deti[i].toFixed(2)}</div>)
    }

      
    console.log(deti)
    console.log(temparr)
    let checkans = multiply(temparr, deti)
    console.log(checkans)

    setmatrix({a:matrix.a,b:matrix.b,c:tempans,e:checkans})
  }

  return (
    <div className='cramerrule'>
      <h1>CramerRule</h1>
      <form>
        <label style={{marginRight:"10px"}} for="size">Enter size is here </label>
        <input name="size" type="size" onChange={submit}/><br/><br/>
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
      </div><br/>
      <Button  variant="dark" onClick={cal}>Cal</Button><br/><br/>
      <div style={{fontWeight:"bold",fontSize:"25px"}} >
        {
          matrix.c
        }
      </div>
      <div className='matrix e'>
          {( matrix.e === undefined ) ? null : "RESULT OF CHECKANSWER :" +matrix.e + " "}
        </div>
    </div>
  )
}

export default CramerRule
