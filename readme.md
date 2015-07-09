# IIFYM.js

> A small library for calculating the calorie and macro breakdown for the If It
Fits Your Macros diet.

_Note_: While this library is based on scientific formulas, everyone is
different, so it can only provide an educated estimate for a person's calorie
and macro requirements. Keep this in mind when using information obtained from
this library.

## Installation

IIFYM.js should work both in the browser and with NodeJS.

### Browser

For the browser, you can simply install with Bower.

`bower install iifym.js`

### NodeJS

For NodeJS, use NPM.

`npm install iifym.js`

### Manual

If neither of the above methods meet your needs, you can download iifym.js from
this repo on GitHub, or clone the repo to your machine and then copy iifym.js
to the desired location. It is completely self-contained.

## Basic Usage

### Browser

```html
<script src="iifym.js"></script>
<script>
 console.log(iifym.tdeeGoal(2408, 1.05));
</script>
```

### NodeJS

```js
var iifym = require('iifym.js');
iifym.tdeeGoal(2408, 1.05);
```

## Functionality

IIFYM.js provides a simple way to calculate the calorie and macro breakdown
with the `calculate()` function. However, it also exposes the functions
necessary to calculate the Basal Metabolic Rate (BMR) `bmr()` and the Total
Daily Energy Expenditure (TDEE) `tdee()` which are useful values for many diet
plans.  Providing these functions separately also simplifies the creation of
interactive interfaces.

### Basal Metabolic Rate (BMR)

The BMR is the first step to determining your daily calorie and macro
requirements. Your BMR is the number of calories required to keep you alive
when you are at rest. You should consume at least your BMR of calories each
day.

To calculate your BMR with IIFYM.js, we need some information. This information
should be stored in an object with the following format, with the values
changed accordingly.

```js
{
  'gender': 'male',           // Required if using Mifflin-St Jeor
  'age': 22,                  // Required if using Mifflin-St Jeor
  'isMetric': false,          // Provide metric inputs? (cm, kg)
  'ft': 5,                    // Required if using Mifflin-St Jeor and isMetric == false
  'in': 10,                   // Required if using Mifflin-St Jeor and isMetric == false
  'cm': null,                 // Required if using Mifflin-St Jeor and isMetric == true
  'lbs': 170,                 // Required if isMetric == false
  'kg': null,                 // Required if isMetric == true
  'mifflinStJeor': true,      // True for lean individuals, false for overweight
  'bodyFatPercentage': null,  // Required if not using Mifflin-St Jeor
}
```

IIFYM.js supports both metric and imperial measurements. The `isMetric` field
determines this behavior. When true, IIFYM.js will simply use the values
provided in `kg` and `cm`. When false, IIFYM.js will convert the values in
`ft`, `in`, and `lbs` to the appropriate metric values.

Two BMR formulas are currently supported, Mifflin-St Jeor and Katch-McArdle.
Mifflin-St Jeor takes into account gender, height, weight, and age when determining
BMR. Because of it does not account for how lean, or not, an individual is, it
is best suited for people in moderate shape. Katch-McArdle only considers lean
body mass. This makes it better suited for individuals at each extreme of the
weight spectrum where the huge presence, or absence, of body fat can skew the
calculation. Setting `mifflinStJeor` to true selects the Mifflin-St Jeor
formula as expected. Setting it to false selects the Katch-McArdle formula.

Whether or not a field is required depends on the options used. The comments
above explain when a field is required. Otherwise, it can be omitted.

Once you have gathered the required data, you can calculate the BMR very easily.

```js
// This and all following examples assume iifym.js has been required or loaded
// and is available as iifym
var data = { /* gather the necessary data and create an object with the keys from above */ };
var bmr = iifym.bmr(data);
```

### Total Daily Energy Expenditure (TDEE)

TDEE is the amount of energy (calories) used each day during your normal
routine. It augments your BMR with an activity level to account for energy used
during your 20-minute, morning walks or your 5 day a week Zumba and deadlifting
sessions.

Once you've calculated your BMR (See above), you can calculate your TDEE by
simply providing it along with your activity level to IIFYM.js.

IIFYM.js supports 10 activity levels. Each level is associated with an integer
ranging from 0 to 9. The levels are listed below. You will select the
appropriate level by passing its corresponding integer to the `tdee()`
function.

```
0 => BMR
1 => No exercise (desk job/sedentary)
2 => 3 times/week
3 => 4 times/week
4 => 5 times/week
5 => 6 times/week
6 => 5 times/week (*intense)
7 => Every day
8 => Every day (*intense) or twice daily
9 => Daily exercise + physical job
```

```js
var bmr = /* See above */
// Assuming I'm active every day (7)
var tdee = iifym.tdee(bmr, 7);
```

### Goal TDEE (Cutting, Maintaing, or Bulking)

Once you have your TDEE, you have to decide what your goal is. Do you want to
lose weight (cut), maintain, or gain weight (bulk). Your goal TDEE is the
number of calories that helps you achieve that goal.

It is calculated by multiplying your TDEE by a goal value. This value should be
between 0.75 and 1.15. A goal of 0.85 represents a 15% calorie deficit per day
resulting in weight loss. Likewise, a goal of 1.05 represents a 5% calorie
surplus per day resulting in weight gain. 1.0 is maintenance.

```js
var tdee = /* See above */

// Assuming a goal of bulking with a 5% surplus per day
var tdeeGoal = iifym.tdeeGoal(tdee, 1.05);
```

