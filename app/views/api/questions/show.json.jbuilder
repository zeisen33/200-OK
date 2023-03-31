# debugger
# key = @question.id
json.question do
#     # debugger
    json.extract! @question, :id, :title, :body, :asker_id
end

# json.user do
#     json.partial! '/api/users/user', user: @question.asker
# end

json.asker do 
    json.extract! @question.asker, :id, :display_name
end