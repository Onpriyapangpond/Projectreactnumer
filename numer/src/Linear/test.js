import React, { useState } from "react";
import { create, all } from "mathjs";
import ApexCharts from "apexcharts";
import { Button } from "react-bootstrap";

function ConjugateGradient() {
  const [size, setsize] = useState("");
  const [matrix, setmatrix] = useState("");
  const config = {};
  const math = create(all, config);
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
    var matrixR = math.subtract(math.multiply(calmatrix, arrx), tempb);
    var matrixD = math.subtract(0, matrixR);
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
        math.multiply(math.subtract(0, math.transpose(matrixD)), matrixR) /
        math.multiply(math.transpose(matrixD),math.multiply(calmatrix, matrixD)
        );

      arrx = math.add(arrx, math.multiply(ramda, matrixD));
      let arr_x = arrx.map((num) => num.toFixed(6));//
      console.log("llll", arr_x);

      matrixR = math.subtract(math.multiply(calmatrix, arrx), tempb);
      let matrix_R = matrixR.map((num) => num.toFixed(6));//

      ER = math.sqrt(math.multiply(math.transpose(matrixR), matrixR));

      let alpha =
        math.multiply(
          math.transpose(matrixR),
          math.multiply(calmatrix, matrixD)
        ) /
        math.multiply(
          math.transpose(matrixD),
          math.multiply(calmatrix, matrixD)
        );
      matrixD = math.add(
        math.subtract(0, matrixR),
        math.multiply(alpha, matrixD)
      );
      let matrix_D = matrixD.map((num) => num.toFixed(6));//
      console.log("alpha", alpha);
      //console.log(matrixD)

      ansarr.push(
        <div className="Iterationi">
          <p className="head">Iteration{i}</p>
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
    }
    console.log(round.length);
    setmatrix({
      a: matrix.a,
      b: matrix.b,
      c: matrix.c,
      d: matrix.d,
      e: ansarr,
    });

    // //MATH Graph
    // var options = {
    //   series: [
    //     {
    //       name: "Value",
    //       data: arrx,
    //     },
    //   ],
    //   chart: {
    //     height: 350,
    //     type: "line",
    //     zoom: {
    //       enabled: false,
    //     },
    //   },
    //   dataLabels: {
    //     enabled: true,
    //   },
    //   stroke: {
    //     curve: "straight",
    //   },
    //   title: {
    //     text: "Value/Variable (Graph)",
    //     align: "left",
    //   },
    //   grid: {
    //     row: {
    //       colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
    //       opacity: 0.5,
    //     },
    //   },
    //   xaxis: {
    //     categories: round,
    //   },
    // };

    // //MATH Graph
    // var options2 = {
    //   series: [
    //     {
    //       name: "Value",
    //       data: round,
    //     },
    //   ],
    //   chart: {
    //     height: 350,
    //     type: "line",
    //     zoom: {
    //       enabled: false,
    //     },
    //   },
    //   dataLabels: {
    //     enabled: true,
    //   },
    //   stroke: {
    //     curve: "straight",
    //   },
    //   title: {
    //     text: "Variable/Value (Graph)",
    //     align: "left",
    //   },
    //   grid: {
    //     row: {
    //       colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
    //       opacity: 0.5,
    //     },
    //   },
    //   xaxis: {
    //     categories: arrx,
    //   },
    // };

    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();

    // var chart2 = new ApexCharts(document.querySelector("#chart2"), options2);
    // chart2.render();
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
      {/* <p id="chart"></p> */}
      {/* <p id="chart2"></p> */}
    </div>

    
  );
}

export default ConjugateGradient;