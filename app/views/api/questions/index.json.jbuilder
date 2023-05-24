# debugger
askers = []

# debugger
json.questions do
    @questions.each do |question|
        askers << question.asker
        json.set! question.id do 
            json.extract! question, :id, :title, :body, :asker_id, :created_at, :updated_at
        end
    end
end

# @users.each do |user|
#     # debugger
#     json.partial! '/api/users/user', user: @question.asker
# end

json.askers do
    askers.each do |asker|
        json.set! asker.id do
            json.extract! asker, :id, :display_name
        end
    end
end