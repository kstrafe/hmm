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
			std::process::exit(1);
		}
	}

	use std::rc::Rc;
	struct Chapter {
		title: String,
		content: String,
		parents: Vec<Rc<Chapter>>
	}

	impl Chapter {
		fn new() -> Chapter {
			Chapter {
				title: String::new(),
				content: String::new(),
				parents: vec!()
			}
		}
	}

	// let chapters = vec!();

	match std::fs::read_dir("tree") {
		Ok(read) => {
			for file in read {
				match file {
					Ok(entry) => {
						trace!("{:?}", entry.path());
						if let Some(string) = file_to_string(&entry.path()) {
							let mut parser = toml::Parser::new(&string);
							match parser.parse() {
								Some(table) => {
									trace!("Parsed a table");
									let table: toml::Value = toml::Value::Table(table);
									let mut chapter = Chapter::new();
									let title = table.lookup("title");
									// get_title(&table);
									// get_content(&table);
									// get_parents(&table);
									let title = match title {
										Some(title) => {
											match title {
												&toml::Value::String(ref title) => title.clone(),
												_ => {
													warn!("Wrong title type: {:?}", entry.path());
													String::from(format!("WRONG TITLE TYPE: {:?}", entry.path()))
												}
											}
										}
										None => {
											warn!("Missing title: {:?}", entry.path());
											String::from(format!("MISSING TITLE: {:?}", entry.path()))
										}
									};
									// chapters.push(Rc::new(v));
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
