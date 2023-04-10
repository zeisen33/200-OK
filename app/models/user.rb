class User < ApplicationRecord
    has_secure_password

    validates :display_name, presence: true, uniqueness: true 
    validates :display_name, length: { in: 3..30 }, format: {without: URI::MailTo::EMAIL_REGEXP, message: "Cant be an email"}
    validates :email, presence: true, uniqueness: true
    validates :email, length: { in: 3..255 }, format: {with: URI::MailTo::EMAIL_REGEXP}
    # validates :password_digest, presence: true
    validates :session_token, presence: true, uniqueness: true
    validates :password, length: {in: 6..255, allow_nil: true}

    has_one :asker, foreign_key: :asker_id, class_name: :Question, dependent: :destroy
    has_many :answers, foreign_key: :answer_author_id, class_name: :Answer, dependent: :destroy

    before_validation :ensure_session_token

    def reset_session_token!
        self.session_token = generate_unique_session_token
        self.save!
        session_token
      end
    
    def self.find_by_credentials (email, password)
        user = User.find_by(email: email)
        # debugger
        if user&.authenticate(password)
          user
        else
          nil
        end
    end
    

    private

    def generate_unique_session_token
        while true
            token = SecureRandom.urlsafe_base64
      
            return token unless User.exists?(session_token: token)
        end
    end

    def ensure_session_token
        self.session_token ||= generate_unique_session_token
    end
end
