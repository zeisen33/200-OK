# debugger
json.questions do 
    # debugger
    @questions.each do |question|
        json.set! question.id do 
            json.extract! question, :id, :title, :body, :asker_id, :created_at, :updated_at
        end
    end
end

json.users do 
    # debugger
    @users.each do |user|
        # debugger
        json.set! user.id do
            json.extract! user, :id, :email, :display_name, :created_at, :updated_at
        end
    end
end