use std::cmp::Ordering;

pub struct Float(pub f32);

impl Eq for Float {}

impl PartialEq<Float> for Float {
	fn eq(&self, other: &Float) -> bool {
		self.0.is_nan() && other.0.is_nan()
		|| self.0 == other.0
	}

	fn ne(&self, other: &Float) -> bool {
		!(self.0.is_nan() && other.0.is_nan())
		&& self.0 != other.0
	}
}

impl Ord for Float {
	fn cmp(&self, other: &Float) -> Ordering {
		if self.eq(other) {
			Ordering::Equal
		} else if self.lt(other) {
			Ordering::Less
		} else {
			Ordering::Greater
		}
	}
}

impl PartialOrd<Float> for Float {
	fn partial_cmp(&self, other: &Float) -> Option<Ordering> {
		if self.lt(other) {
			Some(Ordering::Less)
		} else if self.0 == other.0 {
			Some(Ordering::Equal)
		} else if self.gt(other) {
			Some(Ordering::Greater)
		} else {
			None
		}
	}

	fn lt(&self, other: &Float) -> bool {
		self.0 < other.0
	}

	fn le(&self, other: &Float) -> bool {
		self.0 <= other.0
	}

	fn gt(&self, other: &Float) -> bool {
		self.0 > other.0
	}

	fn ge(&self, other: &Float) -> bool {
		self.0 >= other.0
	}
}
