json.answer_vote do
    json.extract! @answer_vote, :id, :voter_id, :voted_answer_id, :direction
end

json.voter do
    json.extract! @answer.voter, :id, :display_name
end


json.answer do
    json.extract! @answer.answer, :id, :title 
end