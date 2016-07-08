# BUGS #


# IDEAS #
	Persistence storage of visited nodes in cookie
	Education mode: Answer question to unlock new bubbles about more challenging things
	Introduce a summary in the info box. Title - summary - longer text / details
	Different coloration in the tree based on subject
	'I master this' button in infobox to get score and color a node's text - Mark nodes you've visited before
	Short cut to places around the canvas


# TODO #
	Implement Data.js generator (with button) and automatic download
	Help menu button; describe keyboard shortcuts
	Make the zoom zoom toward position of the mouse - Only for MOUSE zoom, keyboard zoom stays centered
	Cull floaty drawing to screen boundaries, currently takes up 1/4th of the frametime.
	Semantic zoom
	Latex rendering in infoboxes
	Picture/Sprite rendering inside the infoboxes
	Clickable hyperlinks in info box
	Hyperlinks activating links to different bubbles
	(Make content stay in the same place after resize)

# IN PROGRESS #

# DONE #
	OLE: Starting in narrow window with FactBox, scrolling down, resizing window to max, doesn't scroll back up
	OLE: Music class for queing and loading after finishing
	KEVIN: ~~Right-click~~ (Q,R,T) add-node or 'Editor Mode', since editing Data.js is a pain in the ass. <- This could be in dev-mode?
	KEVIN: Create variable for holding keystates (e.g. KEY_W: 87)
	OLE: Sounds icon and text collide for initially small windows
	KEVIN: Re-design Data.js to allow nodes to easily change position - Allow curves to 'normalize' after move. Moving nodes does not recalculate the connected lines
	KEVIN: Make sound text opaque if the mouse is kept there
	KEVIN: Content in info box is allowed to be scrolled too far down if scrolling aggressively
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
	Refactor Main into its own class for cleanliness - REASON: Too noisy and methods don't work well with eventlisteners
	Score system for visited nodes (Level and experience?) - REASON: Use colored nodes to visualize 'experience' and score
	Floaty speed proportional to size - REASON: Unimportant
	Floaties start spawning in field of view (and dissapears out of view) - REASON: Doesn't look as good as random floaties in a wide area
