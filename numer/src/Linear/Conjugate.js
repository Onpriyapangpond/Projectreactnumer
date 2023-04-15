import React, { useState } from "react";
import { subtract,transpose,multiply,add,sqrt} from "mathjs";
import { Button } from "react-bootstrap";

function ConjugateGradient() {
  const [size, setsize] = useState("");
  const [matrix, setmatrix] = useState("");
  let sizeinput;

  const submit = (e) => {
    sizeinput = e.target.value;
    setsize(sizeinput);
    genarate(sizeinput);
  };

  //create input value matrix
  function genarate() {
    let array = []; //array for create input feilds matrixa
    let arrayb = []; //array for create input feilds matrixb
    let tempb = []; //template input feild for matrix b
    let tempx = [];
    let arrayx = [];
    let er = [];

    er.push(
      <div>
        <label for="size">Enter Error is here {"->"}</label>
        <input id="ERROR" />
      </div>
    );

    for (let i = 0; i < sizeinput; i++) {
      array[i] = []; //render jsx arr
      tempb.push(
        <div>
          <input id={"rowb" + i} />
        </div>
      );
      tempx.push(
        <div>
          <input id={"x" + i} />
        </div>
      );

      let temp = []; //template input feild for matrix a
      for (let j = 0; j < sizeinput; j++) {
        let id = "column" + i + "row" + j;
        temp.push(<input id={id} />);
      }
      array[i].push(<div class="matrix a">{temp}</div>);
    }
    arrayx.push(<div class="matrix b">{tempx}</div>);
    arrayb.push(<div class="matrix b">{tempb}</div>);

    //setmatrix hook
    setmatrix({ a: array, b: arrayb, c: arrayx, d: er });
  }

  const cal = (e) => {
    e.preventDefault();
    let calmatrix = [];
    let tempb = [];
    let arrx = [];

    let temper;

    //setmatrix a&b&x
    //seterror

    temper = Number(document.getElementById("ERROR").value);
    for (let i = 0; i < size; i++) {
      calmatrix[i] = [];
      tempb.push(Number(document.getElementById("rowb" + i).value));
      arrx.push(Number(document.getElementById("x" + i).value));
      //console.log(Number(document.getElementById('rowb'+i).value))
      for (let j = 0; j < size; j++) {
        //console.log(Number(document.getElementById('column'+j+'row'+j).value))
        calmatrix[i].push(
          Number(document.getElementById("column" + i + "row" + j).value)
        );
      }
    }
    console.log(calmatrix);
    console.log(tempb);
    console.log(arrx);
    //console.log(temper)

    //calculator
    let ER = 100.0;
    let i = 0;
    let ansarr = [];
    let round = [];

    //iteration 0
    var matrixR = subtract(multiply(calmatrix, arrx), tempb);
    var matrixD = subtract(0, matrixR);
    ansarr.push(
      <div className="Iteration0">
        <p className="head">Iteration{i}</p>
        <div className="matrixR">
          R{i} = {matrixR + ""}
        </div>
        <div className="matrixD">
          D{i} = {matrixD + ""}
        </div><br></br>
      </div>
    );
    console.log("R0", matrixR);
    console.log("D0", matrixD);
    console.log(arrx);

    while (ER > temper) {
      i++;
      round.push(i);
      let ramda =
        multiply(subtract(0, transpose(matrixD)), matrixR) /
        multiply(transpose(matrixD),multiply(calmatrix, matrixD)
        );

      arrx = add(arrx, multiply(ramda, matrixD));
      let arr_x = arrx.map((num) => num.toFixed(6));//
      console.log("llll", arr_x);

      matrixR = subtract(multiply(calmatrix, arrx), tempb);
      let matrix_R = matrixR.map((num) => num.toFixed(6));//

      ER = sqrt(multiply(transpose(matrixR), matrixR));

      let alpha =
        multiply(transpose(matrixR),multiply(calmatrix, matrixD)
        ) /
        multiply(transpose(matrixD),multiply(calmatrix, matrixD)
        );

      matrixD = add(subtract(0, matrixR),multiply(alpha, matrixD));

      let matrix_D = matrixD.map((num) => num.toFixed(6));//
      console.log("alpha", alpha);
      //console.log(matrixD)

      ansarr.push(
        <div className="Iterationi">
          <p className="head" style={{ color: "red"}}>Iteration{i}</p>
          <div className="Ramda">Ramda={ramda.toFixed(6)}</div>
          <div className="matrixX">
            X{i} = {arr_x + ""}
          </div>
          <div className="matrixR">
            R{i} = {matrix_R + ""}
          </div>
          <div className="Error">Error = {ER.toFixed(6)} %</div>
          <div className="alpha">Alpha = {alpha.toFixed(6)}</div>
          <div className="matrixD">
            D{i} = {matrix_D + ""}
          </div><br></br>
        </div>
      );
      console.log(multiply(arr_x,calmatrix));
    }
    
    console.log(round.length);
    setmatrix({
      a: matrix.a,
      b: matrix.b,
      c: matrix.c,
      d: matrix.d,
      e: ansarr,
    });
  };

  return (

    <div className="conjugategradient">
      <form>
        <h1>Conjugate Gradient</h1>
        <label for="size">Enter size is here {"->"}</label>
        <input name="size" type="size" onChange={submit} />
        <br />
        <br />
      </form>
      <br />
      <br />
      {/* <div class='matrix f'>
        <div class='matrixw'>
        {
          matrix.a
        }
        </div>
        <div class='matrixw'>
        {
          matrix.c
        }
        </div>
        <div class='matrixw'>
        {
          matrix.b
        }
        </div>
      </div><br/> */}
      {matrix.a === undefined ? null : (
        <div class="matrixj ">
          <div class="matrixw" style={{ marginRight: "30px" }}>
            A{matrix.a}
          </div>
          <div class="matrixw">B{matrix.b}</div>
          <div class="matrixw" style={{ marginLeft: "30px" }}>
            x start
            {matrix.c}
          </div>
        </div>
      )}
      <div>{matrix.d}</div>
      <br />
      <Button variant="dark" onClick={cal}>
        Cal
      </Button>
      <br />
      <br />
      <div >{matrix.e}</div>
    </div>

    
  );
}

export default ConjugateGradient;