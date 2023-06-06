# debugger
voters = []

json.answer_votes do
    @answer_votes.each do |vote|
        voters << vote.voter
        json.set! vote.id do
            json.extract! vote, :id, :voter_id, :direction, :voted_answer_id, :created_at, :updated_at
        end
    end
end

json.voters do
    voters.each do |voter|
        json.set! voter.id do 
            json.extract! voter, :id #:display_name
        end
    end
end