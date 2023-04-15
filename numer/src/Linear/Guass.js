import React,{ useState } from 'react'
import { Button } from "react-bootstrap";
import { multiply } from 'mathjs'

function GaussElimination() {
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
          console.log(temp)
        }
        array[i].push(<div class='matrix a'>{temp}</div>)
        
      }

      //setmatrix hook
      setmatrix({a:array})
  }

  const cal = e =>{
    e.preventDefault()
    let calmatrix = []
    let tmpa = []
    let tempb = []
    let calstep = []

    for(let i=0 ; i<size ; i++){
      calmatrix[i] = []
      tmpa[i] = []
      calstep[i] = []
      //setmatrixb แถวเปลี่ยน
      tempb.push((Number(document.getElementById('column'+i+'row'+size).value)))
      //setmatrixa เมททริก ปกติ
      for(let k=0 ; k<size ; k++){
        tmpa[i].push(Number(document.getElementById('column'+i+'row'+k).value))
        console.log("ค่าแต่ละแถว",tmpa[i])
      }
      //setmatrix a|b
      for(let j=0 ; j<=size ; j++){
        //    console.log(Number(document.getElementById('column'+j+'row'+j).value))
          calmatrix[i].push(Number(document.getElementById('column'+i+'row'+j).value))
          console.log("ค่าทั้งแถว + B",calmatrix[i])
      }
      console.log(calmatrix[i])
    }
    console.log(calmatrix)
    console.log(tmpa)

    let roundtri = 1
    let tempa = calmatrix.map(a=>a.slice()) //ค่าแต่ละแถวมทำให้เป็นปกติ
    //calculator

    //Forward Elimination
    for(let i=0 ; i<=size ; i++){
      for(let j=i+1 ; j<size ; j++){
        let temp = tempa[j][i]/tempa[i][i] 
        console.log(tempa[j][i] )
        console.log(tempa[i][i] )
        console.log("ตัวคูณ",temp)
        for(let k=0 ; k<=size ; k++){
          let sol = temp*tempa[i][k] //เอาตัวคุณ * แถว
          console.log("เอาตัวคูณ *แถว",sol)
          tempa[j][k] = tempa[j][k]-sol
          console.log("ลบกัน",tempa[j][k]) //หลังจากคูณแล้ว
        }
        console.log("ได้0แล้ว",tempa[j]) //หลังได้0


          calmatrix[i] = tempa //หลังจากคูณ แทนที่ตัวเก่า
          console.log(calmatrix);
          let tmpstep = []
          let temp2 =[]
          for(let a=0; a<size ; a++){
            tmpstep=[]
            calmatrix[i][a].map((item)=>{
              tmpstep.push(<input value={item} />)
            })
            temp2.push(<div>{tmpstep}</div>)
          }
          calstep[i].push(<div className={"step"}>Step {roundtri++}{temp2} </div>)
          console.log(calstep[i])// stepแรก
      }
    }
  
    console.log(tempa);
    let arrans = []
    arrans[size] = tempa[size-1][size]/tempa[size-1][size-1]
    console.log("ค่าx3",arrans[size]);

    

    //หา x2 x1
    for(let i=size-1 ; i>=1 ; i--){
      arrans[i] = tempa[i-1][size]
      console.log("ค่า B",arrans[i]);
      for(let j=i+1 ; j<=size ; j++){
        let tempind = tempa[i-1][j-1]*arrans[j]
        console.log("แทน X ก่อนหน้า",tempind)

        arrans[i] = arrans[i]-tempind
        console.log("ย้ายฝั่งเหลือ X 1ตัว ",arrans[i]);
        
      }
      arrans[i] = arrans[i]/tempa[i-1][i-1]
      console.log("X:",i,arrans[i]);
    }
    console.log(calmatrix)
    console.log(arrans)

    let ind = 0
    let listans = [] //ค่า X
    for(let i=1 ; i<=size ; i++){
      listans[ind] = arrans[i].toFixed(2)
      ind++
    }
    

    
    console.log(listans) //ค่าX
    console.log(tmpa) //aray
    let checkans = multiply(tmpa, listans)
    console.log(checkans)

    //output on page
    let ans = []
    for(let i=1 ; i<arrans.length ; i++){
      ans.push(<div >X{i} = {arrans[i].toFixed(2)}</div>)
      console.log(ans);
    }
    setmatrix({a:matrix.a,b:ans,c:calmatrix,d:calstep,e:checkans})
  }

  return (
    <div className='gausselimination'>
      <h1>GaussElimination</h1>
      <form>
        <label for="size">Enter size is here {'->'}</label>
        <input 
        name="size" 
        type="size" 
        onChange={submit} /><br/><br/>
      </form><br/><br/>
      <div className='matrix f'>
        <div className='a' >      
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
      </div><br/><br/>
      <div className='matrix f'>
        {
          matrix.d
        }<br/><br/>
        <div className='matrix e'>
          {( matrix.e === undefined ) ? null : "RESULT OF CHECKANSWER :" +matrix.e + " "}
        </div>
        <br/>
      </div>
    </div>
  )
}

export default GaussElimination