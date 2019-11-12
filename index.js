'use strict';

// YOU KNOW WHAT TO DO //


/**
 * identity: Designed to take a value and return the value unchanged
 * 
 * @param {Any Value} value: Any value;
 * @return: A value thats unchanged
 */

function identity(value) {
    return value;
}

module.exports.identity = identity;


 /**
 * typeOf: designed to take a value and return the type of value as a string;
 * 
 * @param {Any value} value: A value.
 * @return: Return the type of value as a string.
 */


function typeOf(value) {
    if (Array.isArray(value)) {
        return 'array';
    }
    if (value instanceof Date) {
        return 'date';
    }
    if (typeof value === 'string') {
        return 'string';
    }
    if (value === null) {
        return 'null';
    }
    if (typeof value === 'object') {
        return 'object';
    }
    if (typeof value === "undefined") {
        return 'undefined';
    }
    if (typeof value === 'boolean') {
        return 'boolean';
    }
    if (typeof value === 'function') {
        return 'function';
    }
    if (typeof value === 'number') {
        return 'number';
    }
}

module.exports.typeOf = typeOf;

 /**
 * first: Designed to check if an array is array and if number is not a number. If array isnt a array and number is negative, 
 *  it should return an empty array. If the number isnt a number, you want to return the first elements in array.
 *  If the number is greater than array's length, return the array.
 * Else return the first elements in the array but how many numbers in numbers.
 * 
 * @param {Array} array: An array
 * @param {number} number: A number
 * @return: Return the first number in the array
 * 
 */

function first(array, number) {
    var nums = [];
    if (!Array.isArray(array)) {
        return [];
    }
    if (!number || typeof number !== 'number') {
        return array[0];
    }
    if (number < 0) {
        return [];
    }
    if (number > array.length) {
        return array;
    }
    else {
        for (var i = 0; i < number; i++) {
            nums.push(array[i]);
        }
        return nums;
    }
}

module.exports.first = first;


 /**
 * Last: Designed to check if an array is array and if number is not a number. If array isnt a array and number is negative, 
 *  it should return an empty array. If the number isnt a number, you want to return the last elements in array.
 *  If the number is greater than array's length, return the array.
 * Else return the last elements in the array but how many numbers in numbers.
 * 
 * @param {Array} array: An array
 * @param {Number} number: A number
 * @return: the last element in the array
 */

function last(array, number) {

    var nums = [];
    if (!Array.isArray(array)) {
        return [];
    }
    if (!number || typeof number !== 'number') {
        return array[array.length - 1];
    }
    if (number < 0) {
        return [];
    }
    if (number > array.length) {
        return array;
    }
    else {
        for (var i = array.length - number; i < array.length; i++) {
            nums.push(array[i]);
        }
        return nums;
    }

}

module.exports.last = last;





/**
 * indexOf: Gets the index at which the first occurrence of value is found in array. 
 * 
 * @param {Array } collection: The collection over which to iterate.
 * @param {Value} value: The value to check for in the array
 * 
 * @return the index of value within the array
 */


function indexOf(array, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] === value) {
            return i;
        }
    }
    return -1;
}
module.exports.indexOf = indexOf;




 /**
 * contains: Designed to check to see if element in the array is given value
 * 
 * @param {Value} An array: An array of values
 * @param {Array} Value: A given value
 * 
 * @return a boolean depended upon if its in the array
 */
 

function contains(array, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] === value ? true : false) {
            return true;
        }
    }
    return false;
}

module.exports.contains = contains;


/**
 * each: Designed to loop over a collection, Array or Object, and applies the 
 * action Function to each value in the collection.
 * 
 * @param {Array or Object} collection: The collection over which to iterate.
 * @param {Function} action: The Function to be applied to each value in the 
 * collection
 */ 
function each(collection, action) {
    if(Array.isArray(collection)) {
        for(var i = 0; i < collection.length; i++) {
            action(collection[i], i, collection);
        }
    } else {
        for (var key in collection) {
            action(collection[key], key, collection);
        }
    }
}
module.exports.each = each;


/**
 * unique: Creates a duplicate-free version of an array in which only the first occurrence of each element is kept.
 * The order of result values is determined by the order they occur in the array 
 * 
 * @param {Array} array: The array to inspect.
 * 
 * @returns the new duplicate free array.
 */

function unique(array) {

    return filter(array, function(element, i, array) {
        return indexOf(array, element) === i;
    });
}

module.exports.unique = unique;

/**
 * filter: Creates an array with all falsey values removed. 
 * The values false, null, 0, "", undefined, and NaN are falsey.
 * 
 * @param {Array} array: The collection over which to iterate.
 * @param {Action} function: The Function to be applied to each value in the 
 * array
 * 
 *  @return the new filtered array of elements that passed the truth test.
 */

function filter(array, action) {
  var newArr = [];
    for(var i = 0; i < array.length; i++) {
        if (action(array[i], i, array)) {
            newArr.push(array[i]);
        }
    }
   return newArr;
}

module.exports.filter = filter;


