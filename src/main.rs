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
extern crate toml;

mod float_order;
mod fps;
mod handle_events;
mod setup_window;

use sfml::graphics::{RenderTarget, Color};
use std::io::Read;

fn file_to_string(filename: &std::path::PathBuf) -> Option<String> {
	let file = std::fs::File::open(filename);
	let mut file = match file {
		Ok(file) => file,
		Err(err) => {
			error!("Unable to open file: {:?}", err);
			return None;
		}
	};
	let mut string = String::new();
	match file.read_to_string(&mut string) {
		Ok(bytes) => {
			trace!("Read {} bytes from file", bytes);
		}
		Err(err) => {
			error!("Unable to read file: {:?}", err);
			return None;
		}
	}
	Some(string)
}

fn main() {
	match env_logger::init() {
		Ok(()) => {}
		Err(_) => {
			println!("Error: Logger was already started, aborting process");
			return;
		}
	}

	match std::fs::read_dir("tree") {
		Ok(read) => {
			for file in read {
				match file {
					Ok(entry) => {
						trace!("{:?}", entry.path());
						if let Some(string) = file_to_string(&entry.path()) {
							let mut parser = toml::Parser::new(&string);
							match parser.parse() {
								Some(_) => {
									trace!("Parsed a table");
								}
								None => {
									error!("Unable to parse the toml file {:?}", entry.path());
									for error in &parser.errors {
										let (line, col) = parser.to_linecol(error.lo);
										error!("Error on line {}, column {}: {}",
											line, col,
											error.desc);
									}
								}
							}
						} else {
							error!("Could not get the file into a string");
						}
					}
					Err(err) => {
						error!("Could not get an entry: {:?}", err);
					}
				}
			}
		}
		Err(err) => {
			error!("Could not read tree directory: {:?}", err);
			error!("No point in continuing, aborting");
			std::process::exit(1);
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
