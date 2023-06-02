json.answer_vote do
    json.extract! @answer_vote, :id, :voter_id, :voted_answer_id, :direction
end

json.voter do
    json.extract! @answer_vote.voter, :id, :display_name
end

# debugger
json.answer do
    json.extract! @answer_vote.answer, :id, :body 
end