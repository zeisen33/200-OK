# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
ApplicationRecord.transaction do 
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    Question.destroy_all
    User.destroy_all
    Answer.destroy_all

    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
    ApplicationRecord.connection.reset_pk_sequence!('questions')
    ApplicationRecord.connection.reset_pk_sequence!('answers')

    puts "Creating users..."
    # Create one user with an easy to remember username, email, and password:
    User.create!(
      display_name: 'Demo-lition', 
      email: 'demo@user.io', 
      password: 'password'
    )
    User.create!(
      display_name: 'rick',
      email: 'rick@user.io',
      password: 'password'
    )
  
    # More users. 12 users
    10.times do 
      User.create!({
        display_name: Faker::Internet.unique.username(specifier: 3),
        email: Faker::Internet.unique.email,
        password: 'password'
      }) 
    end

    puts "Creating questions..." # 11 questions
    Question.create!({
      asker_id: 1,
      title: 'How do you String Interpolate in Ruby',
      body: "Please help me learn how to string interpolate in Ruby. I tried `${}` but that didn't work."
    })
    Question.create!({
      asker_id: 2,
      title: 'Commenting in JavaScript',
      body: "How do you do a multi-line comment in JavaScript?"
    })
    Question.create!({
      asker_id: 1,
      title: 'What is Big-O Notation?'
    })
    Question.create!({
      asker_id: 7,
      title: 'Is CSS a programming language?',
      body: 'If not, then what is it?'
    })
    Question.create!({
      asker_id: 9,
      title: "Should I learn Python or Ruby?"
    })
    Question.create!({
      asker_id: 3,
      title: 'What is the difference between a lambda and a proc?',
      body: "Ruby uses procs but also has lambdas. What's the difference? And when would you want to use a proc vs a lambda?"
    })
    Question.create!({
      asker_id: 4,
      title: 'What does MERN stand for?',
    })
    Question.create!({
      asker_id: 5,
      title: "How do you exit out of pry?",
      body: "I feel like I've tried everything. Quit, escape, q, exit, everything."
    })
    Question.create!({
      asker_id: 6,
      title: 'What is a favicon?',
      body: "All I know about it is that every serious website has one"
    })
    Question.create!({
      asker_id: 7,
      title: "What kind of music do you like to listen to while coding?",
      body: "Personally I enjoy listening to pop the most, but when crunch time comes, I switch to classical, which somehow helps me be more productive"
    })
    Question.create!({
      asker_id: 8,
      title: "How do search engines like Google work so fast?",
      body: "I can type a short phrase and in less than a second millions of results are loaded. How is that possible?"
    })

    puts "Creating answers..." # 13 answers
    Answer.create!({
      question_id: 1,
      author_id: 1,
      body: "Use a '#' instead of a '$'"
    })
    Answer.create!({
      question_id: 1,
      author_id: 2,
      body: "Ruby uses hashtags, not dollar signs."
    })
    Answer.create!({
      question_id: 2,
      author_id: 2,
      body: "Start the multi-line comment with '/*' and end it with '*/" 
    })
    Answer.create!({
      question_id: 3,
      author_id: 3,
      body: 'Big-O Notation is a way to express how many operations an algorithm requires, or how much memory an algorithm requires, as the input changes. These are the computational limiting factors of an algorithm, and can help programmers decide which algorithm to use. You can consider a best case scenario, worst case, or average case. For example, bubble sort has a worst-case time complexity of O(n^2), meaning if you use bubble sort to sort 10 items, it will take at most 10^2 = 100 operations until it is finished. As inputs get larger and larger, the performance of an algorithm becomes more important. Algorithms with worse complexities can be slow or take up too much memory.'
    })
    Answer.create!({
      question_id: 4,
      author_id: 5,
      body: 'No'
    })
    Answer.create!({
      question_id: 4, 
      author_id: 6,
      body: 'Yes'
    })
    Answer.create!({
      question_id: 4, 
      author_id: 8,
      body: 'No, CSS is a stylesheet language'
    })
    Answer.create!({
      question_id: 6,
      author_id: 7,
      body: "Returning (or breaking, or raising, etc.) from a proc will return you out of the enclosing function, while doing the same in a lambda will return out of the lambda but continue running the enclosing function."
    })
    Answer.create!({
      question_id: 7,
      author_id: 8,
      body: "MongoDB ExpressJS React NodeJS"
    })
    Answer.create!({
      question_id: 7,
      author_id: 9,
      body: "Mongo Express React Node, which are what you use in the stack."
    })
    Answer.create!({
      question_id: 9,
      author_id: 10,
      body: "A favicon is the little logo in the tab header."
    })
    Answer.create!({
      question_id: 10,
      author_id: 11,
      body: "I've tried coding to a lot of music, and for me the most fun is house music, and the most productive is jazz."
    })
    Answer.create!({
      question_id: 11,
      author_id: 1,
      body: "This is a very complicated topic. It is a whole field of knowledge, called Search Engine Optimaztion (SEO). It comes down to two very important main factors. First, computers are very, very fast. One second feels fast for you, but computers can do thousands and thousands of operations in that second. The other important factor is that nearly all searches have been searched before, or a similar search has been conducted before. This allows search engines to store a search and its results. Now they can look through a database of previous search results, instead of coming up with a new search result every time."
    })


    puts 'Creating AnswerVotes...' ## 30 AnswerVotes
    pairs = []
    while pairs.length < 30
      user_id = rand(1..12)
      question_id = rand(1..11)
      answer_id = rand(1..13)
      dir = rand()
      if dir > 0.3
        direction = true
      else
        direction = false
      end

      begin AnswerVote.create!({
        direction: direction,
        voter_id: user_id,
        voted_answer_id: answer_id
      })
        pairs << [user_id, answer_id]
      rescue
        break
      end
    end
    puts "Done!"
  end