### Calorie and Macro Breakdown

If you're just interested in how many calories you need each day along with how
many grams of carbs, proteins, and fats you should be eating, keep reading.

IIFYM.js provides a convenience method when all you want to know is how much to
eat per day. This method (`calculate()`) requires the same information as
`bmr()` along with a few other items. These items are `exerciseLevel`, `goal`,
`protein`, and `fat`.

If you've been reading along, you can probably guess that
the `exerciseLevel` corresponds to the value used to calculate the TDEE
described above. Also, it's probably obvious that the `goal` corresponds to the
value used to calculate the Goal TDEE similarly detailed above. However,
`protein` and `fat` may not be as obvious. They are simply the desired number
of grams of protein (or fat) per pound of body weight (or lean mass in the case
of Katch-McArdle). The recommended values for protein are 0.7, 0.8, or 0.9. The
recommended values for fat are 0.30, 0.35, or 0.40. However, these can be
customized on an individual basis.

With all of this information, IIFYM.js can determine how many calories and
grams of carbs, protein, and fat you need to reach your goal.

```js
var data = 
{
  'gender': 'male',           // Required if using Mifflin-St Jeor
  'age': 22,                  // Required if using Mifflin-St Jeor
  'isMetric': false,          // Provide metric inputs? (cm, kg)
  'ft': 5,                    // Required if using Mifflin-St Jeor and isMetric == false
  'in': 10,                   // Required if using Mifflin-St Jeor and isMetric == false
  'cm': null,                 // Required if using Mifflin-St Jeor and isMetric == true
  'lbs': 170,                 // Required if isMetric == false
  'kg': null,                 // Required if isMetric == true
  'mifflinStJeor': true,      // True for lean individuals, false for overweight
  'bodyFatPercentage': null,  // Required if not using Mifflin-St Jeor
  'exerciseLevel': 2,         // See exerciseLevelActivityMultiplier()
  'goal': 1.05,               // TDEE Modifier. Recommended: Maintain(1.0), Cut(0.85 or 0.8), Bulk(1.05 or 1.1)
  'protein': 0.7,             // Protein grams per lb of body weight. Recommend: 0.7, 0.8, or 0.9
  'fat': 0.35                 // Fat grams per lb of body weight. Recommend: 0.3, 0.35, or 0.4
};

iifym.calculate(data);
// {
//   'bmr': 1779,         // BMR with no modifiers
//   'initialTdee': 2446, // TDEE without goal modifier
//   'tdee': 2568,        // TDEE with goal modifier
//   'protein': 119,      // Protein grams per day
//   'fat': 59.5,         // Fat grams per day
//   'carbs': 389.1       // Carb grams per day
// }
```

## Purpose

While there are several online IIFYM calculators, I have yet to find one that
is convenient on mobile. I've been wanting to create an alternative for awhile,
and the discussion I recently came across on Reddit
(https://www.reddit.com/r/Fitness/comments/2z8prt/programmer_here_i_can_make_a_new_iifym_calculator/)
was the motivation I needed to put something together. Specifically [the
comment providing the formulas in one
place](https://www.reddit.com/r/Fitness/comments/2z8prt/programmer_here_i_can_make_a_new_iifym_calculator/cpgmyn1).
I see this library as the first step to developing a modern IIFYM calculator.

Of course, it's not limited to a simple interactive calculator. It could also
be used to calculate breakdowns for an entire database or CSV full of people.
You're free to be creative with this library and you don't have to depend on an
online provider sticking around for as long as you want to stick to IIFYM.

So, feel free to contribute back to IIFYM.js and/or use it to create some awesome
new tools for managing bodyweight.

## License

MIT. See LICENSE

## See a problem?

Create an Issue or, if you're feeling really generous, open a Pull Request with
a solution. I'll get back to you as quickly as possible.

## Contributing

Interested in contributing? Awesome! I want to make contributing as painless as
possible and I'm always open to suggestions.

Here's the basic idea:

* Create an Issue. Communication is a good thing.
* Clone the project if you haven't already.
* Install the development dependencies - `npm install`
* Make sure the tests pass before you change anything - `npm test`
* Create a feature branch - `git checkout -b adding-something-awesome`
* If you're adding a new feature or fixing a bug, add/fix any relevant test case(s)
* Make your change(s)
* Make sure the tests are passing - `npm test`
    * If you get stuck but think you've made some real progress, go ahead and submit a Pull Request, but leave
      a comment mentioning that you could use another set of eyes. Perhaps we can solve the problem together.
* Submit a Pull Request

## Changelog

* v0.9.0 - Initial Public Release
    * This is the first release to be officially tagged and published.
      I decided to spend a couple days putting this library together while I have the time and motivation.
      The only reason it's not v1.0.0 is because there's no error handling to speak of in IIFYM.js.
      The API will likely change to return an error when given invalid data as is standard practice in NodeJS.
      Rather than release v2.0.0 so soon, I'm going to hold off on v1.0.0 until error handling is in place.
      Regardless, accurate results will be returned when given valid data, so it's possible to begin implementing
      this library now with the understanding that v1.0.0 will likely introduce breaking changes.
    * Successfully calculates BMR, TDEE, Goal TDEE, and macro breakdown (with passing test suite).
    * BMR, TDEE, and Goal TDEE can be calculated independently of macros if desired.
    * Available on NPM and Bower.
    * Compatible with the browser and NodeJS.
