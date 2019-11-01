'use strict';

// YOU KNOW WHAT TO DO //

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
 * @param {Array} collection: The array to inspect..
 * Returns the new duplicate free array.
 */

function unique(array) {

    return filter(array, function(element, i, array) {
        return indexOf(array, element) === i;
    });
}

module.exports.unique = unique;

/**
 * filterCreates an array with all falsey values removed. 
 * The values false, null, 0, "", undefined, and NaN are falsey.
 * 
 * @param {Array} collection: The collection over which to iterate.
 * @param {Action} action: The Function to be applied to each value in the 
 * collection
 * 
 *  Returns the new filtered array.
 */

function filter(array, action) {
    var newArr = [];
    for (var i = 0; i < array.length; i++) {
        if (action(array[i], i, array)) {
            newArr.push(array[i]);
        }
    }
    return newArr;
}

module.exports.filter = filter;


/**
 * reject: The opposite of filter; this method returns the elements of collection
 * that predicate does not return truthy for.
 * 
 * @param {Array} array: The collection to iterate over.
 * @param {Action} action: The Function to be applied to each value in the 
 * collection
 * 
 * Returns the new filtered array
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
 * @param {Action} action: The function invoked per iteration
 * 
 * Returns the array of grouped elements based a boolean value
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
 *  Returns the new mapped array
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
 * @param {Object} collection: The collection over which to iterate.
 * @param {Prop} action: The Function to be applied to each value in the 
 * collection
 * 
 * The returned value is an array of that property’s detail which we need to extract.
 * The array will contain the elements in the same order in which they were in the list.
 */

function pluck(array, prop) {
    // create new Array to return values
    return map(array, function(object, index, array) {
        return object[prop];
    });
}  

module.exports.pluck = pluck;



/**
 * every: Checks if action returns truthy for all elements of collection. 
 * Iteration is stopped once action returns falsey. 
 * The predicate is invoked with three arguments: (value|element, index|key, collection).
 * 
 * @param {Array or Object} collection: The collection in which to iterate.
 * @param {Action} action:  The function invoked per iteration
 * 
 * Returns true if all elements pass the action check, else false
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

};

module.exports.every = every;

/**
 * some: Checks if action returns truthy for any element of collection.
 * Iteration is stopped once action returns truthy. 
 * The predicate is invoked with three arguments: (value|element, index|key, collection).
 * 
 * @param {Array or Object} collection: The collection over which to iterate.
 * @param {Function} action: The Function to be applied to each value in the 
 * collection
 * 
 *  Returns true if any element passes the predicate check, else false.
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
};

module.exports.some = some;

/**
 * reduce: Reduces collection to a value which is the accumulated result of running each element in collection thru iteratee,
 * where each successive invocation is supplied the return value of the previous. 
 * If accumulator is not given, the first element of collection is used as the initial value.
 * The iteratee is invoked with four arguments:
 * accumulator, value, index|key, collection
 * 
 * @param {Array or Object} collection: The collection over which to iterate.
 * @param {Function} action: The Function to be applied to each value in the 
 * collection
 * @param {startValue} startValue: the intial value 
 * 
 * Returns the accumulated value
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
};

module.exports.reduce = reduce;

/**
 * extend: This method iterates over own and inherited source properties..
 * 
 * @param {Object} collection: The collection over which to iterate.
 * 
 *  Returns object
 */
 
function extend(copyTo) {

    var copyFromObjects = Array.prototype.slice.call(arguments, 1);
    for (var i = 0; i < copyFromObjects.length; i++) {
        var copyFrom = copyFromObjects[i];
        for (var key in copyFrom) {
            copyTo[key] = copyFrom[key];
        }
    }
    return copyTo;

};

module.exports.extend = extend;