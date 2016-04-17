#![feature(plugin)]
#![plugin(clippy, dotenv_macros)]
extern crate dotenv;
extern crate env_logger;
#[macro_use]
extern crate log;
extern crate fps_counter;
extern crate rand;
extern crate sfml;
extern crate time;

mod float_order;
mod fps;
mod handle_events;
mod once_in;
mod setup_window;

use sfml::graphics::{RenderTarget, Color};

fn main() {
	match env_logger::init() {
		Ok(()) => {}
		Err(_) => {
			println!("Error: Logger was already started, aborting process");
			return;
		}
	}

	let (mut window, mut view) = setup_window::setup();
	let mut fps = fps::Fps::new();

	trace!("Created a 1-DTree containing: {} elements", 1);

	while window.is_open() {
		fps.count_and_report();
		handle_events::handle_events(&mut window, &mut view);

		window.set_view(&view);

		window.clear(&Color::new_rgb(0, 0, 0));
		window.display();
	}
}
