var testData = [
  { 'gender': 'male', 'age': 22, 'isMetric': false, 'ft': 5, 'in': 10, 'cm': null, 'lbs': 170, 'kg': null, 'mifflinStJeor': true, 'exerciseLevel': 2, 'bodyFatPercentage': null, 'goal': 1.05, 'protein': 0.7, 'fat': 0.35, results: { 'tdee': 2568, 'protein': 119, 'fat': 59.5, 'carbs': 389.1 } }
];

describe('sample', function() {
  it('returns 42', function() {
    assert.equal(iifym.theAnswer(), 42);
  });
});
