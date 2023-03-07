# Indeed job description stop Words Highlighter
A Chrome extension that highlights stop words in job descriptions.

## Motivation
The extension was created as a way to help non-US citizens who are not eligible for secret clearance to quickly identify job descriptions that require it. By highlighting specified stop words, users can easily skim job postings and avoid wasting time on positions that they are not eligible for.
Also I wanted to got experience in chrome widget creating 

## How it Works
This Chrome extension uses a MutationObserver to watch for changes to the DOM. Once the job description has been loaded, the extension searches for all instances of stop words within the job description and highlights them in yellow. Additionally, an observer is used to detect when a loading element is removed, indicating that the job description has finished loading and the extension should begin highlighting stop words.

## Features
- Highlights specified stop words in job descriptions
- Automatically starts highlighting once the page has finished loading and a skeleton loading element has been removed
- Can be easily customized to include additional stop words

## Todo
- Add userinterface for adding and editing stop words
- Optimize algorithm for searching stopwords in one walk

## Installation
- Clone or download this repository
- Open Chrome and navigate to chrome://extensions
- Enable "Developer mode"
- Click on "Load unpacked"
- Select the downloaded repository

## Usage
- Navigate to a job listing page on Indeed.com
- Wait for the job description to load
- Stop words will be highlighted in yellow
- Highliting is triggered by unmouting skeleton component


## Contributing
If you would like to contribute to this project, feel free to open a pull request or submit an issue.