import { evaluate } from 'mathjs'

export function Onepoint(Func,X){
    let Err = 0.00001
    let Er = 100.0
    let xnew = 0
    let i=0
    let obj={}
    let anser = []
    let ansx =[]
    let round=[]
    let data=[]
    let ans=0

   do{

      let scope = {x:X}
      console.log(Func)
      let fxx =  evaluate(Func,scope) 
      console.log(fxx);
      xnew = fxx

      Er = Math.abs((xnew-X)/xnew)*100.0
      anser.push(Er.toPrecision(6))
      X=xnew
      ansx.push(X.toPrecision(6))
      
      obj = {
        iteration:i,
        X1:X,
        Er:Er,
      }
      i++

      round.push(i)
      data.push(obj);
      
    }while(Er>Err)
    
    console.log(ansx)
    
    ans=X
    console.log(ans);
    console.log(anser);

    return {ansnew:ans,ansernew:anser,ansxnew:ansx,datanew:data}
}
 