# A Chrome extension that highlights stop words in Indeed's job descriptions.

## Motivation
The extension was created as a way to help non-US citizens who are not eligible for secret clearance to quickly identify job descriptions that require it. By highlighting specified stop words, users can easily skim job postings and avoid wasting time on positions that they are not eligible for.
Also I wanted to got experience in chrome widget creating 

## How it Works
This Chrome extension uses a MutationObserver to watch for changes to the DOM. Once the job description has been loaded, the extension searches for all instances of stop words within the job description and highlights them in yellow. Additionally, an observer is used to detect when a loading element is removed, indicating that the job description has finished loading and the extension should begin highlighting stop words.

![Mar-07-2023 00-01-12](https://user-images.githubusercontent.com/24919819/223325200-14820074-4687-4716-b895-2fc4031a8107.gif)

## Features
- Highlighting specific words from a list
- Optionable highlighting years of experience
- Removing job listings by words in title
- Customizable by user highlight colors 
- Automatic scrolling to first highlighted word
- 

## Todo
- ~~Add userinterface for adding and editing stop words~~
- ~~improve UI~~
- Optimize algorithm for searching stopwords in one walk
- ~~use webpack/vite for supporting modularity + TS~~
- ~~Add highlighting algorythm~~
- after clicking save - refresh page

## Installation
- Clone or download this repository
- Open Chrome and navigate to chrome://extensions
- Enable "Developer mode"
- Click on "Load unpacked"
- Select the folder 'extension' from downloaded repository

## Usage
- Navigate to a job listing page on Indeed.com
- Wait for the job description to load
- Stop words will be highlighted in yellow
- Highliting is triggered by unmouting skeleton component

## Troubleshooting

1. Missing Selector errors in the console
2.   Open the extension settings.
3.   Click on "Show Selectors".
4.   Search for the selectors in the code (check for console warnings).
5.   If the selectors are missing, replace them with the new ones and update the extension settings:

<img width="354" alt="Screenshot 2023-04-13 at 5 41 23 PM" src="https://user-images.githubusercontent.com/24919819/231889206-358be3f1-dcea-4898-8ba4-86be1ed91dd9.png">

### Scrollable Container (parent div of job description)
You need use the browser's Developer Tools (F12) to inspect the web page structure and identify the right selectors.
In the Developer Tools, navigate to the "Elements" tab and search (Ctrl + F) for the classes or IDs you are looking for.

   It often contains "embedBody" in the className.
   Ensure the correct className is used in the extension settings.
### Selector for removing Skeleton element
   Two selectors are working as logical OR: SKELETON CLASS and REMOVE TEST ID.
   As these elements are removed after fetching data, it's hard to find them in dom tree. Try to pause execution by click pause button on the source tab of the Chrome development tools and inspect source code

### Removing titles
Note: Removing titles has not yet been implemented in the extension settings. You might want to consider adding this feature in a future update or creating a separate extension to handle title removal.

### Still having issues?
   Leave an issue on the extension's GitHub repository describing your problem in detail.

## Contributing
If you would like to contribute to this project, feel free to open a pull request or submit an issue.
