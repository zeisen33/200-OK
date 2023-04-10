json.answer do
    json.extract! @answer, :id, :question_id, :body, :author_id 
end

json.question do
    json.extract! @answer.question, :id, :title, :body
end

json.answer_author do
    json.extract! @answer.answer_author, :id, :display_name
end