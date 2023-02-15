class Question < ApplicationRecord
    validates :asker_id, presence: true
    validates :title, presence: true
    validates :body, length: {maximum: 999}

end