/**
 * reject: The opposite of filter; this method returns the elements of
 * that does not return truthy for.
 * 
 * @param {Array} array: The collection to iterate over.
 * @param {Action} action: The Function to be applied to each value in the 
 * collection
 * 
 * @return the new filtered array of elements that passed a false test or elements with falsy values
 */

function reject(array, action) {
    var newArr = [];
    for (var i = 0; i < array.length; i++) {
        if (!action(array[i], i, array)) {
            newArr.push(array[i]);
        }
    }
    return newArr;
}

module.exports.reject = reject;


/**
 * partition: Creates an array of elements split into two groups, 
 * the first of which contains elements action returns truthy for, 
 * the second of which contains elements action returns falsey for.
 * 
 * @param {Array} array: The collection over which to iterate.
 * @param {Action} function: The function invoked per iteration
 * 
 * @returns the array of grouped elements based a boolean value
 */
 
function partition(array, action) {

    return [filter(array, action), reject(array, action)];
}

module.exports.partition = partition;


/**
 * map: Creates an array of values by running each element in collection thru the action. 
 * The action is invoked with three arguments:
 *(value|element, index|key, collection).
 * 
 * @param {Array or Object} collection: The collection over which to iterate.
 * @param {Action} action: The Function to be applied to each value in the 
 * collection
 * 
 *  @returns the new mapped array
 */
 
function map(collection, action) {
    var newArr = [];
     each(collection, function(e, i, a) {
        newArr.push(action(e, i, a));
    });
    return newArr;
}


module.exports.map = map;

/**
 * pluck: used when we need to extract a list of a given property.
 * 
 * @param {Array} array: The array over which to iterate.
 * @param {Prop} action: The Function to be applied to each value in the 
 * collection
 * 
 * @returns value is an array of that property’s detail which we need to extract.
 * The array will contain the elements in the same order in which they were in the list.
 */

function pluck(array, prop) {
    return map(array, function(object, index, array) {
        return object[prop];
    });
}  

module.exports.pluck = pluck;



/**
 * every: Checks if action(function) returns truthy for all elements of collection. 
 * Iteration is stopped once action returns falsey. 
 * The action is invoked on three arguments: (value|element, index|key, collection).
 * if no action(function) return false
 * 
 * @param {Array or Object} collection: The collection in which to iterate.
 * @param {Action} Function:  The function invoked per iteration
 * 
 * @returns true if all elements pass the action check, else false
 */
 
function every(collection, action) {
    var flag = null;
    if (!action) {
        each(collection, function(e) {
            if (!e) {
                flag = false;
            }
        });
    }
    else {
        each(collection, function(e, i, a) {
            if(!action(e, i, a)) {
                flag = false;
            }
        });
    }

    if (flag === null) {
        return true;
    }
    else {
        return false;
    }

}

module.exports.every = every;

/**
 * some: Checks if action returns truthy for any element of collection.
 * Iteration is stopped once action returns truthy. 
 * The action is invoked on with three arguments: (value|element, index|key, collection).
 * if no action(function)  is given return true
 * 
 * @param {Array or Object} collection: The collection over which to iterate.
 * @param {Function} Function: The Function to be applied to each value in the 
 * collection
 * 
 *  @returns true if any element passes the predicate check, else false.
 */
 
function some(collection, action) {
    var flag = null;
    if (action === undefined) {
        each(collection, function(e) {
            if (e) {
                flag = true;
            }
        });
    } 
    
    else {
        if (Array.isArray(collection)) {
            if (reject(collection, action).length === collection.length) {
                return false;
            } 
            else {
                return true;
            }
        } 
        else {
            for (var key in collection) {
                if (collection[key]) {
                    flag = true;
                }
            }
        }   
    }
    
    if (flag === true) {
        return true;
    }
    else {
        return false;
    }    
}

module.exports.some = some;

/**
 * reduce: Reduces array to a value which is the accumulated result of running each element in collection through iteratee,
 * where each successive invocation is supplied the return value of the previous. 
 * If accumulator is not given, the first element of collection is used as the initial value.
 * The iteratee is invoked with four arguments:
 * accumulator, value, index|key, collection
 * 
 * @param {Array or Object} collection: The collection over which to iterate.
 * @param {Function} function: The Function to be applied to each value in the 
 * collection
 * @param {seed} seed: the intial value 
 * 
 * @returns the accumulated value
 */

function reduce(array, action, startValue) {


    var previousResult = startValue;
    var i = 0;
    if (startValue === undefined) {
        previousResult = array[0];
        i = 1;
    }

    for (; i < array.length; i++) {
        previousResult = action(previousResult, array[i], i, array);
    }

    return previousResult;
}

module.exports.reduce = reduce;

 /**
 * extend: Designed to loop over an Object, and more objects. 
 * Then assign the properties from objects to the target object. 
 * return the target object
 * 
 * @param { Object} collection: The target object
 * @param { more objects} ...objects: More objects
 * @return: The target object with the properties from other objects inside
 */
 


function extend(obj, ...objects) {
   
    each(objects, function(objects, i, collection) {
    
    for(var keys in objects) {
    
        obj[keys] = objects[keys];    
    }
        
    });
    return obj;
   
}

module.exports.extend = extend;