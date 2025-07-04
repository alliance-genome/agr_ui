// Test file to trigger zen tools (>300 lines)
// This file contains Lorem Ipsum text to test the workflow

const testData = {
  lorem1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  lorem2: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  lorem3: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
  lorem4: "Nisi ut aliquip ex ea commodo consequat.",
  lorem5: "Duis aute irure dolor in reprehenderit in voluptate velit esse.",
  lorem6: "Cillum dolore eu fugiat nulla pariatur.",
  lorem7: "Excepteur sint occaecat cupidatat non proident.",
  lorem8: "Sunt in culpa qui officia deserunt mollit anim id est laborum.",
  lorem9: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  lorem10: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  lorem11: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
  lorem12: "Nisi ut aliquip ex ea commodo consequat.",
  lorem13: "Duis aute irure dolor in reprehenderit in voluptate velit esse.",
  lorem14: "Cillum dolore eu fugiat nulla pariatur.",
  lorem15: "Excepteur sint occaecat cupidatat non proident.",
  lorem16: "Sunt in culpa qui officia deserunt mollit anim id est laborum.",
  lorem17: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  lorem18: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  lorem19: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
  lorem20: "Nisi ut aliquip ex ea commodo consequat.",
  lorem21: "Duis aute irure dolor in reprehenderit in voluptate velit esse.",
  lorem22: "Cillum dolore eu fugiat nulla pariatur.",
  lorem23: "Excepteur sint occaecat cupidatat non proident.",
  lorem24: "Sunt in culpa qui officia deserunt mollit anim id est laborum.",
  lorem25: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  lorem26: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  lorem27: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
  lorem28: "Nisi ut aliquip ex ea commodo consequat.",
  lorem29: "Duis aute irure dolor in reprehenderit in voluptate velit esse.",
  lorem30: "Cillum dolore eu fugiat nulla pariatur.",
  lorem31: "Excepteur sint occaecat cupidatat non proident.",
  lorem32: "Sunt in culpa qui officia deserunt mollit anim id est laborum.",
  lorem33: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  lorem34: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  lorem35: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
  lorem36: "Nisi ut aliquip ex ea commodo consequat.",
  lorem37: "Duis aute irure dolor in reprehenderit in voluptate velit esse.",
  lorem38: "Cillum dolore eu fugiat nulla pariatur.",
  lorem39: "Excepteur sint occaecat cupidatat non proident.",
  lorem40: "Sunt in culpa qui officia deserunt mollit anim id est laborum.",
  lorem41: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  lorem42: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  lorem43: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
  lorem44: "Nisi ut aliquip ex ea commodo consequat.",
  lorem45: "Duis aute irure dolor in reprehenderit in voluptate velit esse.",
  lorem46: "Cillum dolore eu fugiat nulla pariatur.",
  lorem47: "Excepteur sint occaecat cupidatat non proident.",
  lorem48: "Sunt in culpa qui officia deserunt mollit anim id est laborum.",
  lorem49: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  lorem50: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  lorem51: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
  lorem52: "Nisi ut aliquip ex ea commodo consequat.",
  lorem53: "Duis aute irure dolor in reprehenderit in voluptate velit esse.",
  lorem54: "Cillum dolore eu fugiat nulla pariatur.",
  lorem55: "Excepteur sint occaecat cupidatat non proident.",
  lorem56: "Sunt in culpa qui officia deserunt mollit anim id est laborum.",
  lorem57: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  lorem58: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  lorem59: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
  lorem60: "Nisi ut aliquip ex ea commodo consequat.",
  lorem61: "Duis aute irure dolor in reprehenderit in voluptate velit esse.",
  lorem62: "Cillum dolore eu fugiat nulla pariatur.",
  lorem63: "Excepteur sint occaecat cupidatat non proident.",
  lorem64: "Sunt in culpa qui officia deserunt mollit anim id est laborum.",
  lorem65: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  lorem66: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  lorem67: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
  lorem68: "Nisi ut aliquip ex ea commodo consequat.",
  lorem69: "Duis aute irure dolor in reprehenderit in voluptate velit esse.",
  lorem70: "Cillum dolore eu fugiat nulla pariatur.",
  lorem71: "Excepteur sint occaecat cupidatat non proident.",
  lorem72: "Sunt in culpa qui officia deserunt mollit anim id est laborum.",
  lorem73: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  lorem74: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  lorem75: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
  lorem76: "Nisi ut aliquip ex ea commodo consequat.",
  lorem77: "Duis aute irure dolor in reprehenderit in voluptate velit esse.",
  lorem78: "Cillum dolore eu fugiat nulla pariatur.",
  lorem79: "Excepteur sint occaecat cupidatat non proident.",
  lorem80: "Sunt in culpa qui officia deserunt mollit anim id est laborum.",
};

