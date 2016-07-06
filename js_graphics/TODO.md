# BUGS #
	Content in info box is allowed to be scrolled too far up
	Starting in narrow window with FactBox, scrolling down, resizing window to max, doesn't scroll back up
	Sounds icon and text collide for initially small windows

# IDEAS #
	Refactor Main into its own class for cleanliness
	Floaties start spawning in field of view (and dissapears out of view)
	Education mode: Answer question to unlock new bubbles about more challenging things
	Help menu button; describe keyboard shortcuts
	Introduce a summary in the info box. Title - summary - longer text / details
	Persistence storage of visited nodes in cookie
	Different coloration in the tree based on subject
	'I master this' button in infobox to get score and color a node's text
	Make the zoom zoom toward position of the mouse
	Short cut to places around the canvas
	Mark nodes you've visited before

# TODO #
	Create variable for holding keystates (e.g. KEY_W: 87)
	Cull floaty drawing to screen boundaries, currently takes up 1/4th of the frametime.
	Semantic zoom
	Latex rendering in infoboxes
	Picture/Sprite rendering inside the infoboxes
	Clickable hyperlinks in info box
	Hyperlinks activating links to different bubbles
	Music class for queing and loading after finishing

# IN PROGRESS #
	KEVIN: Right-click add-node or 'Editor Mode', since editing Data.js is a pain in the ass. <- This could be in dev-mode?


# DONE #
	KEVIN: If you press spacebar and then move the mouse and click you end up in the same place
	OLE: Info box class, scrolling in factBox
	KEVIN: If the screen center is on a bubble, and you press a non-move key, the collision sound will activate
	KEVIN: Create tutorial bubble sequence in the beginning
	OLE: Sound toggle button (bgm og sfx) (ALL/BGM/SFX/NONE)
	KEVIN: Create remote random music loader service
	OLE: Add 'm' key for quick mute
	KEVIN: Add keys - and + for zooming
	KEVIN: BUG: Zooming out doesn't transform the mouse coordinates correctly, you can't click on Bubbles
	KEVIN: Limit zoom range and avoid usage of multipliers
	KEVIN: Zoom functionality (tricky?)
	OLE: Bubble + Bubbles klasse
	KEVIN: Use a single JS file for storing all bubbles and curves - this makes it easy for anyone to add something
	KEVIN: Add dev-key for showing various stats, most importantly current position
	KEVIN: Use a gradient texture instead of the heavy fillrect
	KEVIN: Center the old position after an onResize event
	KEVIN: Different radii floaties
	OLE/KEVIN: Curve class (the curves connecting bubbles)
	KEVIN: Context class for managing global context transformation state
	OLE: Smoother borders på info box
	KEVIN: Random Floaty spawning + drawing behind bubbles
	KEVIN: Arrow/vim -key scrolling

# SCRAP #
	Score system for visited nodes (Level and experience?) - REASON: Use colored nodes to visualize 'experience' and score
