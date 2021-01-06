# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Book.create(title: "Canterbury Tails", finished: false)

pages = Page.create([{author: "Chaucer", content: "A long time ago, a bunch of people went on a long walk from London to Canterbury. They passed the time by telling stories, with a reward for the best one to be given at the end.", book_id: 1},
                    {author: "James Corey", content: "Unfortunately for them, a mysterious space ship appeared from behind an asteroid and launched a torpedo, killing everyone.", book_id: 1}])