// IIFYM.js
//
// Copyright (c) 2015 Ryan Robeson
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
//
// Formulas from /u/sknick_
// https://www.reddit.com/r/Fitness/comments/2z8prt/programmer_here_i_can_make_a_new_iifym_calculator/cpgmyn1
//
// Supports browser or NodeJS usage
// See: http://caolan.org/posts/writing_for_node_and_the_browser/
// 
// Browser:
// <script src="iifym.js"></script>
// <script>
//  console.log(iifym.callAMethod());
// </script>
//
// NodeJS:
// var iifym = require ('./iifym');
// console.log(iifym.callAMethod());
(function(exports) {
  // Validation
  // The validate object contains all of the functions necessary to ensure sane
  // user input. 
  //
  // When validation fails, an object will be returned containing the name of
  // the category of the data (gender, age, height, etc.), an array of the
  // field names that failed validation (e.g. [ "ft", "in" ]), and a useful
  // error message.  This object can be manipulated as appropriate.  Null is
  // returned on success.
  var validate = {};

  // Utility functions for validation
  validate.util = {};

  validate.util.presence = function(prop) {
    if (prop == null) {
      return false;
    }

    return true;
  };

  validate.util.isPositive = function(prop) {
    if (prop > 0) {
      return true;
    }
    
    return false;
  };

  validate.util.mustBeGiven = function(prop, name, field) {
    var result = { name: name, fields: [ field ] };

    if (validate.util.presence(prop) === false) {
      result.message = name + " must be given";
      return result;
    }

    return null;
  };

  validate.util.mustBePositive = function(prop, name, field) {
    var result = { name: name, fields: [ field ] };

    if (validate.util.isPositive(prop) === false) {
      result.message = name + " must be greater than 0";
      return result;
    }

    return null;
  };

  validate.gender = function(mifflinStJeor, gender) {
    // Gender is only required and validated for Mifflin-St Jeor
    if (mifflinStJeor === true) {
      if (gender == null) {
        return { name: "gender", fields: [ "gender" ], message: "A gender must be given [male or female]" };
      }

      if (gender !== 'male' && gender !== 'female') {
        return { name: "gender", fields: [ "gender" ], message: "Invalid gender selected [male or female]" };
      }
    }

    return null;
  };

  validate.age = function(mifflinStJeor, age) {
    // Age is only required and validated for Mifflin-St Jeor
    if (mifflinStJeor === true) {
      if (age == null) {
        return { name: "age", fields: [ "age" ], message: "An age must be given [0-105]" };
      }

      if (age < 0 || age > 105) {
        return { name: "age", fields: [ "age" ], message: "Invalid age given [0-105]" };
      }
    }

    return null;
  };

  validate.isMetric = function(isMetric) {
    if (isMetric == null) {
      return { name: "isMetric", fields: [ "isMetric" ], message: "isMetric must be given [true or false]" };
    }

    if (typeof isMetric !== 'boolean') {
      return { name: "isMetric", fields: [ "isMetric" ], message: "isMetric must be a boolean [true or false]" };
    }

    return null;
  };

  validate.height = function(isMetric, mifflinStJeor, feet, inches, cm) {
    if (mifflinStJeor === true) {
      var result = { name: "height", fields: [] };

      if (isMetric === true) {
        if (cm == null) {
          result.fields.push("cm");
          result.message = "cm must be given when isMetric is true and mifflinStJeor is true";
          return result;
        }

        if (cm < 0) {
          result.fields.push("cm");
          result.message = "cm must be greater than 0";
          return result;
        }
      } else {
        if (feet == null && inches == null) {
          result.fields.push("ft", "in");
          result.message = "ft or in [or both] must be given when isMetric is false and mifflinStJeor is true";
          return result;
        } else {
          if (feet != null && feet < 0) {
            result.fields.push("ft");
            result.message = "ft must be greater than 0. ";
            // Don't return because inches may be negative too
          }

          if (inches != null && inches < 0) {
            result.fields.push("in");
            result.message += "in must be greater than 0.";
            // Don't return because inches may have been valid while feet was
            // not
          }

          if (typeof result.message !== 'undefined') {
            // If feet and/or inches were invalid, return the results
            result.message = result.message.trim();
            return result;
          }
        }
      }
    }

    return null;
  }

  validate.weight = function(isMetric, lbs, kg) {
    var result = { name: "weight", fields: [] };

    if (isMetric === true) {
      if (kg == null) {
        result.fields.push('kg');
        result.message = 'kg must be given when isMetric is true';
        return result;
      }

      if (kg < 0) {
        result.fields.push('kg');
        result.message = 'kg must be greater than 0';
        return result;
      }
    } else {
      if (lbs == null) {
        result.fields.push('lbs');
        result.message = 'lbs must be given when isMetric is false';
        return result;
      }

      if (lbs < 0) {
        result.fields.push('lbs');
        result.message = 'lbs must be greater than 0';
        return result;
      }
    }

    return null;
  };

  validate.mifflinStJeor = function(mifflinStJeor) {
    result = { name: 'mifflinStJeor', fields: ['mifflinStJeor'] };

    if (mifflinStJeor == null) {
      result.message = 'mifflinStJeor must be given';
      return result;
    }

    if (typeof mifflinStJeor !== 'boolean') {
      result.message = 'mifflinStJeor must be a boolean';
      return result;
    }

    return null;
  };

  validate.bodyFatPercentage = function(mifflinStJeor, bodyFatPercentage) {
    if (mifflinStJeor === false) {
      var result = { name: "bodyFatPercentage", fields: "bodyFatPercentage" };

      if (bodyFatPercentage == null) {
        result.message = "bodyFatPercentage must be given when mifflinStJeor is false";
        return result;
      }

      if (bodyFatPercentage < 0 || bodyFatPercentage > 1) {
        result.message = "bodyFatPercentage must be between 0 and 1";
        return result;
      }
    }

    return null;
  };

  validate.exerciseLevel = function(exerciseLevel) {
    var result = { name: 'exerciseLevel', fields: ['exerciseLevel'] };

    if (exerciseLevel == null) {
      result.message = "exerciseLevel must be given";
      return result;
    }


    if (exerciseLevel < 0) {
      result.message = "exerciseLevel must be greater than 0";
      return result;
    }

    return null;
  };

  validate.goal = function(goal) {
    var result = validate.util.mustBeGiven(goal, 'goal', 'goal');

    if (result == null) {
      result = validate.util.mustBePositive(goal, 'goal', 'goal');

      if (result == null && (goal < 0.25 || goal > 3.0)) {
        result = { name: 'goal', fields: ['goal'], message: 'goal must be between 0.25 and 3.0 [0.75 to 1.15 recommended]' };
      }
    }

    return result;
  };

  validate.bmr = function(data) {
    var invalidProperties = [];
    invalidProperties.push(validate.mifflinStJeor(data['mifflinStJeor']));
    invalidProperties.push(validate.gender(data['mifflinStJeor'], data['gender']));
    invalidProperties.push(validate.age(data['mifflinStJeor'], data['age']));
    invalidProperties.push(validate.isMetric(data['isMetric']));
    invalidProperties.push(validate.height(data['isMetric'], data['mifflinStJeor'], data['ft'], data['in'], data['cm']));
    invalidProperties.push(validate.weight(data['isMetric'], data['lbs'], data['kg']));
    invalidProperties.push(validate.bodyFatPercentage(data['mifflinStJeor'], data['bodyFatPercentage']));

    return invalidProperties.filter(function(el) { return el !== null });
  };

  validate.tdee = function(bmr, el) {
    var invalidProperties = [];
    invalidProperties.push(validate.exerciseLevel(el));
    invalidProperties.push(function() {
      // Use an anonymous function to validate bmr
      // for TDEE since validate.bmr already exists,
      // and this is a simple validation.
      var result = validate.util.mustBeGiven(bmr, 'bmr', 'bmr');

      if (result == null) {
        result = validate.util.mustBePositive(bmr, 'bmr', 'bmr');
      }

      return result;
    }());

    return invalidProperties.filter(function(el) { return el !== null });
  };
  
  validate.tdeeGoal = function(tdee, goal) {
    var invalidProperties = [];
    invalidProperties.push(function() {
      // Similar case to validate.tdee
      // Using an anonymous function is more straightforward.
      var result = validate.util.mustBeGiven(tdee, 'tdee', 'tdee');
      
      if (result == null) {
        result = validate.util.mustBePositive(tdee, 'tdee', 'tdee');
      }
      
      return result;
    }());
    invalidProperties.push(validate.goal(goal));
    
    return invalidProperties.filter(function(el) { return el !== null });
  };

  // exerciseLevelActivityMultiplier() returns the activity mulitplier
  // associated with the given exercise level.
  // 
  // el is an integer from 0 to 9 with each value corresponding
  // to a particular exercise level.
  //
  // 0 => BMR
  // 1 => No exercise (desk job/sedentary)
  // 2 => 3 times/week
  // 3 => 4 times/week
  // 4 => 5 times/week
  // 5 => 6 times/week
  // 6 => 5 times/week (*intense)
  // 7 => Every day
  // 8 => Every day (*intense) or twice daily
  // 9 => Daily exercise + physical job
  var exerciseLevelActivityMultiplier = function(el) {
    // Values obtained from comment on reddit
    var exerciseLevels = [
      1.0,   // BMR
      1.2,   // No exercise (desk job/sedentary)
      1.375, // 3 times/week
      1.418, // 4 times/week
      1.462, // 5 times/week
      1.50,  // 6 times/week
      1.55,  // 5 times/week (*intense)
      1.637, // Every day
      1.725, // Every day (*intense) or twice daily
      1.9    // Daily exercise + physical job
    ];

    return exerciseLevels[el];
  };

  // lbsToKg() converts pounds to kilograms
  // Accepts a value in pounds
  // Returns a value in kilograms
  var lbsToKg = function(pounds) {
    return pounds / 2.20462;
  };

  // kgToLbs() converts kilograms to pounds
  // Accepts a value in kilograms
  // Returns a value in pounds
  var kgToLbs = function(kilograms) {
    return kilograms * 2.20462;
  };

  // inToCm() converts inches to centimeters
  // Accepts a value in inches
  // Returns a value in centimeters
  var inToCm = function(inches) {
    return inches / 0.393701;
  };

  // cmToIn() converts centimeters to inches
  // Accepts a value in centimeters
  // Returns a value in inches
  var cmToIn = function(centimeters) {
    return centimeters * 0.393701;
  };

  // bmr() calculates the Basal Metabolic Rate (BMR) for an individual.
  //
  // This is the function to call if you're only intrested in the BMR.
  // If you're interested in the TDEE and macro breakdown, see calculate().
  //
  // Can accept the same data object as calculate(), but does not require every field.
  //
  // Returns the BMR as an integer.
  //
  // Example:
  // bmr({
  //   'gender': 'male',           // Required if using Mifflin-St Jeor
  //   'age': 22,                  // Required if using Mifflin-St Jeor
  //   'isMetric': false,          // Provide metric inputs? (cm, kg)
  //   'ft': 5,                    // Required if using Mifflin-St Jeor and isMetric == false
  //   'in': 10,                   // Required if using Mifflin-St Jeor and isMetric == false
  //   'cm': null,                 // Required if using Mifflin-St Jeor and isMetric == true
  //   'lbs': 170,                 // Required if isMetric == false
  //   'kg': null,                 // Required if isMetric == true
  //   'mifflinStJeor': true,      // True for lean individuals, false for overweight
  //   'bodyFatPercentage': null,  // Required if not using Mifflin-St Jeor
  // });
  //
  // => 1779
  exports.bmr = function(data) {
    // Validate inputs
    var err = new Error();
    err.invalidProperties = validate.bmr(data);

    if (err.invalidProperties.length !== 0) {
      err.message = "ArgumentError: Invalid properties - " + err.invalidProperties.map(function(el) { return el.message }).join(', ');
      throw err;
    }

    var height = data['isMetric'] === true ? data['cm'] : inToCm(data['ft'] * 12.0 + data['in']);
    var weight = data['isMetric'] === true ? data['kg'] : lbsToKg(data['lbs']);
    var age = data['age'];

    var bmr = null;

    if (data['mifflinStJeor']) {
      // Calculate BMR with Mifflin-St Jeor

      // Mifflin-St Jeor only differs between male and female by a single
      // integer adjustment
      var modifier = data['gender'] === 'male' ? 5.0 : -161.0;

      // Calculate the BMR according to Mifflin-St Jeor and round to the nearest integer.
      // BMR = [10 x weight(kg)] + [6.25 x height(cm)] - [5 x age(yrs)] + modifier
      bmr = Math.round((10.0 * weight) + (6.25 * height) - (5.0 * age) + modifier);
    } else {
      // Calculate BMR with Katch-McArdle, round to the nearest integer.
      // BMR = 370 + [21.6 x lean mass(kg)]
      bmr = Math.round(370 + (21.6 * (weight - (weight * data['bodyFatPercentage']))))
    }

    return bmr
  };

  // tdee() calculates the Total Daily Energy Expenditure(TDEE) for an
  // individual. 
  //
  // This is the function to call if you're only interested in the initial TDEE
  // of an individual. If you want the actual TDEE based on a cutting or
  // bulking goal and calorie breakdown, see calculate().
  //
  // Accepts a BMR and an exercise level.
  //
  // Returns the initial TDEE as an integer
  //
  // Example:
  // tdee(bmr(data), 2 // An integer from 0 to 9 specifying the exercise level
  //                   // of the individual.
  //                   // See exerciseLevelActivityMultiplier().
  // );
  //
  // => 2446
  exports.tdee = function(bmr, el) {
    // Validate inputs
    var err = new Error();
    err.invalidProperties = validate.tdee(bmr, el);

    if (err.invalidProperties.length !== 0) {
      err.message = "ArgumentError: Invalid properties - " + err.invalidProperties.map(function(el) { return el.message }).join(', ');
      throw err;
    }

    // Validate exerciseLevelActivityMultiplier
    var elMultiplier = exerciseLevelActivityMultiplier(el);
    if (elMultiplier == null) {
      err.invalidProperties = [ { name: 'exerciseLevel', fields: ['exerciseLevel'], message: 'exerciseLevel is invalid' } ];
      err.message = 'ArgumentError: Invalid properties - exerciseLevel is invalid [Index Out of Range]';
      throw err;
    }

    // The TDEE is derived from the BMR and an activity multiplier.
    // TDEE = BMR * activity multiplier
    return Math.round(bmr * elMultiplier);
  };

  // tdeeGoal() calculates the TDEE for an individual and adjusts it to a
  // particular goal.
  //
  // This is useful if you only want to know how many calories to consume to
  // gain or lose weight and aren't interested in the macro breakdown.
  // Otherwise, see calculate().
  //
  // Accepts a TDEE along with a 'goal' field. Goal must be between 0.25 and
  // 3.0, which as mentioned below, is a much larger range than is really
  // practical. However, in the interest of being as flexible as possible, this
  // range is allowed.
  //
  // The initial TDEE will be multiplied with the goal to produce the goal
  // TDEE. For example, 1.05 will result in a 5% increase in the TDEE (useful
  // for light bulking). Likewise, 0.85 will result in a 15% decrease in the
  // TDEE (useful for light cutting). The goal can be any decimal, however it
  // is recommended to remain between 0.75 and 1.15 unless you are aware of the
  // consequences.
  //
  // ==========================================================================
  // |                           Recommended Values                           |
  // ==========================================================================
  // |                               0.75 | Fat Loss, Reckless                | 
  // |                               0.80 | Fat Loss, Aggressive              | 
  // |                               0.85 | Fat Loss, Suggested               | 
  // |                               1.00 | Maintain                          | 
  // |                               1.05 | Weight Gain, Cautious             | 
  // |                               1.10 | Weight Gain, Textbook             | 
  // |                               1.15 | Weight Gain, Aggressive           | 
  // ==========================================================================
  //
  // Example:
  // tdeeGoal(tdee, 1.05);
  //
  // => 2568
  exports.tdeeGoal = function(tdee, goal) {
    // Validate inputs
    var err = new Error();
    err.invalidProperties = validate.tdeeGoal(tdee, goal);

    if (err.invalidProperties.length !== 0) {
      err.message = "ArgumentError: Invalid properties - " + err.invalidProperties.map(function(el) { return el.message }).join(', ');
      throw err;
    }

    return Math.round(tdee * goal);
  };

  // calculate() is the main function for iifym.js
  //
  // It accepts an object(data) that contains all of the details necessary to
  // calculate the macros and TDEE of an individual.
  // It returns this information as an object.
  //
  // Example:
  // calculate({
  //   'gender': 'male',           // Required if using Mifflin-St Jeor
  //   'age': 22,                  // Required if using Mifflin-St Jeor
  //   'isMetric': false,          // Provide metric inputs? (cm, kg)
  //   'ft': 5,                    // Required if using Mifflin-St Jeor and isMetric == false
  //   'in': 10,                   // Required if using Mifflin-St Jeor and isMetric == false
  //   'cm': null,                 // Required if using Mifflin-St Jeor and isMetric == true
  //   'lbs': 170,                 // Required if isMetric == false
  //   'kg': null,                 // Required if isMetric == true
  //   'mifflinStJeor': true,      // True for lean individuals, false for overweight
  //   'bodyFatPercentage': null,  // Required if not using Mifflin-St Jeor
  //   'exerciseLevel': 2,         // See exerciseLevelActivityMultiplier()
  //   'goal': 1.05,               // TDEE Modifier. Recommended: Maintain(1.0), Cut(0.85 or 0.8), Bulk(1.05 or 1.1)
  //   'protein': 0.7,             // Protein grams per lb of body weight. Recommend: 0.7, 0.8, or 0.9
  //   'fat': 0.35                 // Fat grams per lb of body weight. Recommend: 0.3, 0.35, or 0.4
  // });
  //
  // => {
  //      'bmr': 1779,         // BMR with no modifiers
  //      'initialTdee': 2446, // TDEE without goal modifier
  //      'tdee': 2568,        // TDEE with goal modifier
  //      'protein': 119,      // Protein grams per day
  //      'fat': 59.5,         // Fat grams per day
  //      'carbs': 389.1       // Carb grams per day
  //    }
  exports.calculate = function(data) {
    // Go ahead and calculate the BMR, TDEE, and goal TDEE.
    var bmr      = exports.bmr(data),
        tdee     = exports.tdee(bmr, data['exerciseLevel']),
        tdeeGoal = exports.tdeeGoal(tdee, data['goal']);

    // Macros are broken down based on percentage per pound
    // rather than kilogram like the other formulas.
    var weightLbs = data['isMetric'] === true ? kgToLbs(data['kg']) : data['lbs'];

    // When using Katch-McArdle, calories are broken down my lean mass, not
    // pure body weight.
    if (data['mifflinStJeor'] === false) {
      weightLbs = weightLbs - weightLbs * data['bodyFatPercentage'];
    }

    // protein = % grams per lb * weight in lbs 
    // (or lean mass for Katch-McArdle)
    // protein = % grams per lb * lean mass in lbs 
    var protein = data['protein'] * weightLbs;

    // fat = % grams per lb * weight in lbs
    // (or lean mass for Katch-McArdle)
    // fat = % grams per lb * lean mass in lbs
    var fat = data['fat'] * weightLbs;

    // carbs = (tdee goal - calories from protein - calories from fat) / 4
    // carbs = (tdee goal - grams of protein * 4 - grams of fat * 9) / 4
    var carbs = (tdeeGoal - protein * 4.0 - fat * 9.0) / 4.0

    return {
      'bmr': bmr,
      'initialTdee': tdee,
      'tdee': tdeeGoal,
      'protein': protein,
      'fat': fat,
      'carbs': carbs
    }
  };
})(typeof exports === 'undefined' ? this['iifym']={} : exports);
