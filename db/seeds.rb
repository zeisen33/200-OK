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
    User.destroy_all
  
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
  
    puts "Creating users..."
    # Create one user with an easy to remember username, email, and password:
    User.create!(
      display_name: 'Demo-lition', 
      email: 'demo@user.io', 
      password: 'password'
    )
  
    # More users
    10.times do 
      User.create!({
        display_name: Faker::Internet.unique.username(specifier: 3),
        email: Faker::Internet.unique.email,
        password: 'password'
      }) 
    end

    Question.create!({
      asker_id: 1,
      title: 'How do you String Interpolate in Ruby'
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
  
    puts "Done!"
  end