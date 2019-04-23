## Project targets

I am a user of the app and I want to create a book object and edit previously provided info about it, so that my reading list can stay up to date. The form should be split into three steps:

Choose subject (one of the two).
Depending on the selection in the first step, display a list of reading material. Choose one.
When reading material chosen, display all the info that's available about the book in a form (meaning that the book info can be edited).

### What I managed to do so far

used the new react hooks, useState, and useEffect and got rid of any react classes

at my src/components folder, I created a bookform, bookslist and subjectpicker

user will choose a subject from the component subjectpicker

bookslist is the table to display all the books with an action edit, its child component is the bookform, which displays and edits the book's author and title

### Organizing my code

This was a big topic, on our last meeting, and key focus on the new test.
I have since the last meeting
chosen to include ESLint and Prettier with airbnb style guide into my project.

My project now includes .eslintrc.json and .prettierrc.json

source:
https://github.com/airbnb/javascript

#### What could I have done better?

Use more CSS, to design it better.
(there is a lot more to learn here for me)

manage my state, in state management

(redux ? or the new reducer hook, I haven't been able to catch up on all the new hooks just the state and effect so far)

I used callbacks on parent components to update the table following a save on the book, this could have been avoided if I was using a state management.
