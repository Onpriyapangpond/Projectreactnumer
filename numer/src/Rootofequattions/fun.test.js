import {Onepoint} from "./calonepoint"
import { Seca } from "./calsecant";
 
test("testfun", () => {
    let cal = Onepoint("1/4+x/2",0);
    expect(cal.ansnew).toBe(0.4999999701976776);
  });


  test("testfun", () => {
    let cal = Seca("x^2-7",2,3);
    expect(cal.x1new).toBe( 2.6457513110645245);
  }); 

