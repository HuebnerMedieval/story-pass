# Story Pass
This application is a digital version of an old creative writing game. In the game, a group of people collaboratively write a story, taking turns to each write a page. In this app, a user may write a single page of a story, and then allow another use to write the next one, and so on. When viewing a story, you can read all of the previous pages and see who wrote each one. At the end, everyone can see who worked together on the story.

## Getting Started 

### Installation
To install this application, please download a copy at:

        https://github.com/HuebnerMedieval/story-pass

Once installed, run bundle install.

Run rake db:migrate

### Running The Application
Currently the application only runs locally on localhost.

Navigate to the backend with `cd story-pass-backend` and run `rails s` to start up the server.

Open the file `index.html` in your browser to use the application.

You will see instructions at the top of the page and a list of existing stories. You can return to this list at any time by clicking the "Story List" link at the top of the page.

To read or add to an existing story, click on the story name. At the bottom of the page after the existing stories, there is a form to record your username and the content you would like to add. After hitting "submit", you page will appear and you will be prompted to leave the page to let another use add the next page.

If you would like to create a new story, click the link at the top for "Start a Story". This will take you to a form to write the story's title, then you will have the chance to write the first page.

This is not for professional stories, and whatever you write is permanent. Pages and books cannot be changed or removed, to keep them consistent and open to all users.

## Author
* Eli Huebner - @HuebnerMedieval

## License
This project is licensed under the MIT licence:

Copyright (c) 2021 Eli Huebner

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.