module.exports = {
	/**
	* A function that aims to improve the result of typeof by indicating exactly what that value is.
	* @param {*} value 
	* @returns {string}
	*/
	gettype: function(value) {
		const native_type = typeof value;
		
		switch(native_type) {
			case "object":
				if (value === null) {
					 return "null";
				} else {
					return Array.isArray(value) ? "array" : "object";
				}
				break;
			case "number":
				return value % 1 === 0 ? "integer" : "float";
				break;
			case "function":
				return (value.prototype||value).constructor.toString().startsWith('class') ? "class" : "function";
				break;
			default:
				return native_type;
				break;
		}
	},
	
	/**
	* An object that carries randomization functions, lets you choose random items from an array, generate numbers, colors and random strings.
	*/
	random: {
		a: 0x80000000,
		b: 1103515245,
		c: 12345,
		
		state: -1,
		
		/**
		* A function that generates a random integer.
		* @returns {number}
		*/
		int: function() {
			this.state = (this.b * this.state + this.c) % this.a;
			return this.state;
		},
		
		/**
		* A function that generates a random float.
		* @returns {number}
		*/
		float: function() {
			return this.int() / (this.a - 1);
		},
		
		/**
		* A function that generates a random number between a minimum number and a maximum number.
		* @param {number} min
		* @param {number} max 
		* @returns {number}
		*/
		range: function(min, max) {
			const size = max - min;
			const seed = this.int() / this.a;
			return min + Math.floor(seed * size);
		},
		
		/**
		* A function that chooses a random item from an array.
		* @param {Array} array 
		* @returns {*}
		*/
		choice: function(array) {
			return array[this.range(0, array.length)];
		},
		
		/**
		* A function that generates a random hex color.
		* @returns {string}
		*/
		hexcolor: function() {
			return '#' + this.range(0x0, 0xFFFFFF).toString(16).toUpperCase();
		},
	
		/**
		* A function that generates a random string.
		* @param {number} size 
		* @returns {string}
		*/
		string: function(size) {
			size = typeof size === "number" ? size : 4;
			return module.exports.rangedArray(1, size).map(()=>this.choice(module.exports.string.ascii_letters + module.exports.string.digits)).join("");
		}
	},
	
	/**
	* An object that carries string and object formatting functions.
	*/
	format: {
		/**
		* A function that lets you format a date object into a string.
		* @param {string} format 
		* @param {Date} date optional
		* @returns {string}
		*/
		dateToString: function(format, date = new Date()) {
			if (typeof format !== 'string') {
				console.assert(false, 'The first argument of format.dateToString must be a string.');
				return "";
			} else if (!date instanceof Date) {
				console.assert(false, 'The second argument of format.dateToString must be a date object.');
				return "";
			}
			
			const options = format.match(/[a-zA-Z]/g);
			
			for (let k=0; k<options.length; k++) {
				switch(options[k]) {
					case 'D':
						format = format.replace(/D/g, String(date.getDate()).padStart(2, '0'));
						break;
					case 'M':
						format = format.replace(/M/g, String(date.getMonth() + 1).padStart(2, '0'));
						break;
					case 'Y':
						format = format.replace(/Y/g, String(date.getFullYear()).padStart(4, '0'));
						break;
					case 'd':
						format = format.replace(/d/g, String(date.getDay() + 1).padStart(2, '0'));
						break;
					case 'H':
						format = format.replace(/H/g, String(date.getHours()).padStart(2, '0'));
						break;
					case 'm':
						format = format.replace(/m/g, String(date.getMinutes()).padStart(2, '0'));
						break;
					case 'S':
						format = format.replace(/S/g, String(date.getSeconds()).padStart(2, '0'));
						break;
					case 's':
						format = format.replace(/s/g, String(date.getMilliseconds()).padStart(3, '0'));
						break;
					case 'N':
						format = format.replace(/s/g, String(date.getTime()).padStart(2, '0'));
						break;
					default:
						break;
				}
			}
			
			return format;
		}
	},
	
	/**
	* A function that allows you to merge one or more objects into a single object.
	* @param {Object} ...objects (vararg) 
	* @returns {Object}
	*/
	mergeObjects: function(...objects) {
		if (objects.length === 0) {
			return null;
		} else if (module.exports.gettype(objects[0]) !== "object") {
			console.assert(false, `The argument (number: 1) of mergeObjects must be an object.`);
			return null;
		} else if (objects.length === 1) {
			return objects[0];
		} else {
			for (let i = 1; i < objects.length; i++) {
				if (module.exports.gettype(objects[i]) !== "object") {
					console.assert(false, `The argument (number: ${i + 1}) of mergeObjects must be an object.`);
					return objects[0];
				}
				
				for (const property in objects[i]) {
					if (objects[i].hasOwnProperty(property)) {
						objects[0][property] = objects[i][property];
					}
				}
			}
			
			return objects[0];
		}
	},
	
	/**
	* A function that creates an array of x elements to y elements.
	* @param {number} min
	* @param {number} max
	* @param {number} step optional
	* @returns {Array}
	*/
	rangedArray: function(min, max, step = 1) {
		const range = [];
		for (let k=min; k<max + 1; k+=step) {
			range.push(k);
		}
		return range;
	},
	
	/**
	* An object that carries constant strings, such as an ascii string (letters only).
	*/
	string: {}
}

module.exports.random.state = Math.floor(Math.random() * (module.exports.random.a - 1));

module.exports.string.ascii_letters = module.exports.rangedArray(97, 122).map((x)=>String.fromCharCode(x)).concat(module.exports.rangedArray(65, 90).map((x)=>String.fromCharCode(x))).join("");
module.exports.string.digits = module.exports.rangedArray(48, 57).map((x)=>String.fromCharCode(x)).join("");