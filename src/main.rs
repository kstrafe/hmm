#![feature(plugin)]
#![plugin(clippy, dotenv_macros)]
extern crate dotenv;
extern crate env_logger;
extern crate log;
extern crate fps_counter;
extern crate rand;
extern crate sfml;
extern crate time;

mod float_order;
mod handle_events;
mod once_in;
mod setup_window;

use once_in::OnceIn;
use sfml::graphics::{RenderTarget, Color};

fn main() {
	let (mut window, mut view) = setup_window::setup();
	let mut once_in = OnceIn::new(20);

	println!("Created a 1-DTree containing: {} elements", 1);

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

