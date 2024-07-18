# WELCOME TO [200 OK](https://two00-ok.onrender.com)

### View the [Live Website!](https://two00-ok.onrender.com)

## Introduction

[200 OK](https://twohundredokay-bc58196d0f18.herokuapp.com/) is a clone of [Stack Overflow]([url](https://stackoverflow.com/)). Stack Overflow is a forum for asking and answering coding questions. Anyone can search for and view user submitted questions and their answers. 

This free site was created in about two weeks. Javascript, React-Redux, HTML, and CSS were used for the frontend. The backend uses Ruby on Rails, with PostgreSQL as the database. The site is hosted on [Heroku.com.](https://heroku.com).

When you're facing a coding problem, remember that *everything is going to be [200 OK](https://twohundredokay-bc58196d0f18.herokuapp.com/)!*

## [Features](https://github.com/zeisen33/200-OK/wiki/Feature-List)

1. User Authentication
  
  [200 OK](https://twohundredokay-bc58196d0f18.herokuapp.com/) lets users read questions and their answers without logging in. However, asking or answering a question requires logging in with an email and password. 

2. Questions

  Signed in users can ask questions. Questions have a title (required) and a body (optional) for going into further detail about the problem. The question asker can edit or delete the question.
  
3. Answers

  Signed in users can answer questions. Answers consist of just a text body. The answering user can edit or delete their answer.
  
4. Votes (pending)

  Users can see how many votes questions and answers have. The idea is better questions and answers will be more highly voted. Only signed in users can vote. Votes can be either up or down. The voter can change or remove their vote.
  
5. Search bar (pending)

  Anyone can use a search bar to look for questions that they care about. Search results are ordered by number of answers each question has.
    
## Pages   
  
### Splash (`/`)

The splash page appears when a signed out user visits the site.

![Screen Shot 2023-04-14 at 2 29 47 PM](https://user-images.githubusercontent.com/110428373/232127778-e512bb31-005c-4ec5-b747-66e7ec7e7586.png)

The check for whether the user is signed in or not is done in the frontend like this:

![Screen Shot 2023-04-14 at 2 33 52 PM](https://user-images.githubusercontent.com/110428373/232128461-323abae7-2162-4bad-921f-5bf66f088b66.png)

Line 13 will redirect a signed in user to the Questions Index page.

### Questions Index (`/questions`)

![Screen Shot 2023-04-14 at 2 38 29 PM](https://user-images.githubusercontent.com/110428373/232129410-f718765f-f667-4527-8fba-b3af53ff981b.png)

The questions are displayed by mapping over all of the questions, and displaying for each the important information.

### Question Show (`/questions/:id`)

![Screen Shot 2023-04-14 at 2 44 32 PM](https://user-images.githubusercontent.com/110428373/232131032-b44bc398-d090-462f-a748-6fc7140bd3df.png)

This page displays the question, its answers, and a form to create, update, or delete an answer. This page is able to tell if it is creating or updating an answer. It checks if the Redux state contains an answer from the current user. If so, it is an update form, and if not, it is a create form.

![Screen Shot 2023-04-14 at 2 51 02 PM](https://user-images.githubusercontent.com/110428373/232131678-72408d68-20ff-43fd-81be-9744125e4e04.png)

### New Question (`/questions/new`)

![Screen Shot 2023-04-14 at 2 53 35 PM](https://user-images.githubusercontent.com/110428373/232132141-a0074d39-6182-4281-bda6-6a5e80028502.png)

### Log In (`/login`)

![Screen Shot 2023-04-14 at 2 56 21 PM](https://user-images.githubusercontent.com/110428373/232132563-20f409e6-e07c-4d3e-b622-e481bf86fd1e.png)

One bug that I had with the logging in and out feature is that a signed in user would get signed out after refreshing. This was because I was not properly storing the CSRF token on the local machine's storage. The fixed session thunk action looks like this: 

![Screen Shot 2023-04-14 at 3 01 24 PM](https://user-images.githubusercontent.com/110428373/232133497-e93ba62c-af08-4849-bacb-98133db05f15.png)

### Sign up (`/signup`)

![Screen Shot 2023-04-14 at 3 02 55 PM](https://user-images.githubusercontent.com/110428373/232133884-fe87bc75-14f3-4478-8d32-9957ba5bee95.png)

The signup page also has an option to log in as a demo user. The captcha is optional. Any signup errors get rendered back to the user. The backend validations look like this:

![Screen Shot 2023-04-14 at 3 06 17 PM](https://user-images.githubusercontent.com/110428373/232134434-3aacd074-d3b4-415e-9b18-904bbc4ae4cb.png)

URI::MailTo::EMAIL_REGEXP is a method built in to Ruby on Rails that checks if a string is formatted as an email.

THANK YOU FOR VISITING [200 OK](https://twohundredokay-bc58196d0f18.herokuapp.com/)!
