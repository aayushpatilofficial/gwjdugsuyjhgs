# Scientrix Event Website

## Overview
This is a static website for the Scientrix event organized by Little Scholars Academy. It features a modern glass UI design with event information, rules, schedule, and registration functionality.

## Recent Changes (October 29, 2025)
- **Mobile Navigation Fix**: Added responsive CSS to fix the Register button getting cut off on mobile screens
  - Navigation now wraps properly on small screens (max-width: 560px)
  - Brand text uses ellipsis when too long
  - Navigation links have reduced padding and font size on mobile
  - All navigation elements now fit properly on mobile devices

## Project Structure
- `index.html` - Main website with embedded CSS and JavaScript
- `style.css` - Currently minimal, most styles are embedded in HTML
- `script.js` - Three.js visualization (appears unused in main site)

## Features
- Event countdown timer
- Schedule with individual event countdowns
- Registration form with WhatsApp integration
- Contact information
- Downloadable schedule and rules
- Responsive design for mobile and desktop

## Technical Details
- Static HTML/CSS/JavaScript
- No build process required
- Served using Python's built-in HTTP server on port 5000
- Registration data sent via WhatsApp Web API
