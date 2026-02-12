# TravelGenie - Smart Travel Agent App

A smart travel planning application built with Vanilla JavaScript, HTML, and CSS.

## Features
- **Smart Trip Planner**: Input your preferences (Budget, Days, Age Group, Transport).
- **Medical & Safety Filter**: Checks your medical conditions (Asthma, Heart, etc.) against the destination's environment (Altitude, Climate) and provides warnings.
- **Budget Breakdown**: Estimates costs for travel, stay, and food.
- **Itinerary Generator**: Creates a day-wise plan.

## How to Run
Since this project uses pure Vanilla JS and ES Modules, you can run it directly in a modern browser.

1.  Open the `travel` folder.
2.  Double-click `index.html` to open it in your browser.
    *   **Note**: Some browsers (like Chrome) block ES Modules (`import/export`) when opening files directly from the file system (`file://` protocol) due to CORS policy.
    *   **Recommended**: Use a simple local server extension (like "Live Server" in VS Code) or Python's http.server if available.

### If you see "CORS" errors in the console:
You need to serve the files via a local server.
If you have Python installed:
```bash
python -m http.server
```
Then go to `http://localhost:8000`.
