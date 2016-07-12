# BUGS #
	Editor window doesn't scale properly (See right scrollbar)
	A bubble in the bottom left, clicking it, will open the editor window (because it simultaneously clicks the edit button)

# IDEAS #
	Mark bubble as favorite/interesting/(?) :)
	Bubble text fitting still need some optimization (long vs short two letter words)
	Right-mouse button editing interface
	Persistence storage of visited nodes in cookie
	Education mode: Answer question to unlock new bubbles about more challenging things
	Different coloration in the tree based on subject
	Short cut to places around the canvas
	Semantic zoom
	Hyperlinks activating links to different bubbles
	Cull floaty drawing to screen boundaries, currently takes up 1/4th of the frametime
	New color to relevant curves when 'I master this' is clicked
	Make child-bubbles first visible when hovering, but dissapear if you don't click the parent bubbles. E.g. when you click a bubble named Trigonometric funtions, the bubbles sine, cosine , etc. will appear.
	this will require a tree structuring of the drawing of bubbled


# TODO #

# IN PROGRESS #
	OLE: Make 10 new bubbles with content before 17.07 23.59 (Status: 3/10)

# DONE #
	KEVIN: Create favicon for the site
	KEVIN: Make the FactBox scrollbar have a nicer style
	KEVIN: Fix style issues and lineups
	KEVIN: Different colors for 'I master this'/'Edit' and 'Done'/'Cancel' than green and red
	KEVIN: Implement Data.js generator (with button) and automatic download
	OLE: Make mouse stay on same place when zooming with scrollwheel
	KEVIN: 'I master this' button in/around factbox
	KEVIN: Editor for editing a specific bubble (HTML)
	OLE: Use percentages of the window to position and size factBox
	OLE: Sound effect when clicking/space on a bubble
	OLE: Move random color strings into Colors.js
	OLE: Improve bubble text-fitting
	KEVIN: 'Edit' button somewhere when factbox is opened
	KEVIN: Make the zoom zoom toward position of the mouse - Only for MOUSE zoom, keyboard zoom stays centered
	KEVIN: Help menu button; describe keyboard shortcuts
	KEVIN: On-screen text when an edit mode (move, link) has been engaged
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
	Introduce a summary in the info box. Title - summary - longer text / details REASON Was proposed before content of factbox was html, coding no longer needed for this idea
