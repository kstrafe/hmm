use sfml::window::{ContextSettings, Key, event, window_style};
use sfml::graphics::{RenderWindow, RenderTarget, Color, Transformable, View};

pub fn handle_events<'a>(window: &mut RenderWindow, view: &mut View) {
	for event in window.events() {
		use sfml::window::event::KeyPressed;
		use sfml::window::event::Closed;
		macro_rules! sv {
			($z:expr) => ( { view.zoom($z); window.set_view(&view) } );
		}
		match event {
			Closed | event::KeyPressed { code: Key::W, ctrl: true, ..} => window.close(),
			// KeyPressed { code: Key::Up, ..} => { sv!(0.0, -1.0); }
			// KeyPressed { code: Key::Down, ..} => { sv!(0.0, 1.0); }
			// KeyPressed { code: Key::Left, ..} => { sv!(-1.0, 0.0); }
			// KeyPressed { code: Key::Right, ..} => { sv!(1.0, 0.0); }
			KeyPressed { code: Key::Equal, ..} => { sv!(0.9); }
			KeyPressed { code: Key::Dash, ..} => { sv!(1.1); }
			_ => {}
		}
	}
}
