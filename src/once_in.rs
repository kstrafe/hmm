pub struct OnceIn {
	max_val: u32,
	counter: u32,
}

impl OnceIn {
	pub fn new(max: u32) -> OnceIn {
		OnceIn {
			counter: 0u32,
			max_val: max,
		}
	}
	pub fn count(&mut self) -> bool {
		if self.counter == self.max_val {
			self.counter = 0;
			true
		} else {
			self.counter += 1;
			false
		}
	}
}


