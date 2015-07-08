var testData = [
  // Imperial
  // Mifflin-St Jeor
  {
    given: { 'gender': 'male', 'age': 22, 'isMetric': false, 'ft': 5, 'in': 10, 'cm': null, 'lbs': 170, 'kg': null, 'mifflinStJeor': true, 'exerciseLevel': 2, 'bodyFatPercentage': null, 'goal': 1.05, 'protein': 0.7, 'fat': 0.35 },
    expected: { 'bmr': 1779, 'initialTdee': 2446, 'tdee': 2568, 'protein': 119, 'fat': 59.5, 'carbs': 389.1 }
  },
  {
    given: { 'gender': 'female', 'age': 17, 'isMetric': false, 'ft': 5, 'in': 5, 'cm': null, 'lbs': 129, 'kg': null, 'mifflinStJeor': true, 'exerciseLevel': 2, 'bodyFatPercentage': null, 'goal': 1.05, 'protein': 0.7, 'fat': 0.35 },
    expected: { 'bmr': 1372, 'initialTdee': 1887, 'tdee': 1981, 'protein': 90.3, 'fat': 45.2, 'carbs': 303.4 }
  },
  // Katch-McArdle
  {
    given: { 'gender': 'male', 'age': 25, 'isMetric': false, 'ft': 5, 'in': 8, 'cm': null, 'lbs': 130, 'kg': null, 'mifflinStJeor': false, 'exerciseLevel': 2, 'bodyFatPercentage': 0.18, 'goal': 1.05, 'protein': 0.7, 'fat': 0.35 },
    expected: { 'bmr': 1417, 'initialTdee': 1948, 'tdee': 2045, 'protein': 74.6, 'fat': 37.3, 'carbs': 352.7 }
  },
  {
    given: { 'gender': 'male', 'age': 25, 'isMetric': false, 'ft': 5, 'in': 8, 'cm': null, 'lbs': 400, 'kg': null, 'mifflinStJeor': false, 'exerciseLevel': 2, 'bodyFatPercentage': 0.60, 'goal': .80, 'protein': 0.8, 'fat': 0.35 },
    expected: { 'bmr': 1941, 'initialTdee': 2669, 'tdee': 2135, 'protein': 128, 'fat': 56, 'carbs': 279.8 }
  },
  // Metric
  // Mifflin-St Jeor
  {
    given: { 'gender': 'male', 'age': 20, 'isMetric': true, 'ft': null, 'in': null, 'cm': 152, 'lbs': null, 'kg': 81.65, 'mifflinStJeor': true, 'exerciseLevel': 2, 'bodyFatPercentage': null, 'goal': 1.05, 'protein': 0.7, 'fat': 0.35 },
    expected: { 'bmr': 1672, 'initialTdee': 2298, 'tdee': 2413, 'protein': 125.7, 'fat': 62.9, 'carbs': 336.1 }
  },
  // Katch-McArdle
  {
    given: { 'gender': 'male', 'age': 20, 'isMetric': true, 'ft': null, 'in': null, 'cm': 152, 'lbs': null, 'kg': 81.65, 'mifflinStJeor': false, 'exerciseLevel': 2, 'bodyFatPercentage': 0.60, 'goal': 0.85, 'protein': 0.7, 'fat': 0.35 },
    expected: { 'bmr': 1075, 'initialTdee': 1479, 'tdee': 1256, 'protein': 50.3, 'fat': 25.1, 'carbs': 252.4 }
  },
];

describe('sample', function() {
  it('returns 42', function() {
    assert.equal(iifym.theAnswer(), 42);
  });
});

describe('bmr()', function() {
  testData.forEach(function(d, i) {
    it('returns the correct BMR for the individual (' + i + ')', function() {
      // Since expected values were gathered from an existing IIFYM calculator
      // that may round differently, we allow are results to be +/- 10 calories
      // from expected.
      expect(iifym.bmr(d.given)).to.be.within(d.expected['bmr'] - 10, d.expected['bmr'] + 10);
    });
  });
});

describe('tdee()', function() {
  testData.forEach(function(d, i) {
    it('returns the correct TDEE for the individual (' + i + ')', function() {
      // Allow +/- 10 calories. See bmr() test.
      expect(iifym.tdee(iifym.bmr(d.given), d.given['exerciseLevel']))
        .to.be.within(d.expected['initialTdee'] - 10, d.expected['initialTdee'] + 10);
    });
  });
});

describe('tdeeGoal()', function() {
  testData.forEach(function(d, i) {
    it('returns the correct TDEE adjusted to the specified goal of the individual (' + i + ')', function() {
      // Allow +/- 10 calories. See bmr() test.
      //
      // This is getting ugly, but it could be simplified the same way that the API
      // is expected to be simplified in the real world, by assigning each step to a
      // variable to avoid redoing work.
      //
      // Also, the calculate() method is going to do something similar to this to
      // simplify things for users when they want the full breakdown.
      expect(iifym.tdeeGoal(iifym.tdee(iifym.bmr(d.given), d.given['exerciseLevel']),
                            d.given['goal']))
        .to.be.within(d.expected['tdee'] - 10, d.expected['tdee'] + 10);
    });
  });
});