// Add some intentional issues for the AI to catch
function processData(data) {
  // Potential memory leak - storing in global
  window.globalData = data;
  
  // Potential XSS vulnerability
  document.getElementById('output').innerHTML = data.userInput;
  
  // Missing null check
  return data.items.map(item => item.name.toUpperCase());
}

// Add more test functions
function testFunction1() {
  console.log("Test function 1");
}

function testFunction2() {
  console.log("Test function 2");
}

function testFunction3() {
  console.log("Test function 3");
}

function testFunction4() {
  console.log("Test function 4");
}

function testFunction5() {
  console.log("Test function 5");
}

function testFunction6() {
  console.log("Test function 6");
}

function testFunction7() {
  console.log("Test function 7");
}

function testFunction8() {
  console.log("Test function 8");
}

function testFunction9() {
  console.log("Test function 9");
}

function testFunction10() {
  console.log("Test function 10");
}

function testFunction11() {
  console.log("Test function 11");
}

function testFunction12() {
  console.log("Test function 12");
}

function testFunction13() {
  console.log("Test function 13");
}

function testFunction14() {
  console.log("Test function 14");
}

function testFunction15() {
  console.log("Test function 15");
}

function testFunction16() {
  console.log("Test function 16");
}

function testFunction17() {
  console.log("Test function 17");
}

function testFunction18() {
  console.log("Test function 18");
}

function testFunction19() {
  console.log("Test function 19");
}

function testFunction20() {
  console.log("Test function 20");
}

function testFunction21() {
  console.log("Test function 21");
}

function testFunction22() {
  console.log("Test function 22");
}

function testFunction23() {
  console.log("Test function 23");
}

function testFunction24() {
  console.log("Test function 24");
}

function testFunction25() {
  console.log("Test function 25");
}

function testFunction26() {
  console.log("Test function 26");
}

function testFunction27() {
  console.log("Test function 27");
}

function testFunction28() {
  console.log("Test function 28");
}

function testFunction29() {
  console.log("Test function 29");
}

function testFunction30() {
  console.log("Test function 30");
}

function testFunction31() {
  console.log("Test function 31");
}

function testFunction32() {
  console.log("Test function 32");
}

function testFunction33() {
  console.log("Test function 33");
}

function testFunction34() {
  console.log("Test function 34");
}

function testFunction35() {
  console.log("Test function 35");
}

function testFunction36() {
  console.log("Test function 36");
}

function testFunction37() {
  console.log("Test function 37");
}

function testFunction38() {
  console.log("Test function 38");
}

function testFunction39() {
  console.log("Test function 39");
}

function testFunction40() {
  console.log("Test function 40");
}

function testFunction41() {
  console.log("Test function 41");
}

function testFunction42() {
  console.log("Test function 42");
}

function testFunction43() {
  console.log("Test function 43");
}

function testFunction44() {
  console.log("Test function 44");
}

function testFunction45() {
  console.log("Test function 45");
}

function testFunction46() {
  console.log("Test function 46");
}

function testFunction47() {
  console.log("Test function 47");
}

function testFunction48() {
  console.log("Test function 48");
}

function testFunction49() {
  console.log("Test function 49");
}

function testFunction50() {
  console.log("Test function 50");
}

function testFunction51() {
  console.log("Test function 51");
}

function testFunction52() {
  console.log("Test function 52");
}

function testFunction53() {
  console.log("Test function 53");
}

function testFunction54() {
  console.log("Test function 54");
}

function testFunction55() {
  console.log("Test function 55");
}

function testFunction56() {
  console.log("Test function 56");
}

function testFunction57() {
  console.log("Test function 57");
}

function testFunction58() {
  console.log("Test function 58");
}

function testFunction59() {
  console.log("Test function 59");
}

function testFunction60() {
  console.log("Test function 60");
}

function testFunction61() {
  console.log("Test function 61");
}

function testFunction62() {
  console.log("Test function 62");
}

function testFunction63() {
  console.log("Test function 63");
}

function testFunction64() {
  console.log("Test function 64");
}

function testFunction65() {
  console.log("Test function 65");
}

function testFunction66() {
  console.log("Test function 66");
}

function testFunction67() {
  console.log("Test function 67");
}

function testFunction68() {
  console.log("Test function 68");
}

function testFunction69() {
  console.log("Test function 69");
}

function testFunction70() {
  console.log("Test function 70");
}

export { testData, processData };