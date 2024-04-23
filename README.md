# DatacolorNotes

> View the application here: [link](https://datacolor-notes.vercel.app/)

> View the application in v17 here (**EXPERIMENTAL**): [link](https://datacolor-notes-v17.vercel.app/)

> View Figma prototype here: [link](https://www.figma.com/file/bmFfMSSprUET6ZQPWPBOvf/DATACOLOR-WIREFRAME?type=design&node-id=0%3A1&mode=design&t=TCDLVRlhTOXWdNTT-1)

## Requirements

#### 1. Create a new Angular app

- Components and styles could be created from scratch or you can use a UI library of choice

#### 2. Allow user to create a new note

- A note consists of a title, content, and modification date-time
- New notes should automatically take the title “New Note” and the modification date should
  correspond to the creation datetime
- A new note is automatically saved and selected after creation

#### 3. Allow user to edit a note

- User can edit both the title and the content of a note

#### 4. Allow user to save changes to a note

- Note without a title cannot be saved
- After saving, the modification date must be updated

#### 5. Display a list of notes

- All the notes that are created should be displayed in a list
- Clicking on a list item will select the corresponding note
- Notes in the list should be sorted by date (most recent first)

#### 6. Delete notes

- Allow user to delete selected note
- After deletion no note must be automatically selected

#### 7. Filter the list of notes

- Allow user to filter the list of notes typing part of the title
- The filtered list must show all the notes whose title contains the search term
- The list can be empty
- Creating a new note will clear the filter

## Bonus Features

- Include unit tests
- Persist the state of the application (list of notes) across sessions

## What i add

- Use angular v17 with standalone components (first time that i implement it)
- Use signal and angular 17 new structural directive (check v17 branch, first time that i implement it)
- Create the notes with contenteditable and manage it as an input (suggested approch from whatsapp web & other famouse website)
- Internalization project with two lang that could change dinamically
- Routing for notes and manage error if id is not existing
- Customizing SVG based on the theme

## Time for develop - TOTAL 12H 45MIN
- Structure of the project: **3.5H**
- Create the notes with contenteditable component: **2.5H**
- Internalization + documented code: **1.75H**
- Add and edit the note: **3H**
- Notes sorted for lastUpdate + Deletable notes + 404 page - **2h**
- Unit test on services - **30min**
- Hotfix - **30min**
