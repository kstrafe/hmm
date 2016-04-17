#![feature(btree_range, collections_bound)]
extern crate fps_counter;
extern crate sfml;

mod float_order;
mod handle_events;
mod once_in;
mod setup_ground;
mod setup_window;
mod test;

use float_order::Float;
use once_in::OnceIn;
use sfml::window::{ContextSettings, Key, event, window_style};
use sfml::graphics::{RenderWindow, Shape, RenderTarget, Color, Transformable, View};
use std::collections::Bound;

fn main() {
	let (mut window, mut view) = setup_window::setup();
	let mut map = setup_ground::setup();
	let mut once_in = OnceIn::new(20);

	println!("Created a 1-DTree containing: {} elements", map.len());

	let mut fpscnt = fps_counter::FPSCounter::new();

	while window.is_open() {
		{
			let fps = fpscnt.tick();
			if once_in.count() {
				println!("fps: {}", fps);
			}
		}
		handle_events::handle_events(&mut window, &mut view);

		window.set_view(&view);

		window.clear(&Color::new_rgb(0, 0, 0));
		window.display();
	}
}

