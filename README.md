# Git and Github Tutorial
Getting start guide to help people get to know git and github.

Things learnt from during this tutorial
1. Fork / Clone
2. Pull Request
3. `git stash`
4. `git commit`
5. `git push`
6. `git rebase`


## 1. Fork / Clone:
Firstly fork this respository (repo) into your Github account.

Either by clicking `fork` from the menu items along the top of this repo, or going to the direct fork [link](https://github.com/JustinAClarke/github-tute/fork)

After forking this repo, use the Code button to get your repo link to clone your development enviroment.

## 2. Test webserver (Python)
Start by opening a terminal window to the current git repository.

Run the following command:

```
python3 -m http.server
```

or if you have python2:

```
python2 -m SimpleHTTPServer
```

Then access the test website [http://localhost:8000](http://localhost:8000)

You should see the a very basic bootstrap page.

## 3. Lets start by updating the page title
Open the index.html file, and edit line #9 `<title>Cover Template · Bootstrap v5.3</title>`
change this to your name ie.
`<title>Justin Clarke</title>`

Save the file.

In the terminal lets commit this change
> We are using the idea of short single idea commits, to assist in removing or copying a single change (idea) to somewhere else (if required)

Usually the command for this will be
```
git commit -m "updated the page title"
```
usually I will use
```
git commit -m
```
> This will open your default terminal text editor (vim / nano) where you can easily create a multiline commit

> Usually the standard method is at least 1 line commit, with a short message (less than 100 characters). 1 blank empty line, then line 3 onwards you can give more context or information.
If you need to use the word and in the commit message (you have more than 1 idea, or fix) you should probably have more than 1 commit.

### Push your updates
You can now send your changes to github
```
git push origin HEAD
```
This will push your current location to your origin (your github repository)

## 4. Creating Branches
Branches are usually used to gather a collection of commits that are all related to a single (upgrade / bug fix / enhancement)

The easiest way to start working with branches is to just start using them.

`Lets start by creating a new branch for the idea of updating the button on the website to send you an email`

Create a new branch with:
```
git branch mainButtonEmail
```
Then checkout the new branch
```
git checkout mainButtonEmail
```
> NOTE: you can do both these commits in 1 with:
```
git checkout -b mainButtonEmail
```
> This creates a new branch called `mainButtonEmail` and checkouts out that just created branch. If you have already created a branch this command will fail, and you will have to checkout the branch the normal way `git checkout mainButtonEmail`

Lets update line #94 from:

`<a href="#" class="btn btn-lg btn-light fw-bold border-white bg-white">Learn more</a>`

To:
`<a href="mailto:someone@test.com" class="btn btn-lg btn-light fw-bold border-white bg-white">Email Me</a>`
