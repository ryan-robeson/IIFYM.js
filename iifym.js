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

  // calculate() is the main function for iifym.js
  //
  // It accepts an object(data) that contains all of the details necessary to
  // calculate the macros and TDEE of an individual.
  // It returns this information as an object.
  //
  // Example argument:
  // {
  //   {
  //     'gender': 'male',           // Required if using Mifflin-St Jeor
  //     'age': 22,                  // Required if using Mifflin-St Jeor
  //     'isMetric': false,          // Provide metric inputs? (cm, kg)
  //     'ft': 5,                    // Required if using Mifflin-St Jeor and isMetric == false
  //     'in': 10,                   // Required if using Mifflin-St Jeor and isMetric == false
  //     'cm': null,                 // Required if using Mifflin-St Jeor and isMetric == true
  //     'lbs': 170,                 // Required if isMetric == false
  //     'kg': null,                 // Required if isMetric == true
  //     'mifflinStJeor': true,      // True for lean individuals, false for overweight
  //     'exerciseLevel': 2,         // See exerciseLevelActivityMultiplier()
  //     'bodyFatPercentage': null,  // Required if not using Mifflin-St Jeor
  //     'goal': 1.05,               // TDEE Modifier. Recommended: Maintain(1.0), Cut(0.85 or 0.8), Bulk(1.05 or 1.1)
  //     'protein': 0.7,             // Protein grams per lb of body weight. Recommend: 0.7, 0.8, or 0.9
  //     'fat': 0.35                 // Fat grams per lb of body weight. Recommend: 0.3, 0.35, or 0.4
  //   }
  // }
  //
  // Example result:
  // {
  //   {
  //     'tdee': 2568,    // TDEE including goal modifier
  //     'protein': 119,  // Protein grams per day
  //     'fat': 59.5,     // Fat grams per day
  //     'carbs': 389.1   // Carb grams per day
  //   }
  // }
  exports.calculate = function(data) {
  };

  exports.theAnswer = function() {
    return 42;
  };
})(typeof exports === 'undefined' ? this['iifym']={} : exports);
