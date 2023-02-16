json.questions do 
    @questions.each do |question|
        json.set! question.id do 
            json.extract! question, :id, :title, :body, :asker_id, :created_at, :updated_at
        end
    end
end

json.users do 
    @users.each do |user|
        json.extract! @user, :id, :email, :display_name, :created_at, :updated_at
    end
end