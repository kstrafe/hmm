use std::collections::BTreeMap;
use float_order::Float;
use sfml::graphics::{Color, Shape, RectangleShape, Transformable};

pub fn setup<'a>() -> BTreeMap<Float, RectangleShape<'a>> {
	let mut map = BTreeMap::new();
	for i in -50000..50000 {
		let ret = create_shape(i);
		map.insert(ret.0, ret.1);
	}
	map
}

fn create_shape<'a>(i: i32) -> (Float, RectangleShape<'a>) {
	let mut shape = RectangleShape::new().unwrap();
	shape.set_size2f(20.0, 20.0);
	shape.set_position2f((i * 3 * 20) as f32, 400.0);
	shape.set_fill_color(&Color::new_rgb((i * 10 % 256) as u8, 128u8, 128u8));
	(Float(shape.get_position().x), shape)
}
