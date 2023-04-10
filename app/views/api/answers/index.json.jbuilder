
answer_authors = []

json.answers do 
    @answers.each do |answer|
        answer_authors << answer.answer_author
        json.set! answer.id do 
            json.extract! answer, :id, :question_id, :author_id, :created_at, :updated_at
        end
    end
end

json.answer_authors do 
    answer_authors.each do |answer_author|
        json.set! answer_author.id do 
            json.extract! answer_author, :id, :display_name
        end
    end
end