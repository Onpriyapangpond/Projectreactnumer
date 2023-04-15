import {Onepoint} from "./calonepoint"
 
test("testfun", () => {
    let cal = Onepoint("1/4+x/2",0);
    expect(cal.ansnew).toBe(0.4999999701976776);
  });