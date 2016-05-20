#![cfg_attr(feature="clippy", feature(plugin))]
#![cfg_attr(feature="clippy", plugin(clippy))]
#![cfg_attr(feature="clippy", allow(items_after_statements))]
extern crate acon;
extern crate env_logger;
#[macro_use]
extern crate log;
extern crate fps_counter;
extern crate rand;
extern crate sfml;
extern crate time;
extern crate toml;

mod build_tree;
mod float_order;
mod fps;
mod handle_events;
mod setup_window;


use sfml::graphics::{RenderTarget, Color};

fn main() {
	match env_logger::init() {
		Ok(()) => {}
		Err(_) => {
			println!("Error: Logger was already started, aborting process");
			std::process::exit(1);
		}
	}

	let (mut window, mut view) = setup_window::setup();
	let mut fps = fps::Fps::new();

	let tree = build_tree::build_bubble_tree();
	let tree = build_tree::build_live_tree(tree);
	trace!("Created a tree containing {} chapters", tree.len());

	while window.is_open() {
		fps.count_and_report();
		handle_events::handle_events(&mut window, &mut view);

		window.set_view(&view);

		window.clear(&Color::new_rgb(0, 0, 0));
		window.display();
	}
}
