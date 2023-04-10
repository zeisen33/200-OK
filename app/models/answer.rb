class Answer < ApplicationRecord
    validates :answer_author_id, :question_id, :body, presence: true
    validates :body, length: {in: 1..1999, message: 'Body must exist'}
    validates :answer_author_id, uniqueness: {scope: :question_id, message: 'You have already submitted an answer to this question'}

    belongs_to :question
    belongs_to :answer_author, foreign_key: :answer_author_id, class_name: :User
end
