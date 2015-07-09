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
    // The TDEE is derived from the BMR and an activity multiplier.
    // TDEE = BMR * activity multiplier
    return Math.round(bmr * exerciseLevelActivityMultiplier(el));
  };

  // tdeeGoal() calculates the TDEE for an individual and adjusts it to a
  // particular goal.
  //
  // This is useful if you only want to know how many calories to consume to
  // gain or lose weight and aren't interested in the macro breakdown.
  // Otherwise, see calculate().
  //
  // Accepts a TDEE along with a 'goal' field.
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
