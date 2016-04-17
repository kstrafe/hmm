use float_order::Float;

#[test]
fn test_comparisons() {
	let x = Float(0.0);
	let y = Float(1.0);
	assert!(x != y);
	assert!(!(x == y));
	assert!(x < y);
	assert!(!(x > y));
	assert!(x <= y);
	assert!(!(x >= y));
}
