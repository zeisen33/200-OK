class Question < ApplicationRecord
    validates :asker_id, presence: true
    validates :title, presence: true
    validates :body, length: {maximum: 999}

    belongs_to :asker, foreign_key: :asker_id, class_name: :User
end
