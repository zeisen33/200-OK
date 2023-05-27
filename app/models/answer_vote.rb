class AnswerVote < ApplicationRecord
    validates :voter_id, presence: true, uniqueness: {scope: :voted_answer_id, message: 'You have already voted on this answer'}
    validates :voted_answer_id, presence: true
    validates :direction, presence: true

    belongs_to :voter, foreign_key: :voter_id, class_name: :User
    belongs_to :answer, foreign_key: :voted_answer, class_name: :Answer
end
