import { create, all } from "mathjs";
import React, { useState } from "react";
import { Button } from "react-bootstrap";

function Sample() {
  const [size, setSize] = useState(0);
  let size2;
  const [matrix, setmatrix] = useState("");
  const config = {};
  const math = create(all, config);

  const submit = (event) => {
    // e.preventDefault()
    console.log(event.target.value);
    size2 = event.target.value;
    setSize(size2);
    console.log(size2);
    genarate(size2);
  };

  const cal = () => {
    console.log("size", size);
    // e.preventDefault()
    let calmatrix = [];
    let tempb = [];

    //setmatrix a&b ใส่ค่าลงmatrix
    for (let i = 0; i < size; i++) {
      calmatrix[i] = []; //ค่าทีละแถว
      tempb.push(Number(document.getElementById("rowb" + i).value));
      console.log(Number(document.getElementById("rowb" + i).value)); //ค่าB
      for (let j = 0; j < size; j++) {
        calmatrix[i].push(
          Number(document.getElementById("row" + i + "column" + j).value)
        );
        console.log(calmatrix[i]); //ใส่ค่าทีละแถว
      }
      console.log(calmatrix[i]);
    }
    console.log(calmatrix);

    //calculator
    let detref = math.det(calmatrix);

    let det = [];
    let temparr = calmatrix.map((a) => a.slice()); //line of deep clone array คืนค่ากลับ
    //.map like for loop
    //slice delete value in array return array after delete

    console.log(calmatrix);
    for (let i = 0; i < size; i++) {
      console.log(temparr);
      console.log(calmatrix);
      calmatrix = temparr.map((a) => a.slice()); //ทำให้เมทริกปกติคืนค่า จากบรรทัด55
      console.log(calmatrix); //เอาค่า B มาแทนทีละrowเอาไปคำนวน
      for (let j = 0; j < size; j++) {
        calmatrix[j][i] = tempb[j]; //ค่าB
        console.log(calmatrix[j][i]);
        console.log(calmatrix); //แถวเปลี่ยน
      }
      console.log(calmatrix); //แถวเปลี่ยนเอามาคิด
      det[i] = math.det(calmatrix) / detref; //คำนวนก่อน
      console.log(det[i]); //คำตอบ
    }
    console.log(math.det(calmatrix));

    //output on page
    let tempans = []; //คำตอบ
    for (let i = 0; i < det.length; i++) {
      tempans.push(
        <div>
          X{i + 1} = {det[i].toFixed(2)}
        </div>
      );
    }

    setmatrix({ a: matrix.a, b: matrix.b, c: tempans });
  };

  //create input value matrix
  function genarate(size2) {
    let array = []; //array for create input feilds matrixa
    let arrayb = []; //array for create input feilds matrixb
    let tempb = []; //template input feild for matrix b

    for (let i = 0; i < size2; i++) {
      array[i] = []; //render jsx arr
      tempb.push(
        <div>
          <input id={"rowb" + i} />
        </div>
      );
      console.log(tempb);
      console.log(array);
      let temp = []; //template input feild for matrix a
      for (let j = 0; j < size2; j++) {
        let id = "row" + i + "column" + j; //ค่าแต่ละแถว 3ค่า
        console.log(id);
        temp.push(<input id={id} />);
        console.log(temp);
      }
      array[i].push(<div>{temp}</div>);
      console.log("array i", array[i]);
    }

    arrayb.push(tempb);
    console.log(arrayb);

    //setmatrix hook
    setmatrix({ a: array, b: arrayb });
  }

  return (
    <div className="cramerrule">
      <h1>CramerRule</h1>
      <form>
        <label style={{ marginRight: "10px" }} for="size">
          Enter size is here{" "}
        </label>
        <input name="size" type="text" onChange={submit} />
        <br />
        <br />
        {/* <Button variant="dark" onClick={submit}>
          create
        </Button> */}
        <br />
        <br />
      </form>
      <br />
      <br />
      <div class="matrixf">
        <div class="matrixa" style={{ marginRight: "20px" }}>
          {matrix.a}
        </div>
        <div class="matrixb">{matrix.b}</div>
      </div>
      {console.log(size)}
      <br />
      <Button variant="dark" onClick={cal}>
        Cal
      </Button>
      <br />
      <br />
      <div style={{ fontWeight: "bold", fontSize: "25px" }}>{matrix.c}</div>
    </div>
  );
}

export default Sample;