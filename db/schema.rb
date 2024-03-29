# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_05_26_181145) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "answer_votes", force: :cascade do |t|
    t.bigint "voter_id", null: false
    t.bigint "voted_answer_id", null: false
    t.boolean "direction", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["voted_answer_id"], name: "index_answer_votes_on_voted_answer_id"
    t.index ["voter_id"], name: "index_answer_votes_on_voter_id"
  end

  create_table "answers", force: :cascade do |t|
    t.bigint "author_id", null: false
    t.bigint "question_id", null: false
    t.text "body", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_id"], name: "index_answers_on_author_id"
    t.index ["question_id"], name: "index_answers_on_question_id"
  end

  create_table "questions", force: :cascade do |t|
    t.bigint "asker_id", null: false
    t.string "title", null: false
    t.text "body"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["asker_id"], name: "index_questions_on_asker_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "display_name", null: false
    t.string "email", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["display_name"], name: "index_users_on_display_name"
    t.index ["session_token"], name: "index_users_on_session_token"
  end

  add_foreign_key "answer_votes", "answers", column: "voted_answer_id"
  add_foreign_key "answer_votes", "users", column: "voter_id"
  add_foreign_key "answers", "questions"
  add_foreign_key "answers", "users", column: "author_id"
  add_foreign_key "questions", "users", column: "asker_id"
end
