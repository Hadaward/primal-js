<h1 align="center">Primal-JS Documentation 📃</h1>

<details>
  <summary>gettype function</summary>
  
  ```JavaScript
  const {gettype} = require("primal-js");

  /**
  * gettype is a function that aims to improve the result of typeof by indicating exactly what that value is.
  * @param {*} value 
  * @returns {string}
  */

  // e.g:

  console.log( gettype(console.log) ); // -> "function"
  console.log( gettype(class {}) ); // -> "class"
  console.log( gettype(null) ); // -> "null"
  console.log( gettype(1) ); // -> "integer"
  console.log( gettype(1.1) ); // -> "float"
  console.log( gettype({}) ); // -> "object"
  console.log( gettype([]) ); // -> "array"
  ...
  ```
</details>

<details>
  <summary>random  object</summary>
  
  ```JavaScript
  const {random} = require("primal-js");

  /**
  * random is an object that carries randomization functions,
  * lets you choose random items from an array, generate numbers, colors and random strings.
  */

  /**
  * random.int is a function that generates a random integer.
  * @returns {number}
  */

  /**
  * random.float is a function that generates a random float.
  * @returns {number}
  */

  /**
  * random.range is a function that generates a random number between a minimum number and a maximum number.
  * @param {number} min
  * @param {number} max 
  * @returns {number}
  */

  /**
  * random.choice is a function that chooses a random item from an array.
  * @param {Array} array 
  * @returns {*}
  */

  /**
  * random.hexcolor is a function that generates a random hex color.
  * @returns {string}
  */

  /**
  * random.string is a function that generates a random string.
  * @param {number} size 
  * @returns {string}
  */

  // e.g:

  console.log( random.int() ); // -> 9872839895
  console.log( random.float() ); // -> 0.09399495967
  console.log( random.range(-10, 10) ); // -> -4
  console.log( random.choice( ["foo", "bar", "foobar"] ) ); // -> "bar"
  console.log( random.hexcolor() ); // -> "#FD3BAC"
  console.log( random.string(7) ); // -> "Av0Dl3e"
  ```
</details>

<details>
  <summary>format object</summary>
  
  ```JavaScript
  const {format} = require("primal-js");

  /**
	* format is an object that carries string and object formatting functions.
	*/
  
  /**
  * format.dateToString is a function that lets you format a date object into a string.
  * @param {string} format 
  * @param {Date} date optional
  * @returns {string}
  */

  // e.g:
  const dateObject = new Date("December 17, 1995 03:24:00");
  
  console.log( format.dateToString('Y-M-DTH:m:S.sZ') ); // -> "2021-11-26T01:15:04.840Z" (by default uses new Date)
  console.log( format.dateToString('Y-M-DTH:m:S.sZ', dateObject) ); // -> "1995-12-17T03:24:00.000Z"
  ```
</details>
